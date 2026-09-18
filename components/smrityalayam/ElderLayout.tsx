'use client'

import React from 'react'
import { useApp } from './AppContext'

interface ElderLayoutProps {
  children: React.ReactNode
  active: 'home' | 'activities' | 'cultural' | 'reminders' | 'fitness' | 'progress' | 'community' | 'settings'
}

export default function ElderLayout({ children, active }: ElderLayoutProps) {
  const { navigate, settings, toggleSetting, elderName } = useApp()

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'activities', label: 'Cognitive Games', icon: '🎮' },
    { id: 'cultural', label: 'Culture Hub', icon: '🌺' },
    { id: 'community', label: 'Community & Peer Rank', icon: '👥' },
    { id: 'reminders', label: 'Reminders', icon: '🔔' },
    { id: 'fitness', label: 'Fitbit Telemetry', icon: '⌚' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  const isAudioOn = settings?.enableCommunityChat ?? true

  return (
    <div className="min-h-screen bg-[#F7F0DE] flex flex-col md:flex-row text-[#2B2118]">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#FFFCF4] border-r-2 border-[#EFE4C8] p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* App Branding */}
          <div 
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-3xl">🪷</span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#7A2E2E]">
                Smrityalayam
              </h1>
              <p className="text-[10px] text-[#5B4E3F] font-semibold">
                Senior Citizen Portal
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7A2E2E] text-white shadow-xs'
                      : 'text-[#5B4E3F] hover:bg-[#F7F0DE] hover:text-[#2B2118]'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Audio Toggle Footer Button */}
        <div className="pt-4 border-t border-[#EFE4C8]">
          <button
            onClick={() => {
              if (toggleSetting) {
                toggleSetting('enableCommunityChat' as any)
              }
            }}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isAudioOn
                ? 'bg-[#F7F0DE] text-[#7A2E2E] border border-[#EFE4C8]'
                : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}
          >
            <span>{isAudioOn ? '🔊' : '🔇'}</span>
            <span>{isAudioOn ? 'Voice Guidance ON' : 'Voice Guidance OFF'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}