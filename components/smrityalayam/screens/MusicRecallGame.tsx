'use client'

import { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useLang } from '../useT'
import { useApp } from '../AppContext'

interface SongOption {
  id: string
  title: string
  region: string
  instrument: string
  isCorrect: boolean
}

export default function MusicRecallGame() {
  const { navigate } = useApp()
  const lang = useLang()

  const [selectedSong, setSelectedSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')

  const songs: SongOption[] = [
    {
      id: '1',
      title: 'Bihu Dhol, Pepa & Gagana Melody',
      region: 'Assam',
      instrument: 'Buffalo Horn & Bamboo',
      isCorrect: true,
    },
    {
      id: '2',
      title: 'Khulang Eshei Folk Tune',
      region: 'Manipur',
      instrument: 'Pena String Instrument',
      isCorrect: false,
    },
    {
      id: '3',
      title: 'Shillong Duitara Folk Acoustic',
      region: 'Meghalaya',
      instrument: 'Khasi Traditional Duitara',
      isCorrect: false,
    },
  ]

  const handlePlayAudio = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(isPlaying === id ? null : id)
  }

  const handleSelectSong = (song: SongOption) => {
    setSelectedSong(song.id)
    if (song.isCorrect) {
      setFeedback('Correct! This Bihu melody played during your spring celebration in Dibrugarh.')
    } else {
      setFeedback('Try another melody that matches your Assam tea garden family memory.')
    }
  }

  return (
    <ElderLayout active="activities">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('activities')}
            className="px-4 py-2 bg-[#F7F0DE] text-[#7A2E2E] border border-[#EFE4C8] font-bold rounded-full text-xs hover:bg-[#7A2E2E] hover:text-white transition-colors cursor-pointer"
          >
            ← {lang === 'hi' ? 'वापस' : 'Back'}
          </button>
          <ReadAloudButton textToRead="Match Music to Memory. Listen to traditional folk tunes and choose the melody associated with this family photograph." />
        </div>

        {/* Content Card */}
        <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-5">
          <div className="border-b border-[#EFE4C8] pb-3">
            <span className="px-3 py-1 bg-[#C98A2C] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Acoustic Memory Stimulation
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#7A2E2E] mt-2">
              🎵 {lang === 'hi' ? 'संगीत और यादें' : 'Match Music to Memory'}
            </h1>
          </div>

          {/* Associated Memory Badge */}
          <div className="p-4 bg-[#F7F0DE] rounded-2xl border border-[#EFE4C8] flex items-center gap-4">
            <span className="text-5xl">🌺</span>
            <div className="text-left">
              <h3 className="font-bold text-base text-[#2B2118]">
                Bihu Celebration at Dibrugarh Ancestral Home
              </h3>
              <p className="text-xs text-[#5B4E3F]">
                Family Memory Capsule • Spring 1986
              </p>
            </div>
          </div>

          <p className="text-xs font-bold text-[#2B2118]">
            Which traditional regional melody belongs to this family memory?
          </p>

          {/* Songs List */}
          <div className="space-y-3">
            {songs.map((song) => (
              <div
                key={song.id}
                onClick={() => handleSelectSong(song)}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  selectedSong === song.id
                    ? 'bg-[#C98A2C] text-white border-[#C98A2C]'
                    : 'bg-[#F7F0DE] border-[#EFE4C8] text-[#2B2118] hover:bg-[#EFE4C8]'
                }`}
              >
                <div>
                  <span className="font-bold text-sm block">{song.title}</span>
                  <span className="text-[10px] opacity-80 block mt-0.5">
                    {song.region} • {song.instrument}
                  </span>
                </div>

                <button
                  onClick={(e) => handlePlayAudio(song.id, e)}
                  className={`p-2.5 rounded-full font-bold text-xs transition-colors ${
                    isPlaying === song.id
                      ? 'bg-[#7A2E2E] text-white animate-pulse'
                      : 'bg-[#FFFCF4] text-[#7A2E2E] border border-[#EFE4C8]'
                  }`}
                >
                  {isPlaying === song.id ? '🔊 Playing' : '▶️ Play Audio'}
                </button>
              </div>
            ))}
          </div>

          {feedback && (
            <div className="p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-xl text-center text-xs font-bold text-[#7A2E2E]">
              {feedback}
            </div>
          )}
        </div>
      </div>
    </ElderLayout>
  )
}