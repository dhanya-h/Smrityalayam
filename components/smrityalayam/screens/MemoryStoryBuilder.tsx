'use client'

import { useState } from 'react'
import { useApp } from '../AppContext'
import { MemoryCapsule } from '../memoryEngine'

export default function MemoryStoryBuilder() {
  const { navigate, addMemory } = useApp()
  const [title, setTitle] = useState('')
  const [era, setEra] = useState('')
  const [location, setLocation] = useState('')
  const [storyText, setStoryText] = useState('')
  const [culturalTag, setCulturalTag] = useState('Bihu Festival')

  const handleSaveCapsule = () => {
    if (!title) return

    const newCapsule: MemoryCapsule = {
      id: Date.now().toString(),
      title,
      era: era || '1985',
      location: location || 'Guwahati, Assam',
      culturalTags: [culturalTag],
      photos: [
        {
          id: 'p1',
          url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
          caption: title,
        },
      ],
      storyFragments: storyText
        ? storyText.split('.').filter((s) => s.trim().length > 0)
        : ['Family gathering in Assam.', 'Preparing traditional Pitha.'],
      caregiverVerified: true,
    }

    addMemory(newCapsule as any)
    navigate('caregiver')
  }

  return (
    <div className="min-h-screen bg-[#F7F0DE] p-6 text-[#2B2118]">
      <div className="max-w-2xl mx-auto bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#EFE4C8] pb-4">
          <h1 className="font-serif text-2xl font-bold text-[#7A2E2E]">
            🖼️ AI Memory Story Builder
          </h1>
          <button
            onClick={() => navigate('caregiver')}
            className="px-4 py-2 bg-[#EFE4C8] text-[#5B4E3F] font-bold text-xs rounded-full"
          >
            Cancel
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block font-bold text-xs text-[#5B4E3F] mb-1">
              Memory Title
            </label>
            <input
              type="text"
              placeholder="e.g., Sister's Wedding in Shillong"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-xs text-[#5B4E3F] mb-1">
                Year / Era
              </label>
              <input
                type="text"
                placeholder="1988"
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-xs text-[#5B4E3F] mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Shillong, Meghalaya"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-xs text-[#5B4E3F] mb-1">
              Regional Cultural Context
            </label>
            <select
              value={culturalTag}
              onChange={(e) => setCulturalTag(e.target.value)}
              className="w-full p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl font-bold"
            >
              <option value="Bihu Festival">Assam: Bihu & Pitha Making</option>
              <option value="Ningol Chakouba">Manipur: Ningol Chakouba Feast</option>
              <option value="Wangala Festival">Meghalaya: Wangala Drums</option>
              <option value="Chapchar Kut">Mizoram: Chapchar Kut Dance</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-xs text-[#5B4E3F] mb-1">
              Story Fragments (Separate sentences with periods)
            </label>
            <textarea
              rows={3}
              placeholder="We met at the ancestral home. Grandma served Jadoh and tea."
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              className="w-full p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl font-bold"
            />
          </div>
        </div>

        <button
          onClick={handleSaveCapsule}
          className="w-full py-4 bg-[#7A2E2E] text-white font-bold rounded-full hover:bg-[#5C2020] transition-colors cursor-pointer"
        >
          ✓ Verify & Generate Family Game
        </button>
      </div>
    </div>
  )
}