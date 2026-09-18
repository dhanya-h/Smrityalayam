'use client'

import React, { useState } from 'react';
import { useVLM } from './useVLM';
import { useApp } from './AppContext';

export default function VLMInsightsCard() {
  const { elderName, settings } = useApp();
  const { analyzeStats, loading, result, error } = useVLM();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleRunAnalysis = async () => {
    const mockStats = {
      elderName: elderName || 'Lata ji',
      gameName: 'Focus & Selective Attention Test',
      accuracy: '88%',
      completionTime: '32s',
      mistakes: 1,
      heartRate: '72 BPM',
      sleepHours: '7.5 hrs',
    };

    await analyzeStats(mockStats, settings.language, selectedFile || undefined);
  };

  return (
    <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#EFE4C8] pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👁️‍🗨️</span>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
              VLM Cognitive Recommendation Engine
            </h2>
            <p className="text-xs text-[#5B4E3F]">
              AI Multimodal analysis of gameplay telemetry & visual metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Image Upload Input for Charts/Screenshots */}
      <div className="p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl flex items-center justify-between text-xs">
        <div>
          <span className="font-bold block text-[#2B2118]">Attach Telemetry Chart / Screenshot (Optional):</span>
          <span className="text-[#5B4E3F] text-[10px]">Upload a performance graph or game result screenshot.</span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="text-xs text-[#5B4E3F] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#7A2E2E] file:text-white hover:file:bg-[#5C2020] cursor-pointer"
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleRunAnalysis}
        disabled={loading}
        className={`w-full py-3.5 rounded-full font-bold text-xs text-white transition-all cursor-pointer shadow-sm ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7A2E2E] hover:bg-[#5C2020]'
        }`}
      >
        {loading ? '🧠 VLM Model Processing Metrics & Image...' : '✨ Generate VLM Recommendation'}
      </button>

      {error && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-900 rounded-xl text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* VLM Result Display */}
      {result && (
        <div className="p-4 bg-[#F7F0DE] border-2 border-[#EFE4C8] rounded-2xl space-y-3">
          <div>
            <span className="text-[10px] font-bold text-[#C98A2C] uppercase tracking-wider block">
              Cognitive Summary & Assessment
            </span>
            <p className="text-xs text-[#2B2118] font-medium leading-relaxed mt-1">
              {result.analysis}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#7A2E2E] uppercase tracking-wider block">
              Recommended Follow-Up Activities
            </span>
            <div className="flex gap-2 mt-1.5 flex-wrap">
              {result.recommended_activities.map((act, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#FFFCF4] border border-[#EFE4C8] text-[#7A2E2E] font-bold text-[11px] rounded-full shadow-2xs"
                >
                  🎯 {act}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#EFE4C8]">
            <span className="text-[10px] font-bold text-[#2E4057] uppercase tracking-wider block">
              Clinical Caregiver Note
            </span>
            <p className="text-xs text-[#5B4E3F] italic mt-0.5">
              "{result.clinical_note}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}