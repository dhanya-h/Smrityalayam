import io
import json
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import torch
from transformers import AutoProcessor, AutoModelForCausalLM

# Initialize FastAPI App
app = FastAPI(
    title="Smrityalayam VLM Service",
    description="Vision-Language AI assistant for elder cognitive rehabilitation & telemetry analysis.",
    version="1.0.0"
)

# Enable CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for VLM Model and Processor
vlm_model = None
vlm_processor = None
MODEL_ID = "vikhyatk/moondream2"  # Lightweight VLM suitable for CPU/GPU deployment

@app.on_event("startup")
async def load_model():
    """
    Load the Vision-Language Model into memory on server startup.
    Uses CPU or CUDA depending on hardware availability.
    """
    global vlm_model, vlm_processor
    print(f"Loading VLM model: {MODEL_ID}...")
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if device == "cuda" else torch.float32

    try:
        vlm_model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            trust_remote_code=True,
            torch_dtype=dtype,
            device_map={"": device} if device == "cuda" else None
        )
        vlm_processor = AutoProcessor.from_pretrained(MODEL_ID, trust_remote_code=True)
        print("VLM model successfully loaded!")
    except Exception as e:
        print(f"Error loading VLM model: {e}")

class VLMResponse(BaseModel):
    analysis: str
    recommended_activities: list[str]
    clinical_note: str

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "model_loaded": vlm_model is not None,
        "device": "cuda" if torch.cuda.is_available() else "cpu"
    }

@app.post("/api/vlm/analyze", response_model=VLMResponse)
async def analyze_game_stats(
    stats_json: str = Form(..., description="JSON string containing game metrics"),
    language: str = Form("en", description="Preferred regional language (en, hi, as, bn)"),
    image: Optional[UploadFile] = File(None, description="Optional gameplay screenshot or chart image")
):
    """
    Analyzes game metrics (and optional chart image) using the VLM to produce tailored elder cognitive recommendations.
    """
    if vlm_model is None:
        raise HTTPException(status_code=503, detail="VLM model is still loading or failed to initialize.")

    try:
        stats_data = json.loads(stats_json)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON format in stats_json.")

    # Process uploaded image or create fallback blank image
    pil_image = None
    if image:
        contents = await image.read()
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
    else:
        # Create a neutral canvas if no image provided
        pil_image = Image.new("RGB", (300, 300), color=(247, 240, 222))

    # Construct Clinical Prompt for VLM
    prompt = f"""
You are a geriatric cognitive therapist specializing in Northeast Indian senior care for platform Smrityalayam.
Analyze these game performance statistics and telemetry:
- Patient Name: {stats_data.get('elderName', 'Lata ji')}
- Recent Game Played: {stats_data.get('gameName', 'Focus Game')}
- Accuracy Score: {stats_data.get('accuracy', '85%')}
- Completion Time: {stats_data.get('completionTime', '45s')}
- Distractor Taps (Mistakes): {stats_data.get('mistakes', 2)}
- Wearable Resting Heart Rate: {stats_data.get('heartRate', '72 BPM')}
- Sleep Duration: {stats_data.get('sleepHours', '7.5 hrs')}
- Language Preference: {language}

Task:
1. Provide a brief, supportive cognitive summary in simple language for the caregiver.
2. Recommend 2 specific follow-up activities tailored to the elder (e.g., Focus Game, Memory Match, Bihu Music Recall).
3. Provide a concise clinical observation.

Format output as JSON with keys: "analysis", "recommended_activities", "clinical_note".
"""

    # Run VLM Inference
    try:
        enc_image = vlm_processor.encode_image(pil_image)
        raw_output = vlm_model.answer_question(enc_image, prompt, vlm_processor)
        
        # Try parsing JSON output from VLM response; fallback if unformatted
        try:
            parsed_json = json.loads(raw_output)
            return VLMResponse(
                analysis=parsed_json.get("analysis", raw_output),
                recommended_activities=parsed_json.get("recommended_activities", ["Focus Game", "Memory Match"]),
                clinical_note=parsed_json.get("clinical_note", "Maintain current daily engagement routine.")
            )
        except Exception:
            # Fallback structured response if VLM generates plain text
            return VLMResponse(
                analysis=raw_output,
                recommended_activities=["Focus Game", "Northeast Heritage Music Recall"],
                clinical_note=f"Sustained focus observed during {stats_data.get('gameName', 'activity')}. Keep sessions under 10 minutes."
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"VLM Inference failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("vlm_service:app", host="0.0.0.0", port=8000, reload=True)