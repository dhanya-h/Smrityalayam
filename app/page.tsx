'use client'

import { useApp } from '../components/smrityalayam/AppContext'
import WelcomeScreen from '../components/smrityalayam/screens/WelcomeScreen'
import ElderHome from '../components/smrityalayam/screens/ElderHome'
import ActivitiesScreen from '../components/smrityalayam/screens/ActivitiesScreen'
import MemoryMatchScreen from '../components/smrityalayam/screens/MemoryMatchScreen'
import SortingGameScreen from '../components/smrityalayam/screens/SortingGameScreen'
import FocusGameScreen from '../components/smrityalayam/screens/FocusGameScreen'
import NERCultureGameScreen from '../components/smrityalayam/screens/NERCultureGamesScreen'
import MemoryMatchGame from '../components/smrityalayam/screens/MemoryMatchGame'
import NERTabletopGamesScreen from '../components/smrityalayam/screens/NERTabletopGamesScreen'
import StorySequenceGame from '../components/smrityalayam/screens/StorySequenceGame'
import VoiceRecallGame from '../components/smrityalayam/screens/VoiceRecallGame'
import MusicRecallGame from '../components/smrityalayam/screens/MusicRecallGame'
import CulturalScreen from '../components/smrityalayam/screens/CulturalScreen'
import ProgressScreen from '../components/smrityalayam/screens/ProgressScreen'
import CaregiverScreen from '../components/smrityalayam/screens/CaregiverScreen'
import SettingsScreen from '../components/smrityalayam/screens/SettingsScreen'
import HowItWorksScreen from '../components/smrityalayam/screens/HowItWorksScreen'
import RemindersScreen from '../components/smrityalayam/screens/RemindersScreen'
import FitnessScreen from '../components/smrityalayam/screens/FitnessScreen'
import MemoryPortal from '../components/smrityalayam/MemoryPortal'
import MemoryStoryBuilder from '../components/smrityalayam/screens/MemoryStoryBuilder'
import CommunityHubScreen from '../components/smrityalayam/screens/CommunityHubScreen'
import type { Interest, DailyMood } from '../components/smrityalayam/i18n'

export default function Page() {
  const { screen, userType, navigate } = useApp()

  const handleOnboardingDone = (
    type: 'elder' | 'caregiver',
    name: string,
    interests: Interest[],
    mood: DailyMood | null
  ) => {
    window.dispatchEvent(
      new CustomEvent('smrityalayam:onboarding', {
        detail: { type, name, interests, mood },
      })
    )

    if (type === 'caregiver') {
      navigate('caregiver')
    } else {
      navigate('elder-home')
    }
  }

  // Active Screen Routing Logic
  if (screen === 'welcome') return <WelcomeScreen onDone={handleOnboardingDone} />
  if (screen === 'caregiver') return <CaregiverScreen />
  if (screen === 'elder-home') return <ElderHome />
  if (screen === 'activities') return <ActivitiesScreen />
  if (screen === 'memory-match') return <MemoryMatchScreen />
  if (screen === 'community' as any) return <CommunityHubScreen />
  if (screen === 'sorting-game') return <NERCultureGameScreen />
  if (screen === 'focus-game') return <FocusGameScreen />
  if (screen === 'tabletop-games' as any) return <NERTabletopGamesScreen />
  if (screen === 'story-sequence' as any) return <StorySequenceGame />
  if (screen === 'voice-recall' as any) return <VoiceRecallGame />
  if (screen === 'music-recall' as any) return <MusicRecallGame />
  if (screen === 'memory-story-builder' as any) return <MemoryStoryBuilder />
  if (screen === 'cultural') return <CulturalScreen />
  if (screen === 'progress') return <ProgressScreen />
  if (screen === 'reminders') return <RemindersScreen />
  if (screen === 'fitness') return <FitnessScreen />
  if (screen === 'memory-portal') return <MemoryPortal />
  if (screen === 'settings') return <SettingsScreen />
  if (screen === 'how-it-works') return <HowItWorksScreen />

  return userType === 'caregiver' ? <CaregiverScreen /> : <ElderHome />
}