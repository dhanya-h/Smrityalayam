'use client'

import React, { useState } from 'react'
import { useApp } from './AppContext'

export default function MemoryPortal() {
  const { memories, addMemory } = useApp()

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [era, setEra] = useState('')
  const [culturalTag, setCulturalTag] = useState('Assam: Bihu Celebration')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  // Handle local image file upload & convert to base64 preview URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitMemory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !selectedImage) return

    const newCapsule = {
      id: Date.now().toString(),
      title,
      era: era || '1988',
      location: location || 'Guwahati, Assam',
      culturalTags: [culturalTag],
      photos: [
        {
          id: `p-${Date.now()}`,
          url: selectedImage,
          caption: title,
        },
      ],
      storyFragments: [
        `${title} at ${location || 'ancestral home'}.`,
        'Family gathered together for the regional celebration.',
      ],
      caregiverVerified: true,
    }

    addMemory(newCapsule as any)

    // Reset form states
    setTitle('')
    setLocation('')
    setEra('')
    setSelectedImage(null)
    setIsSuccess(true)

    setTimeout(() => setIsSuccess(false), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Upload Form Section */}
      <div className="bg-[#F7F0DE] border-2 border-[#EFE4C8] rounded-2xl p-5 space-y-4">
        <div className="border-b border-[#EFE4C8] pb-3 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#7A2E2E]">
              ➕ Add New Family Memory Capsule (Demo Upload)
            </h2>
            <p className="text-xs text-[#5B4E3F]">
              Upload family photographs to automatically generate personalized games for the elder.
            </p>
          </div>
          <span className="px-3 py-1 bg-[#C98A2C] text-white font-bold text-[10px] rounded-full uppercase">
            Live Interactive Demo
          </span>
        </div>

        <form onSubmit={handleSubmitMemory} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5B4E3F] mb-1">
                Memory Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Sister's Wedding in Shillong"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-[#FFFCF4] border border-[#EFE4C8] rounded-xl text-xs font-bold text-[#2B2118]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5B4E3F] mb-1">
                Regional Cultural Context
              </label>
              <select
                value={culturalTag}
                onChange={(e) => setCulturalTag(e.target.value)}
                className="w-full p-2.5 bg-[#FFFCF4] border border-[#EFE4C8] rounded-xl text-xs font-bold text-[#2B2118]"
              >
                <option value="Assam: Bihu Celebration">Assam: Bihu & Pitha Making</option>
                <option value="Manipur: Ningol Chakouba">Manipur: Ningol Chakouba Feast</option>
                <option value="Meghalaya: Wangala Drums">Meghalaya: Wangala Festival</option>
                <option value="Mizoram: Chapchar Kut">Mizoram: Chapchar Kut Dance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5B4E3F] mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., Dibrugarh, Assam"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-[#FFFCF4] border border-[#EFE4C8] rounded-xl text-xs font-bold text-[#2B2118]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5B4E3F] mb-1">
                Year / Era
              </label>
              <input
                type="text"
                placeholder="e.g., 1986"
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full p-2.5 bg-[#FFFCF4] border border-[#EFE4C8] rounded-xl text-xs font-bold text-[#2B2118]"
              />
            </div>
          </div>

          {/* Image File Selector & Live Preview */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#5B4E3F]">
              Select Family Photograph *
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageUpload}
              className="text-xs text-[#5B4E3F] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#7A2E2E] file:text-white hover:file:bg-[#5C2020] cursor-pointer"
            />

            {selectedImage && (
              <div className="mt-2 w-full h-40 bg-[#FFFCF4] border border-[#EFE4C8] rounded-xl overflow-hidden flex items-center justify-center relative">
                <img
                  src={selectedImage}
                  alt="Upload Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#7A2E2E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Image Ready
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!title || !selectedImage}
            className={`w-full py-3 rounded-full font-bold text-xs text-white transition-all cursor-pointer shadow-md ${
              title && selectedImage
                ? 'bg-[#7A2E2E] hover:bg-[#5C2020]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            ✓ Submit & Preview Memory Capsule
          </button>

          {isSuccess && (
            <div className="p-3 bg-green-100 border border-green-300 rounded-xl text-center text-green-900 font-bold text-xs">
              🎉 Memory Capsule successfully uploaded & injected into Elder Games!
            </div>
          )}
        </form>
      </div>

      {/* Existing Memory Capsules List */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold text-[#7A2E2E]">
          Active Family Memory Bank ({memories?.length || 0})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memories && memories.length > 0 ? (
            memories.map((mem) => (
              <div
                key={mem.id}
                className="p-4 bg-[#F7F0DE] rounded-2xl border border-[#EFE4C8] flex gap-3 items-center shadow-xs"
              >
                <div className="w-16 h-16 bg-[#FFFCF4] rounded-xl border border-[#EFE4C8] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {mem.photos?.[0]?.url ? (
                    <img
                      src={mem.photos[0].url}
                      alt={mem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl">🖼️</span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2B2118]">{mem.title}</h4>
                  <p className="text-[10px] font-bold text-[#C98A2C]">{mem.era} • {mem.location}</p>
                  <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
                    ✓ Caregiver Verified
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#5B4E3F] italic">No memory capsules uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}