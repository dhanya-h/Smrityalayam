'use client'

import React, { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useApp } from '../AppContext'

interface ChatMessage {
  id: string
  sender: string
  avatar: string
  text: string
  time: string
  isSelf?: boolean
}

interface LeaderboardUser {
  rank: number
  name: string
  location: string
  score: number
  avatar: string
  isSelf?: boolean
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', sender: 'Biren Da', avatar: '👨‍🦳', text: 'Namaskar! Today I solved the Sholo Gutti puzzle in 6 moves.', time: '10:15 AM' },
  { id: '2', sender: 'Anjali Baideo', avatar: '👵', text: 'Joy Aai Axom! The Bihu music recall memory brought back so many memories.', time: '10:30 AM' },
  { id: '3', sender: 'Rameshwar Ji', avatar: '👴', text: 'Good morning everyone. Keep exercising your minds daily!', time: '11:00 AM' },
]

export default function CommunityHubScreen() {
  const { settings, elderName, navigate } = useApp()
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [inputMessage, setInputMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'chat'>('leaderboard')

  const isComparativeOn = settings?.shareComparativeScores ?? true
  const isChatOn = settings?.enableCommunityChat ?? true

  // Dynamic Leaderboard using current elderName from AppContext
  const currentElder = elderName || 'Lata ji'
  const leaderboardData: LeaderboardUser[] = [
    { rank: 1, name: 'Anjali Baideo', location: 'Guwahati, Assam', score: 94, avatar: '👵' },
    { rank: 2, name: `${currentElder} (You)`, location: 'Dibrugarh, Assam', score: 88, avatar: '🪷', isSelf: true },
    { rank: 3, name: 'Biren Da', location: 'Shillong, Meghalaya', score: 82, avatar: '👨‍🦳' },
    { rank: 4, name: 'Rameshwar Ji', location: 'Imphal, Manipur', score: 79, avatar: '👴' },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !isChatOn) return

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: currentElder,
      avatar: '🪷',
      text: inputMessage,
      time: 'Just now',
      isSelf: true,
    }

    setMessages((prev) => [...prev, newMsg])
    setInputMessage('')
  }

  return (
    <ElderLayout active="community" as any>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#7A2E2E]">
              👥 Senior Community & Leaderboard
            </h1>
            <p className="text-xs text-[#5B4E3F] mt-1 font-medium">
              Connect with peers across Northeast India and view comparative cognitive scores.
            </p>
          </div>
          <ReadAloudButton textToRead="Senior Community and Leaderboard. Connect with peers and share scores." />
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-[#EFE4C8] gap-4">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`pb-3 font-bold text-sm cursor-pointer border-b-2 transition-all ${
              activeTab === 'leaderboard'
                ? 'border-[#7A2E2E] text-[#7A2E2E]'
                : 'border-transparent text-[#5B4E3F]'
            }`}
          >
            🏆 Comparative Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-3 font-bold text-sm cursor-pointer border-b-2 transition-all ${
              activeTab === 'chat'
                ? 'border-[#7A2E2E] text-[#7A2E2E]'
                : 'border-transparent text-[#5B4E3F]'
            }`}
          >
            💬 Peer Community Chat
          </button>
        </div>

        {/* TAB 1: COMPARATIVE LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            {!isComparativeOn ? (
              <div className="p-6 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl text-center space-y-3">
                <span className="text-4xl block">🔒</span>
                <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
                  Comparative Scores are Turned OFF
                </h2>
                <p className="text-xs text-[#5B4E3F] max-w-md mx-auto">
                  Your privacy settings currently prevent sharing your score on the public leaderboard. Turn on "Share Comparative Scores" in Settings to view rankings.
                </p>
                <button
                  onClick={() => navigate('settings')}
                  className="px-6 py-2.5 bg-[#7A2E2E] text-white font-bold text-xs rounded-full hover:bg-[#5C2020]"
                >
                  ⚙ Open Settings & Preferences
                </button>
              </div>
            ) : (
              <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EFE4C8] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
                    Northeast Senior Vitality Rankings
                  </h2>
                  <span className="px-3 py-1 bg-[#C98A2C] text-white font-bold text-[10px] rounded-full uppercase">
                    Weekly Cohort
                  </span>
                </div>

                <div className="space-y-3">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.rank}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        user.isSelf
                          ? 'bg-[#7A2E2E] text-white border-[#7A2E2E] shadow-sm'
                          : 'bg-[#F7F0DE] border-[#EFE4C8] text-[#2B2118]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            user.rank === 1
                              ? 'bg-yellow-400 text-black'
                              : user.isSelf
                              ? 'bg-white text-[#7A2E2E]'
                              : 'bg-[#EFE4C8] text-[#5B4E3F]'
                          }`}
                        >
                          #{user.rank}
                        </span>
                        <span className="text-3xl">{user.avatar}</span>
                        <div>
                          <h3 className="font-bold text-sm leading-tight">
                            {user.name}
                          </h3>
                          <span
                            className={`text-[10px] block ${
                              user.isSelf ? 'text-white/80' : 'text-[#5B4E3F]'
                            }`}
                          >
                            {user.location}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xl font-bold block">{user.score}%</span>
                        <span
                          className={`text-[9px] uppercase font-bold block ${
                            user.isSelf ? 'text-white/80' : 'text-[#C98A2C]'
                          }`}
                        >
                          Cognitive Score
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PEER CHAT */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {!isChatOn ? (
              <div className="p-6 bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl text-center space-y-3">
                <span className="text-4xl block">🚫</span>
                <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
                  Community Chat Disabled
                </h2>
                <p className="text-xs text-[#5B4E3F]">
                  Enable community chat in settings to interact with other seniors.
                </p>
                <button
                  onClick={() => navigate('settings')}
                  className="px-6 py-2.5 bg-[#7A2E2E] text-white font-bold text-xs rounded-full hover:bg-[#5C2020]"
                >
                  ⚙ Open Settings
                </button>
              </div>
            ) : (
              <div className="bg-[#FFFCF4] border-2 border-[#EFE4C8] rounded-3xl p-6 shadow-sm space-y-4">
                <div className="border-b border-[#EFE4C8] pb-3">
                  <h2 className="font-serif text-xl font-bold text-[#7A2E2E]">
                    💬 Northeast Senior Conversation Corner
                  </h2>
                  <p className="text-xs text-[#5B4E3F]">
                    Share daily thoughts, memories, and encouraging words.
                  </p>
                </div>

                {/* Message Log */}
                <div className="space-y-3 max-h-80 overflow-y-auto p-2 bg-[#F7F0DE] rounded-2xl border border-[#EFE4C8]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 items-start ${
                        msg.isSelf ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-2xl">{msg.avatar}</span>
                      <div
                        className={`p-3 rounded-2xl max-w-xs text-xs space-y-1 ${
                          msg.isSelf
                            ? 'bg-[#7A2E2E] text-white rounded-tr-none'
                            : 'bg-[#FFFCF4] border border-[#EFE4C8] text-[#2B2118] rounded-tl-none'
                        }`}
                      >
                        <div className="flex justify-between items-center gap-2 font-bold text-[10px] opacity-80">
                          <span>{msg.sender}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message to the community..."
                    className="flex-1 p-3 bg-[#F7F0DE] border border-[#EFE4C8] rounded-full text-xs font-bold text-[#2B2118] outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#7A2E2E] text-white font-bold text-xs rounded-full hover:bg-[#5C2020] transition-colors cursor-pointer"
                  >
                    Send ➔
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </ElderLayout>
  )
}