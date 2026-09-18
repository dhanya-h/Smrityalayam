'use client'

import { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useApp } from '../AppContext'
import { useLang } from '../useT'

interface StoryStep {
  id: number
  text: string
  era: string
  icon: string
}

const DEFAULT_STEPS: StoryStep[] = [
  { id: 1, text: 'Childhood home in Dibrugarh tea garden', era: '1965', icon: '🏡' },
  { id: 2, text: 'College graduation and first job in Guwahati', era: '1978', icon: '🎓' },
  { id: 3, text: 'Wedding ceremony with traditional Mekhela Chador', era: '1984', icon: '💍' },
  { id: 4, text: 'Family trip to Shillong cherry blossoms', era: '1995', icon: '🌸' },
]

export default function StorySequenceGame() {
  const { navigate } = useApp()
  const lang = useLang()

  // Shuffle initial order for game challenge
  const [sequence, setSequence] = useState<StoryStep[]>([
    DEFAULT_STEPS[2],
    DEFAULT_STEPS[0],
    DEFAULT_STEPS[3],
    DEFAULT_STEPS[1],
  ])

  const [isCompleted, setIsCompleted] = useState(false)
  const [feedback, setFeedback] = useState('')

  const moveUp = (index: number) => {
    if (index === 0) return
    const updated = [...sequence]
    const temp = updated[index]
    updated[index] = updated[index - 1]
    updated[index - 1] = temp
    setSequence(updated)
  }

  const checkOrder = () => {
    const isCorrect = sequence.every((step, idx) => step.id === idx + 1)
    if (isCorrect) {
      setIsCompleted(true)
      setFeedback(lang === 'hi' ? 'शाबाश! आपने सही क्रम चुना।' : 'Perfect! Your family story is in order.')
    } else {
      setFeedback(lang === 'hi' ? 'दोबारा सोचें, कुछ कदम गलत क्रम में हैं।' : 'Some memories are out of order. Try again!')
    }
  }

  return (
    <ElderLayout active="activities">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('activities')}
            className="px-4 py-2 bg-warm-peach text-maroon border border-warm-tan font-bold rounded-full text-xs"
          >
            ← {lang === 'hi' ? 'वापस' : 'Back'}
          </button>
          <ReadAloudButton textToRead="Put My Story Together. Arrange your life memories in chronological order." />
        </div>

        <div className="bg-cream border-2 border-warm-tan rounded-3xl p-6 shadow-sm space-y-4">
          <h1 className="font-display text-2xl font-bold text-maroon">
            🧩 {lang === 'hi' ? 'मेरी कहानी का क्रम' : 'Put My Story Together'}
          </h1>
          <p className="text-warm-gray text-xs">
            {lang === 'hi'
              ? 'नीचे दी गई यादों को उनके सही समय के अनुसार क्रमबद्ध करें।'
              : 'Arrange these family milestones from earliest to most recent.'}
          </p>

          <div className="space-y-3 pt-2">
            {sequence.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 bg-parchment border-2 border-warm-tan rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold bg-warm-peach text-maroon px-2 py-0.5 rounded-full">
                      {item.era}
                    </span>
                    <p className="font-bold text-sm text-warm-black mt-1">
                      {item.text}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {idx > 0 && (
                    <button
                      onClick={() => moveUp(idx)}
                      className="px-3 py-1 bg-saffron text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      ▲ Move Up
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {feedback && (
            <p className={`text-sm font-bold text-center ${isCompleted ? 'text-green-800' : 'text-maroon'}`}>
              {feedback}
            </p>
          )}

          {!isCompleted ? (
            <button
              onClick={checkOrder}
              className="w-full py-3 bg-maroon text-white font-bold rounded-full hover:bg-maroon-deep transition-colors cursor-pointer mt-4"
            >
              ✓ {lang === 'hi' ? 'जांचें' : 'Check Story Sequence'}
            </button>
          ) : (
            <button
              onClick={() => navigate('activities')}
              className="w-full py-3 bg-saffron text-white font-bold rounded-full hover:bg-saffron-dk transition-colors cursor-pointer mt-4"
            >
              🏅 {lang === 'hi' ? 'आगे बढ़ें' : 'Next Activity'}
            </button>
          )}
        </div>
      </div>
    </ElderLayout>
  )
}