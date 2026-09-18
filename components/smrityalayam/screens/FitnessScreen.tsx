'use client'

import React from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useT } from '../useT'
import { useApp } from '../AppContext'

export default function FitnessScreen() {
  const { settings } = useApp()
  const t = useT()

  // Safe translation fallbacks for health telemetry keys
  const title = (t as any)?.fitness_title || 'Wearable Health & Fitness Telemetry'
  const sub = (t as any)?.fitness_sub || 'Real-time telemetry from Fitbit, Apple Health, and Smart Bands.'

  return (
    <ElderLayout active="fitness" as any>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#7A2E2E]">
              ⌚ {title}
            </h2>
            <p className="text-[#5B4E3F] text-sm mt-1 font-medium">
              {sub}
            </p>
          </div>
          <ReadAloudButton textToRead={`${title}. ${sub}`} />
        </div>

        {/* Telemetry Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Heart Rate */}
          <div className="p-5 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl">❤️</span>
              <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                Normal Pulse
              </span>
            </div>
            <h3 className="text-xs font-bold text-[#5B4E3F] uppercase tracking-wider">
              Heart Rate
            </h3>
            <p className="text-3xl font-serif font-bold text-[#2B2118]">
              72 <span className="text-xs font-sans text-[#5B4E3F]">BPM</span>
            </p>
            <span className="text-[10px] text-[#5B4E3F] block">Synced 2 mins ago</span>
          </div>

          {/* Card 2: Sleep Quality */}
          <div className="p-5 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🌙</span>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full">
                Restful
              </span>
            </div>
            <h3 className="text-xs font-bold text-[#5B4E3F] uppercase tracking-wider">
              Sleep Duration
            </h3>
            <p className="text-3xl font-serif font-bold text-[#2B2118]">
              7.5 <span className="text-xs font-sans text-[#5B4E3F]">Hours</span>
            </p>
            <span className="text-[10px] text-[#5B4E3F] block">Deep Sleep: 2.1 hrs</span>
          </div>

          {/* Card 3: Daily Steps */}
          <div className="p-5 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl">👟</span>
              <span className="px-2.5 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded-full">
                Goal 70%
              </span>
            </div>
            <h3 className="text-xs font-bold text-[#5B4E3F] uppercase tracking-wider">
              Steps Today
            </h3>
            <p className="text-3xl font-serif font-bold text-[#2B2118]">
              3,480 <span className="text-xs font-sans text-[#5B4E3F]">Steps</span>
            </p>
            <span className="text-[10px] text-[#5B4E3F] block">Target: 5,000 steps</span>
          </div>
        </div>

        {/* Device Sync Status */}
        <div className="p-5 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📡</span>
            <div>
              <h4 className="font-bold text-sm text-[#2B2118]">
                Fitbit Charge 6 Connected
              </h4>
              <p className="text-xs text-[#5B4E3F]">
                Continuous Bluetooth syncing enabled for caregiver health updates.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#7A2E2E] text-white font-bold text-xs rounded-full">
            Active Sync ✓
          </span>
        </div>
      </div>
    </ElderLayout>
  )
}