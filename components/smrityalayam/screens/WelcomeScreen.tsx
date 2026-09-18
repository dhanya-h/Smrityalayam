'use client'

import React, { useState } from 'react'
import { LANGUAGES_META, SupportedLanguage } from '../i18n'
import { useApp } from '../AppContext'
import { useT } from '../useT'

export type DailyMood = 'happy' | 'calm' | 'nostalgic' | 'tired'
export type Interest = 'music' | 'storytelling' | 'food' | 'festivals' | 'games'

interface WelcomeScreenProps {
  onDone: (
    type: 'elder' | 'caregiver',
    name: string,
    interests: Interest[],
    mood: DailyMood | null
  ) => void
}

export default function WelcomeScreen({ onDone }: WelcomeScreenProps) {
  const { elderName, setUserProfile, settings } = useApp()
  const t = useT()

  const [nameInput, setNameInput] = useState(elderName || '')
  const [selectedMood, setSelectedMood] = useState<DailyMood | null>('happy')
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([
    'music',
    'festivals',
  ])
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(
    (settings?.language as SupportedLanguage) || 'en'
  )

  const MOODS: { id: DailyMood; emoji: string; label: string }[] = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'nostalgic', emoji: '🌸', label: 'Nostalgic' },
    { id: 'tired', emoji: '😴', label: 'Tired' },
  ]

  const INTERESTS: { id: Interest; emoji: string; label: string }[] = [
    { id: 'music', emoji: '🎵', label: 'Music' },
    { id: 'storytelling', emoji: '📖', label: 'Stories' },
    { id: 'food', emoji: '🍲', label: 'Regional Food' },
    { id: 'festivals', emoji: '🎉', label: 'Festivals' },
    { id: 'games', emoji: '🎯', label: 'Tabletop Games' },
  ]

  const handleSelectLanguage = (langKey: SupportedLanguage) => {
    setSelectedLang(langKey)
    if (settings) {
      settings.language = langKey
    }
  }

  const toggleInterest = (interestId: Interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((i) => i !== interestId)
        : [...prev, interestId]
    )
  }

  const handleContinue = (type: 'elder' | 'caregiver') => {
    const finalName = nameInput.trim() || 'Lata ji'
    
    // Save to global AppContext so ElderHome receives the updated name
    setUserProfile(type, finalName, selectedInterests, selectedMood)
    
    // Trigger parent completion callback
    onDone(type, finalName, selectedInterests, selectedMood)
  }

  return (
    <div className="min-h-screen bg-[#F7F0DE] flex items-center justify-center p-4 text-[#2B2118]">
      <div className="max-w-md w-full bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <span className="text-5xl block">🪷</span>
          <h1 className="font-serif text-3xl font-bold text-[#7A2E2E]">
            {t.appTitle || 'Smrityalayam'}
          </h1>
          <p className="text-xs text-[#5B4E3F] font-semibold">
            {t.appSubtitle || 'Cognitive Rehabilitation & Family Memories'}
          </p>
        </div>

        {/* 1. Name Input */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
            👤 What is your name?
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="e.g., Lata ji"
            className="w-full p-3 bg-[#F7F0DE] border-2 border-[#EFE4C8] rounded-2xl text-sm font-bold text-[#2B2118] focus:border-[#7A2E2E] outline-none"
          />
        </div>

        {/* 2. Daily Mood Check-In */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
            💭 How are you feeling today?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMood(m.id)}
                className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedMood === m.id
                    ? 'bg-[#7A2E2E] text-white border-[#7A2E2E]'
                    : 'bg-[#F7F0DE] border-[#EFE4C8] text-[#2B2118] hover:bg-[#EFE4C8]'
                }`}
              >
                <span className="text-2xl block">{m.emoji}</span>
                <span className="text-[10px] font-bold block mt-0.5">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Personal Interests */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
            🎯 What do you enjoy most?
          </label>
          <div className="flex flex-wrap gap-1.5">
            {INTERESTS.map((item) => {
              const isSelected = selectedInterests.includes(item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C98A2C] text-white border-[#C98A2C]'
                      : 'bg-[#F7F0DE] border-[#EFE4C8] text-[#2B2118]'
                  }`}
                >
                  {item.emoji} {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Language Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
            🌐 {t.selectLanguage || 'Select Language'}
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1 border-2 border-[#EFE4C8] p-2 rounded-2xl bg-[#F7F0DE]">
            {(Object.keys(LANGUAGES_META) as SupportedLanguage[]).map((langKey) => {
              const meta = LANGUAGES_META[langKey]
              const isSelected = selectedLang === langKey

              return (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => handleSelectLanguage(langKey)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7A2E2E] text-white border-[#7A2E2E]'
                      : 'bg-[#FFFCF4] border-[#EFE4C8] text-[#2B2118]'
                  }`}
                >
                  <span className="text-lg">{meta.flag}</span>
                  <span className="font-bold text-xs truncate">
                    {meta.nativeName.trim()}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Continue Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => handleContinue('elder')}
            className="w-full py-3.5 bg-[#7A2E2E] text-white font-bold rounded-full hover:bg-[#5C2020] transition-colors cursor-pointer text-xs shadow-md flex items-center justify-center gap-2"
          >
            <span>🪷</span>
            <span>Enter Elder Interactive Mode</span>
          </button>

          <button
            onClick={() => handleContinue('caregiver')}
            className="w-full py-2.5 bg-[#FFFCF4] text-[#7A2E2E] border-2 border-[#7A2E2E] font-bold rounded-full hover:bg-[#F7F0DE] transition-colors cursor-pointer text-xs flex items-center justify-center gap-2"
          >
            <span>📊</span>
            <span>Caregiver Management Portal</span>
          </button>
        </div>
      </div>
    </div>
  )
}