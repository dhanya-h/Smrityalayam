'use client'

import React, { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useT } from '../useT'
import { useApp } from '../AppContext'

interface ReminderItem {
  id: string
  time: string
  title: string
  description: string
  icon: string
  completed: boolean
}

const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'r1',
    time: '08:00 AM',
    title: 'Morning Medicine',
    description: 'Take BP tablet with warm water after breakfast.',
    icon: '💊',
    completed: true,
  },
  {
    id: 'r2',
    time: '11:00 AM',
    title: 'Hydration Break',
    description: 'Drink 1 glass of water or fresh fruit juice.',
    icon: '🥛',
    completed: false,
  },
  {
    id: 'r3',
    time: '02:00 PM',
    title: 'Post-Lunch Rest & Music',
    description: 'Listen to 15 mins of calming regional music.',
    icon: '🎵',
    completed: false,
  },
  {
    id: 'r4',
    time: '08:00 PM',
    title: 'Night Medicine',
    description: 'Take evening dosage after dinner.',
    icon: '🌙',
    completed: false,
  },
]

export default function RemindersScreen() {
  const { settings } = useApp()
  const t = useT()
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS)

  // Safe fallback translation strings
  const title = t.reminders_title || 'Daily Health Reminders'
  const sub =
    (t as any)?.reminders_sub ||
    'Interactive schedule for medicines, hydration, and appointments.'

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  return (
    <ElderLayout active="reminders" as any>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#7A2E2E]">
              🔔 {title}
            </h2>
            <p className="text-[#5B4E3F] text-sm mt-1 font-medium">{sub}</p>
          </div>
          <ReadAloudButton textToRead={`${title}. ${sub}`} />
        </div>

        {/* Reminders List */}
        <div className="space-y-3">
          {reminders.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleReminder(item.id)}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                item.completed
                  ? 'bg-green-50/50 border-green-200 text-green-900 opacity-80'
                  : 'bg-[#FFFCF4] border-[#EFE4C8] hover:border-[#7A2E2E] text-[#2B2118]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#F7F0DE] text-[#7A2E2E] font-bold text-[10px] rounded-full border border-[#EFE4C8]">
                      {item.time}
                    </span>
                    <h3
                      className={`font-bold text-base ${
                        item.completed ? 'line-through' : ''
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#5B4E3F] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Status Checkbox */}
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  item.completed
                    ? 'bg-green-600 border-green-600 text-white font-bold'
                    : 'border-[#EFE4C8] bg-[#F7F0DE]'
                }`}
              >
                {item.completed ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ElderLayout>
  )
}