'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { SupportedLanguage } from './i18n'

export interface MediaAsset {
  id: string
  url: string
  caption: string
}

export interface MemoryCapsule {
  id: string
  title: string
  era: string
  location: string
  culturalTags: string[]
  photos: MediaAsset[]
  storyFragments: string[]
  caregiverVerified: boolean
}

export interface AppSettings {
  language: SupportedLanguage
  enableCommunityChat: boolean
  shareComparativeScores: boolean
}

export interface AppContextType {
  screen: string
  userType: 'elder' | 'caregiver'
  elderName: string
  userInterests: string[]
  userMood: string | null
  memories: MemoryCapsule[]
  settings: AppSettings
  navigate: (screenName: string) => void
  setUserProfile: (
    type: 'elder' | 'caregiver',
    name: string,
    interests: string[],
    mood: string | null
  ) => void
  addMemory: (memory: MemoryCapsule) => void
  toggleSetting: (key: keyof AppSettings) => void
  recordPendingSync: (actionName: string) => void
}

const DEFAULT_MEMORIES: MemoryCapsule[] = [
  {
    id: 'm1',
    title: 'Bihu Celebration at Dibrugarh',
    era: '1986',
    location: 'Dibrugarh, Assam',
    culturalTags: ['Assam: Bihu Celebration'],
    photos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        caption: 'Bihu Festival at ancestral home',
      },
    ],
    storyFragments: [
      'Bihu festival at ancestral home in Dibrugarh.',
      'Grandma cooked fresh Pitha and served hot tea.',
    ],
    caregiverVerified: true,
  },
]

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<string>('welcome')
  const [userType, setUserType] = useState<'elder' | 'caregiver'>('elder')
  const [elderName, setElderName] = useState<string>('Lata ji')
  const [userInterests, setUserInterests] = useState<string[]>(['music', 'festivals'])
  const [userMood, setUserMood] = useState<string | null>('happy')
  const [memories, setMemories] = useState<MemoryCapsule[]>(DEFAULT_MEMORIES)

  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    enableCommunityChat: true,
    shareComparativeScores: true,
  })

  // Navigation handler
  const navigate = (screenName: string) => {
    setScreen(screenName)
  }

  // Set elder profile from onboarding/welcome screen
  const setUserProfile = (
    type: 'elder' | 'caregiver',
    name: string,
    interests: string[],
    mood: string | null
  ) => {
    setUserType(type)
    if (name) setElderName(name)
    if (interests) setUserInterests(interests)
    if (mood) setUserMood(mood)
  }

  // Memory capsule store operations
  const addMemory = (newMemory: MemoryCapsule) => {
    setMemories((prev) => [newMemory, ...prev])
  }

  // Toggle user preference setting
  const toggleSetting = (key: keyof AppSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }))
  }

  // Safe offline sync logger for local PWA sync queue
  const recordPendingSync = (actionName: string) => {
    try {
      if (typeof window !== 'undefined') {
        const syncQueue = JSON.parse(
          localStorage.getItem('smrityalayam_pending_sync') || '[]'
        )
        syncQueue.push({ action: actionName, timestamp: new Date().toISOString() })
        localStorage.setItem('smrityalayam_pending_sync', JSON.stringify(syncQueue))
      }
    } catch (e) {
      console.warn('[Offline Sync Warning]: Could not record action to localStorage', e)
    }
  }

  return (
    <AppContext.Provider
      value={{
        screen,
        userType,
        elderName,
        userInterests,
        userMood,
        memories,
        settings,
        navigate,
        setUserProfile,
        addMemory,
        toggleSetting,
        recordPendingSync,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}