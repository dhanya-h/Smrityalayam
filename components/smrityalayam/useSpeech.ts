'use client'

import { useCallback, useState } from 'react'

const LANGUAGE_MAP: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  as: 'as-IN',
  bn: 'bn-IN',
  mni: 'mni-IN',
  kha: 'en-IN',
  mizo: 'en-IN',
}

export function useSpeech(langCode: string = 'en') {
  const [speaking, setSpeaking] = useState(false)

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return
      }

      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      const targetLang = LANGUAGE_MAP[langCode] || 'hi-IN'
      
      utterance.lang = targetLang
      utterance.rate = 0.85 // Slower pace for elder comprehension
      utterance.pitch = 1.0

      // Match installed voices for Hindi or Indian regional accents
      const voices = window.speechSynthesis.getVoices()
      const matchedVoice =
        voices.find((v) => v.lang.startsWith(targetLang.split('-')[0])) ||
        voices.find((v) => v.lang.includes('hi-IN') || v.lang.includes('en-IN'))

      if (matchedVoice) {
        utterance.voice = matchedVoice
      }

      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)

      window.speechSynthesis.speak(utterance)
    },
    [langCode]
  )

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }, [])

  return { speak, stop, speaking }
}