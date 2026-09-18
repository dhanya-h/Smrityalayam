'use client'

import React from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { LANGUAGES_META, SupportedLanguage } from '../i18n'
import { useApp } from '../AppContext'

export default function SettingsScreen() {
  const { settings, toggleSetting, navigate } = useApp()

  const currentLang = (settings?.language as SupportedLanguage) || 'en'

  const handleLanguageChange = (langKey: SupportedLanguage) => {
    if (settings) {
      settings.language = langKey
      navigate('settings')
    }
  }

  const handleLogout = () => {
    navigate('welcome')
  }

  return (
    <ElderLayout active="settings">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#7A2E2E]">
              ⚙️ Settings & Language
            </h1>
            <p className="text-xs text-[#5B4E3F] mt-1 font-medium">
              Customize app language, accessibility, and community privacy preferences.
            </p>
          </div>
          <ReadAloudButton textToRead="Settings and Language. Choose your preferred regional language and app preferences." />
        </div>

        {/* 1. Language Selection Grid */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="border-b border-[#EFE4C8] pb-3">
            <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
              🌐 Select Regional Language ({Object.keys(LANGUAGES_META).length} Supported)
            </h2>
            <p className="text-xs text-[#5B4E3F]">
              Choose the language for voice narration, speech exercises, and game text.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
            {(Object.keys(LANGUAGES_META) as SupportedLanguage[]).map((l) => {
              const isSelected = currentLang === l
              const meta = LANGUAGES_META[l]

              return (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`p-3 rounded-2xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#7A2E2E] text-white border-[#7A2E2E] shadow-xs'
                      : 'bg-[#F7F0DE] border-[#EFE4C8] text-[#2B2118] hover:bg-[#EFE4C8]'
                  }`}
                >
                  <span className="text-2xl">{meta.flag}</span>
                  <div className="overflow-hidden">
                    <span className="font-bold text-xs block leading-tight truncate">
                      {meta.nativeName.trim()}
                    </span>
                    <span
                      className={`text-[10px] block truncate ${
                        isSelected ? 'text-white/80' : 'text-[#5B4E3F]'
                      }`}
                    >
                      {meta.name}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Audio & Accessibility Settings */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
            🔊 Audio & Read-Aloud Guidance
          </h2>
          <div className="p-4 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#2B2118]">
                Read-Aloud Voice Narration
              </h3>
              <p className="text-xs text-[#5B4E3F]">
                Enable speech audio guidance tailored for senior cognitive ease.
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
              Enabled ✓
            </span>
          </div>
        </div>

        {/* 3. Privacy, Chat & Comparative Score Toggles */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
            👥 Privacy & Community Settings
          </h2>

          {/* Toggle: Peer Community Chat */}
          <div className="p-4 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#2B2118]">
                Enable Peer Community Chat
              </h3>
              <p className="text-xs text-[#5B4E3F]">
                Interact and chat with other seniors across Northeast India.
              </p>
            </div>
            <button
              onClick={() => toggleSetting && toggleSetting('enableCommunityChat' as any)}
              className={`px-4 py-2 rounded-full font-bold text-xs cursor-pointer transition-colors ${
                settings?.enableCommunityChat
                  ? 'bg-[#7A2E2E] text-white'
                  : 'bg-[#EFE4C8] text-[#5B4E3F]'
              }`}
            >
              {settings?.enableCommunityChat ? 'Enabled ✓' : 'Disabled'}
            </button>
          </div>

          {/* Toggle: Comparative Leaderboard Scores */}
          <div className="p-4 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#2B2118]">
                Share Comparative Scores on Leaderboard
              </h3>
              <p className="text-xs text-[#5B4E3F]">
                Display your cognitive game scores on the regional peer rankings.
              </p>
            </div>
            <button
              onClick={() => toggleSetting && toggleSetting('shareComparativeScores' as any)}
              className={`px-4 py-2 rounded-full font-bold text-xs cursor-pointer transition-colors ${
                settings?.shareComparativeScores
                  ? 'bg-[#7A2E2E] text-white'
                  : 'bg-[#EFE4C8] text-[#5B4E3F]'
              }`}
            >
              {settings?.shareComparativeScores ? 'Enabled ✓' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* 4. Account Actions */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
            🚪 Account Actions
          </h2>
          <p className="text-xs text-[#5B4E3F]">
            Log out to return to the onboarding screen or switch between Caregiver and Elder profiles.
          </p>
          <button
            onClick={handleLogout}
            className="w-full py-3.5 bg-[#7A2E2E] text-white font-bold text-xs rounded-full hover:bg-[#5C2020] transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            <span>Log Out & Return to Welcome Screen</span>
          </button>
        </div>
      </div>
    </ElderLayout>
  )
}