'use client'

import { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useLang } from '../useT'
import { useApp } from '../AppContext'

export default function VoiceRecallGame() {
  const { navigate, memories } = useApp()
  const lang = useLang()
  const [isRecording, setIsRecording] = useState(false)
  const [recordedText, setRecordedText] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  // Use caregiver uploaded memory capsule or regional fallback
  const activeMemory = memories && memories.length > 0 ? memories[0] : null

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      setIsSaved(false)
      
      // Simulate speech recognition & transcription
      setTimeout(() => {
        setRecordedText(
          lang === 'hi'
            ? 'मुझे याद है, इस दिन हमने बीहू उत्सव में पीठा बनाया था और परिवार के सभी लोग शामिल हुए थे।'
            : 'I remember this day! We cooked fresh Pitha during Bihu in Guwahati and the whole family came together.'
        )
        setIsRecording(false)
      }, 4000)
    } else {
      setIsRecording(false)
    }
  }

  const handleSaveToBank = () => {
    setIsSaved(true)
  }

  return (
    <ElderLayout active="activities">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('activities')}
            className="px-4 py-2 bg-[#F7F0DE] text-[#7A2E2E] border border-[#EFE4C8] font-bold rounded-full text-xs hover:bg-[#7A2E2E] hover:text-white transition-colors cursor-pointer"
          >
            ← {lang === 'hi' ? 'वापस' : 'Back'}
          </button>
          <ReadAloudButton textToRead="Tell Me About This. Look at the photograph and share your memories out loud." />
        </div>

        {/* Main Card */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 text-center space-y-5 shadow-sm">
          <div className="border-b border-[#EFE4C8] pb-3">
            <span className="px-3 py-1 bg-[#C98A2C] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Voice Recall Activity
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#7A2E2E] mt-2">
              🗣️ {lang === 'hi' ? 'इस याद के बारे में बताएं' : 'Tell Me About This'}
            </h1>
          </div>

          {/* Photo Display Frame */}
          <div className="w-full h-64 bg-[#F7F0DE] rounded-2xl border-2 border-[#EFE4C8] overflow-hidden flex items-center justify-center relative shadow-inner">
            {activeMemory?.photos?.[0]?.url ? (
              <img
                src={activeMemory.photos[0].url}
                alt="Family Memory"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-8xl">🖼️</span>
            )}
            <div className="absolute bottom-3 left-3 bg-[#F7F0DE] px-3 py-1.5 rounded-full text-xs font-bold text-[#7A2E2E] border border-[#EFE4C8] shadow-sm">
              📍 {activeMemory?.location || 'Guwahati Home'} • {activeMemory?.era || '1986'}
            </div>
          </div>

          <p className="text-[#5B4E3F] text-sm font-semibold">
            {lang === 'hi'
              ? 'इस तस्वीर को देखकर आपको क्या याद आता है? अपनी स्वाभाविक बोली में बोलें।'
              : 'What do you remember about this day or place? Speak naturally.'}
          </p>

          {/* Recording Trigger */}
          <button
            onClick={toggleRecording}
            className={`w-full py-4 rounded-full font-bold text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
              isRecording
                ? 'bg-red-700 text-white animate-pulse'
                : 'bg-[#7A2E2E] text-white hover:bg-[#5C2020]'
            }`}
          >
            <span>{isRecording ? '🎙️' : '🎙️'}</span>
            <span>
              {isRecording
                ? 'Listening... Speak Your Memory Now'
                : 'Tap & Speak Your Memory Out Loud'}
            </span>
          </button>

          {/* Speech-to-Text Result */}
          {recordedText && (
            <div className="p-4 bg-[#F7F0DE] border-2 border-[#EFE4C8] rounded-2xl text-left space-y-3">
              <span className="text-[10px] font-bold text-[#C98A2C] uppercase tracking-wider block">
                Transcribed Audio Memory:
              </span>
              <p className="text-xs text-[#2B2118] font-serif italic leading-relaxed">
                "{recordedText}"
              </p>

              {!isSaved ? (
                <button
                  onClick={handleSaveToBank}
                  className="w-full py-2 bg-[#C98A2C] text-white font-bold text-xs rounded-full hover:bg-[#A66E1E] transition-colors cursor-pointer"
                >
                  ✓ Save Story to Family Memory Capsule
                </button>
              ) : (
                <div className="p-2 bg-green-100 border border-green-300 rounded-xl text-center text-green-900 font-bold text-xs">
                  ✓ Memory Saved & Sent to Caregiver Dashboard!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ElderLayout>
  )
}