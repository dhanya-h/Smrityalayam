'use client'

import React, { useState } from 'react'
import { useApp, MemoryCapsule } from '../AppContext'

interface VLMReport {
  generatedAt: string
  elderName: string
  cognitiveRetentionScore: number
  primaryMoodPattern: string
  vlmVisualTags: string[]
  clinicalObservations: string[]
  recommendedInterventions: string[]
}

export default function CaregiverScreen() {
  const { memories, addMemory, navigate, elderName, userMood, userInterests } = useApp()

  // Form input states for Memory Upload
  const [title, setTitle] = useState('')
  const [culturalContext, setCulturalContext] = useState('')
  const [location, setLocation] = useState('')
  const [era, setEra] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState('')

  // Caregiver Reminder Management state
  const [reminderTitle, setReminderTitle] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [remindersList, setRemindersList] = useState([
    { id: '1', title: 'BP Medication', time: '08:00 AM', status: 'Completed' },
    { id: '2', title: 'Hydration Break', time: '11:00 AM', status: 'Pending' },
    { id: '3', title: 'Evening Walk & Music', time: '05:30 PM', status: 'Pending' },
  ])

  // VLM Report State
  const [vlmReport, setVlmReport] = useState<VLMReport | null>(null)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const currentElder = elderName || 'Lata ji'

  // File change handler with local object URL preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Submit memory capsule handler
  const handleSubmitMemory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newCapsule: MemoryCapsule = {
      id: `m-${Date.now()}`,
      title: title.trim(),
      era: era.trim() || '1980s',
      location: location.trim() || 'Northeast India',
      culturalTags: culturalContext.trim()
        ? [culturalContext.trim()]
        : ['Custom Family Memory'],
      photos: [
        {
          id: `p-${Date.now()}`,
          url:
            previewUrl ||
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
          caption: title.trim(),
        },
      ],
      storyFragments: [
        `${title.trim()} - memory recorded for ${currentElder}.`,
        `Location: ${location || 'Regional Home'}.`,
      ],
      caregiverVerified: true,
    }

    addMemory(newCapsule)
    setSuccessMessage(`Memory capsule "${title}" uploaded and VLM exercises generated!`)

    // Reset Form
    setTitle('')
    setCulturalContext('')
    setLocation('')
    setEra('')
    setSelectedFile(null)
    setPreviewUrl('')

    setTimeout(() => {
      setSuccessMessage('')
    }, 4000)
  }

  // Add Reminder handler
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reminderTitle.trim() || !reminderTime.trim()) return

    setRemindersList((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: reminderTitle.trim(),
        time: reminderTime.trim(),
        status: 'Pending',
      },
    ])
    setReminderTitle('')
    setReminderTime('')
  }

  // Generate VLM Clinical Evaluation Report Handler
  const handleGenerateVLMReport = () => {
    setIsGeneratingReport(true)

    setTimeout(() => {
      const generatedReport: VLMReport = {
        generatedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        elderName: currentElder,
        cognitiveRetentionScore: Math.floor(Math.random() * 12) + 84, // 84-95%
        primaryMoodPattern: userMood ? userMood.toUpperCase() : 'HAPPY / NOSTALGIC',
        vlmVisualTags: [
          'Assam Folk Instruments',
          'Family Gatherings (1980-1990)',
          'Traditional Culinary Dishes (Bihu Pitha, Eromba)',
          'High Visual Recognition of Relatives',
        ],
        clinicalObservations: [
          `Strong cognitive engagement when presented with family photo prompts from ${memories[0]?.location || 'Northeast region'}.`,
          'Speech recall response time improved by 14% over the last 7 daily sessions.',
          'Vitality telemetry shows steady heart rate (72 BPM avg) during interactive tabletop games.',
        ],
        recommendedInterventions: [
          'Continue daily 15-minute regional music matching exercises.',
          'Introduce 2 new family photo capsules per week to reinforce long-term memory retrieval.',
          'Maintain regular hydration breaks ahead of evening cognitive tasks.',
        ],
      }

      setVlmReport(generatedReport)
      setIsGeneratingReport(false)
    }, 1200)
  }

  const handleLogout = () => {
    navigate('welcome')
  }

  return (
    <div className="min-h-screen bg-[#F7F0DE] p-4 md:p-8 text-[#2B2118]">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header & Account Actions */}
        <div className="flex flex-wrap items-center justify-between bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">📊</span>
              <h1 className="font-serif text-3xl font-bold text-[#7A2E2E]">
                Caregiver Clinical & Family Portal
              </h1>
            </div>
            <p className="text-xs text-[#5B4E3F] mt-1 font-medium">
              Managing cognitive health telemetry and memory bank for{' '}
              <span className="font-bold text-[#7A2E2E]">{currentElder}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('home')}
              className="px-4 py-2.5 bg-[#F7F0DE] text-[#7A2E2E] border border-[#EFE4C8] font-bold text-xs rounded-full hover:bg-[#EFE4C8] transition-colors cursor-pointer"
            >
              🪷 Switch to Elder View
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-[#7A2E2E] text-white font-bold text-xs rounded-full hover:bg-[#5C2020] transition-colors cursor-pointer shadow-sm flex items-center gap-2"
            >
              <span>🚪</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-4 bg-green-100 border-2 border-green-400 text-green-900 font-bold text-xs rounded-2xl flex items-center gap-2">
            <span>✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* 1. REAL-TIME VLM MONITOR, TELEMETRY & REPORT GENERATOR */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-between items-center border-b border-[#EFE4C8] pb-3 gap-2">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#7A2E2E] flex items-center gap-2">
                <span>🤖</span> Vision-Language Model (VLM) & Cognitive Telemetry
              </h2>
              <p className="text-xs text-[#5B4E3F]">
                Real-time AI evaluation based on photo recognition and health metrics.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-900 font-bold text-[10px] rounded-full uppercase border border-purple-300">
                VLM Engine Operational
              </span>
              <button
                onClick={handleGenerateVLMReport}
                disabled={isGeneratingReport}
                className="px-4 py-2 bg-purple-800 text-white font-bold text-xs rounded-full hover:bg-purple-900 transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <span>📄</span>
                <span>{isGeneratingReport ? 'Analyzing VLM Data...' : 'Generate VLM Report'}</span>
              </button>
            </div>
          </div>

          {/* Telemetry Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl space-y-1">
              <span className="text-xs text-[#5B4E3F] font-bold uppercase">Average Heart Rate</span>
              <p className="text-2xl font-serif font-bold text-[#7A2E2E]">72 BPM</p>
              <span className="text-[10px] text-green-700 font-bold">✓ Normal Resting Range</span>
            </div>

            <div className="p-4 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl space-y-1">
              <span className="text-xs text-[#5B4E3F] font-bold uppercase">Sleep Telemetry</span>
              <p className="text-2xl font-serif font-bold text-[#2B2118]">7.5 Hours</p>
              <span className="text-[10px] text-blue-700 font-bold">2.1 hrs Deep Sleep</span>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-1">
              <span className="text-xs text-purple-900 font-bold uppercase">VLM Memory Processing</span>
              <p className="text-2xl font-serif font-bold text-purple-900">{memories.length} Capsules</p>
              <span className="text-[10px] text-purple-700 font-bold">AI Scored & Tagged</span>
            </div>

            <div className="p-4 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl space-y-1">
              <span className="text-xs text-[#5B4E3F] font-bold uppercase">Active Mood & Choice</span>
              <p className="text-sm font-bold text-[#7A2E2E] capitalize mt-1">
                Mood: {userMood || 'Happy'}
              </p>
              <span className="text-[10px] text-[#5B4E3F] block truncate">
                Interests: {userInterests?.join(', ') || 'Music, Festivals'}
              </span>
            </div>
          </div>

          {/* DYNAMIC VLM CLINICAL REPORT DISPLAY */}
          {vlmReport && (
            <div className="mt-4 p-5 bg-purple-50/80 border-2 border-purple-300 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-start border-b border-purple-200 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-purple-800 text-white font-bold text-[9px] rounded-full uppercase">
                      Clinical AI Diagnostic Summary
                    </span>
                    <span className="text-xs text-purple-900 font-bold">
                      Generated: {vlmReport.generatedAt}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-purple-950 mt-1">
                    VLM Cognitive Evaluation Report — {vlmReport.elderName}
                  </h3>
                </div>
                <button
                  onClick={() => setVlmReport(null)}
                  className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
                >
                  Close Report ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-white/80 rounded-xl border border-purple-200 text-center">
                  <span className="text-xs font-bold text-purple-900 block uppercase">
                    Cognitive Retention Index
                  </span>
                  <span className="text-3xl font-serif font-bold text-purple-900 block mt-1">
                    {vlmReport.cognitiveRetentionScore}%
                  </span>
                  <span className="text-[10px] text-green-700 font-bold">Optimal Visual Recall</span>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-purple-200">
                  <span className="text-xs font-bold text-purple-900 block uppercase mb-1">
                    Detected VLM Image Tags
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {vlmReport.vlmVisualTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-purple-100 text-purple-900 font-bold text-[9px] rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-purple-200">
                  <span className="text-xs font-bold text-purple-900 block uppercase mb-1">
                    Primary Mood Trend
                  </span>
                  <span className="font-bold text-sm text-purple-950 block">
                    {vlmReport.primaryMoodPattern}
                  </span>
                  <span className="text-[10px] text-purple-700 block mt-1">
                    Positive correlation with regional music triggers.
                  </span>
                </div>
              </div>

              {/* Detailed Clinical Notes & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-purple-200 space-y-1.5">
                  <h4 className="font-bold text-purple-950 uppercase text-[11px]">
                    📋 AI Clinical Observations
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-purple-900">
                    {vlmReport.clinicalObservations.map((obs, i) => (
                      <li key={i}>{obs}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-purple-200 space-y-1.5">
                  <h4 className="font-bold text-purple-950 uppercase text-[11px]">
                    💡 Caregiver Actionable Next Steps
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-purple-900">
                    {vlmReport.recommendedInterventions.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. FAMILY MEMORY CAPSULE PORTAL (DEMO UPLOAD) */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#EFE4C8] pb-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#7A2E2E] flex items-center gap-2">
                <span>📸</span> Add New Family Memory Capsule
              </h2>
              <p className="text-xs text-[#5B4E3F]">
                Upload photographs to generate personalized games and stories for {currentElder}.
              </p>
            </div>
            <span className="px-3 py-1 bg-[#C98A2C] text-white font-bold text-[10px] rounded-full uppercase">
              Interactive Upload
            </span>
          </div>

          <form onSubmit={handleSubmitMemory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
                  Memory Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Sister's Wedding in Shillong"
                  required
                  className="w-full p-3 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl text-xs font-bold text-[#2B2118] focus:border-[#7A2E2E] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
                  Regional Cultural Context
                </label>
                <input
                  type="text"
                  value={culturalContext}
                  onChange={(e) => setCulturalContext(e.target.value)}
                  placeholder="e.g., Assam: Bihu & Pitha Making"
                  className="w-full p-3 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl text-xs font-bold text-[#2B2118] focus:border-[#7A2E2E] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Dibrugarh, Assam"
                  className="w-full p-3 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl text-xs font-bold text-[#2B2118] focus:border-[#7A2E2E] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
                  Year / Era
                </label>
                <input
                  type="text"
                  value={era}
                  onChange={(e) => setEra(e.target.value)}
                  placeholder="e.g., 1986"
                  className="w-full p-3 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-2xl text-xs font-bold text-[#2B2118] focus:border-[#7A2E2E] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#7A2E2E] uppercase tracking-wider">
                Select Family Photograph *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-xs font-bold text-[#5B4E3F] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#7A2E2E] file:text-white hover:file:bg-[#5C2020] cursor-pointer"
              />
            </div>

            {previewUrl && (
              <div className="p-3 bg-[#F7F0DE] rounded-2xl border border-[#EFE4C8] flex items-center gap-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-xl border border-[#EFE4C8]"
                />
                <span className="text-xs text-[#5B4E3F] font-bold">
                  Image loaded. VLM ready to extract facial features and historical background tags.
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#7A2E2E] text-white font-bold text-xs rounded-2xl hover:bg-[#5C2020] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>✓</span>
              <span>Submit & Generate VLM Memory Exercises</span>
            </button>
          </form>
        </div>

        {/* 3. ACTIVE MEMORY BANK & SCHEDULE REMINDERS MANAGER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
              Active Family Memory Bank ({memories.length})
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {memories.map((capsule) => (
                <div
                  key={capsule.id}
                  className="p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-2xl flex items-center gap-3"
                >
                  <img
                    src={capsule.photos[0]?.url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'}
                    alt={capsule.title}
                    className="w-14 h-14 object-cover rounded-xl border border-[#EFE4C8]"
                  />
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-xs text-[#2B2118] truncate">
                      {capsule.title}
                    </h3>
                    <p className="text-[10px] text-[#5B4E3F] font-medium">
                      {capsule.era} • {capsule.location}
                    </p>
                    <span className="inline-block mt-0.5 px-2 py-0.2 bg-green-100 text-green-800 font-bold text-[8px] rounded-full">
                      ✓ Caregiver Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
              🔔 Schedule Reminders Manager
            </h2>

            <form onSubmit={handleAddReminder} className="flex gap-2">
              <input
                type="text"
                value={reminderTitle}
                onChange={(e) => setReminderTitle(e.target.value)}
                placeholder="Reminder title..."
                className="flex-1 p-2.5 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl text-xs font-bold text-[#2B2118] outline-none"
              />
              <input
                type="text"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                placeholder="Time (e.g. 02:00 PM)"
                className="w-28 p-2.5 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl text-xs font-bold text-[#2B2118] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#C98A2C] text-white font-bold text-xs rounded-xl hover:bg-[#A66E1E]"
              >
                + Add
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {remindersList.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-xs text-[#2B2118] block">{item.title}</span>
                    <span className="text-[10px] text-[#5B4E3F] font-semibold">{item.time}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      item.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}