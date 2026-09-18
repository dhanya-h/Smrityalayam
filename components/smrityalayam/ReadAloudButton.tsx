'use client'

import { useSpeech } from './useSpeech'
import { useLang } from './useT'

interface ReadAloudButtonProps {
  textToRead: string
  label?: string
  className?: string
}

export default function ReadAloudButton({
  textToRead,
  label,
  className = '',
}: ReadAloudButtonProps) {
  const lang = useLang()
  const { speak, stop, speaking } = useSpeech(lang)

  const getButtonLabel = () => {
    if (label) return label
    if (lang === 'hi') return speaking ? 'आवाज रोकें' : 'बोलकर सुनें'
    if (lang === 'as') return speaking ? 'শব্দ বন্ধ কৰক' : 'পঢ়ি শুনাওক'
    if (lang === 'bn') return speaking ? 'ভয়েস বন্ধ করুন' : 'পড়ে শোনান'
    return speaking ? 'Stop Voice' : 'Read Aloud'
  }

  return (
    <button
      type="button"
      onClick={() => (speaking ? stop() : speak(textToRead))}
      className={`px-4 py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
        speaking
          ? 'bg-maroon text-white hover:bg-maroon-deep'
          : 'bg-warm-peach text-maroon hover:bg-maroon hover:text-white'
      } ${className}`}
      aria-label={getButtonLabel()}
    >
      <span className="text-sm">{speaking ? '⏹' : '🔊'}</span>
      <span>{getButtonLabel()}</span>
    </button>
  )
}