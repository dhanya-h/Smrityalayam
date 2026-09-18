'use client'

import React, { useMemo } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useT } from '../useT'
import { useApp } from '../AppContext'
import { getRecommendations } from '../recommendations'

export default function ElderHome() {
  const { navigate, elderName, userInterests, userMood, memories } = useApp()
  const t = useT()

  // Dynamic VLM-backed recommendation generation
  const recommendations = useMemo(() => {
    return getRecommendations(userInterests || [], userMood || undefined)
  }, [userInterests, userMood])

  // Count caregiver-uploaded family capsules (prior experience)
  const familyCapsuleCount = memories?.length || 0
  const latestFamilyCapsule = memories?.[0]

  return (
    <ElderLayout active="home">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2B2118]">
                Good Morning, {elderName || 'Lata ji'} 🙏
              </h1>
              <p className="text-[#5B4E3F] text-sm mt-2 font-medium">
                {t.welcomeSub}
              </p>
            </div>
            <ReadAloudButton
              textToRead={`Good Morning, ${
                elderName || 'Lata ji'
              }. ${t.welcomeSub}`}
            />
          </div>

          {/* User Context & VLM Telemetry Badge */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-[#EFE4C8]">
            {userMood && (
              <span className="px-3 py-1 bg-[#F7F0DE] border border-[#EFE4C8] text-[#7A2E2E] font-bold text-[10px] rounded-full flex items-center gap-1">
                <span>💭 Mood:</span>
                <span className="capitalize">{userMood}</span>
              </span>
            )}
            {userInterests && userInterests.length > 0 && (
              <span className="px-3 py-1 bg-[#F7F0DE] border border-[#EFE4C8] text-[#5B4E3F] font-bold text-[10px] rounded-full flex items-center gap-1">
                <span>🎯 Interests:</span>
                <span className="capitalize">{userInterests.join(', ')}</span>
              </span>
            )}
            <span className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-800 font-bold text-[10px] rounded-full flex items-center gap-1">
              <span>🤖 VLM Active:</span>
              <span>{familyCapsuleCount} Family Memories Loaded</span>
            </span>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex gap-3 pt-2 flex-wrap">
            <button
              onClick={() => navigate('activities')}
              className="px-5 py-2.5 bg-[#7A2E2E] text-white font-bold text-xs rounded-full hover:bg-[#5C2020] transition-colors cursor-pointer shadow-sm flex items-center gap-2"
            >
              <span>🎮</span>
              <span>{t.activities}</span>
            </button>

            <button
              onClick={() => navigate('reminders')}
              className="px-5 py-2.5 bg-[#F7F0DE] text-[#2B2118] border border-[#EFE4C8] font-bold text-xs rounded-full hover:bg-[#EFE4C8] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>🔔</span>
              <span>{t.reminders_title}</span>
            </button>

            <button
              onClick={() => navigate('fitness')}
              className="px-5 py-2.5 bg-blue-50 text-blue-900 border border-blue-200 font-bold text-xs rounded-full hover:bg-blue-100 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>⌚</span>
              <span>Fitbit Telemetry</span>
            </button>
          </div>
        </div>

        {/* Personalized Prior Experience Spotlight (Family Memory Capsule) */}
        {latestFamilyCapsule && (
          <div className="p-5 bg-amber-50/70 border-2 border-amber-200 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={
                  latestFamilyCapsule.photos[0]?.url ||
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
                }
                alt={latestFamilyCapsule.title}
                className="w-16 h-16 object-cover rounded-2xl border border-amber-300"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#7A2E2E] text-white font-bold text-[9px] rounded-full uppercase">
                    Personalized Story Match
                  </span>
                  <span className="text-xs text-[#5B4E3F] font-bold">
                    {latestFamilyCapsule.era}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#2B2118] mt-0.5">
                  {latestFamilyCapsule.title}
                </h3>
                <p className="text-xs text-[#5B4E3F]">
                  {latestFamilyCapsule.location}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('story-sequence')}
              className="px-4 py-2 bg-[#7A2E2E] text-white font-bold text-xs rounded-full hover:bg-[#5C2020] transition-colors cursor-pointer shadow-xs"
            >
              Play Story Sequence →
            </button>
          </div>
        )}

        {/* Dynamic VLM Recommendations Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#7A2E2E]">
                Recommended For You
              </h2>
              <p className="text-[11px] text-[#5B4E3F]">
                Tailored based on your mood ({userMood || 'happy'}), interests, and prior regional memories.
              </p>
            </div>
            <button
              onClick={() => navigate('activities')}
              className="text-xs font-bold text-[#C98A2C] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.screen)}
                className="bg-[#FFFCF4] border-2 border-[#EFE4C8] hover:border-[#7A2E2E] rounded-2xl p-5 shadow-sm transition-all cursor-pointer flex flex-col justify-between h-52 group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-3xl block mb-2">{item.icon}</span>
                    <span className="px-2 py-0.5 bg-[#F7F0DE] text-[#7A2E2E] font-bold text-[9px] rounded-full border border-[#EFE4C8]">
                      VLM Scored
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#2B2118] group-hover:text-[#7A2E2E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#5B4E3F] text-xs mt-1 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#EFE4C8]/60 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#5B4E3F] uppercase">
                    {item.interests.join(' • ')}
                  </span>
                  <span className="text-xs font-bold text-[#7A2E2E]">
                    Start →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders Banner */}
        <div className="p-4 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💊</span>
            <div>
              <h3 className="font-bold text-sm text-[#2B2118]">
                Daily Medicines & Hydration
              </h3>
              <p className="text-xs text-[#5B4E3F]">
                View daily schedule and medical reminders
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('reminders')}
            className="px-4 py-2 bg-[#C98A2C] text-white font-bold text-xs rounded-full hover:bg-[#A66E1E] transition-colors cursor-pointer"
          >
            View Schedule
          </button>
        </div>
      </div>
    </ElderLayout>
  )
}