'use client'

import { useState, useEffect } from 'react'
import ElderLayout from '../ElderLayout'
import { useSpeech } from '../useSpeech'
import { useT } from '../useT'

interface PatternQuestion {
  id: number
  sequence: string[]
  options: string[]
  correct: string
  prompt: string
}

const PATTERNS: PatternQuestion[] = [
  {
    id: 1,
    sequence: ['🪔', '🌸', '🪔', '🌸', '?'],
    options: ['🪔', '🌸', '🦚', '🐘'],
    correct: '🪔',
    prompt: 'Complete the traditional pattern: Diya, Flower, Diya, Flower...'
  },
  {
    id: 2,
    sequence: ['🔴', '🟡', '🔴', '🟡', '?'],
    options: ['🟢', '🔴', '🟡', '🔵'],
    correct: '🔴',
    prompt: 'Complete the color pattern.'
  },
  {
    id: 3,
    sequence: ['☕', '🍵', '☕', '🍵', '?'],
    options: ['☕', '🍵', '🍶', '🥛'],
    correct: '☕',
    prompt: 'Complete the drink sequence.'
  }
]

export default function SortingGameScreen() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const { speak } = useSpeech('en-IN')
  const t = useT()

  const currentPattern = PATTERNS[currentIdx]

  useEffect(() => {
    if (currentPattern) {
      speak(currentPattern.prompt)
    }
  }, [currentIdx, speak])

  const handleOptionSelect = (option: string) => {
    setSelected(option)
    if (option === currentPattern.correct) {
      speak('Correct answer! Well done.')
      setScore((s) => s + 1)
    } else {
      speak('Not quite right. Let us try again.')
    }

    setTimeout(() => {
      setSelected(null)
      if (currentIdx + 1 < PATTERNS.length) {
        setCurrentIdx((i) => i + 1)
      } else {
        setIsCompleted(true)
        speak('Pattern recognition completed! Wonderful job.')
      }
    }, 1200)
  }

  return (
    <ElderLayout active="activities">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="bg-cream border-2 border-warm-tan rounded-2xl p-6 text-center space-y-4">
          <h2 className="font-display text-3xl font-bold text-maroon">🧩 Pattern & Sequence Match</h2>
          <p className="text-warm-gray text-base">Exercise spatial recognition and attention by completing the motif sequence.</p>

          {!isCompleted ? (
            <div className="space-y-8 pt-4">
              <div className="flex justify-center items-center gap-3 text-4xl bg-parchment p-6 rounded-2xl border border-warm-tan">
                {currentPattern.sequence.map((item, i) => (
                  <span key={i} className={`p-3 rounded-xl ${item === '?' ? 'bg-saffron text-white font-bold' : 'bg-cream'}`}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <p className="font-bold text-warm-black text-sm">Choose the missing symbol:</p>
                <div className="grid grid-cols-4 gap-4">
                  {currentPattern.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className={`text-3xl p-4 rounded-xl border-2 transition-all ${
                        selected === option
                          ? option === currentPattern.correct
                            ? 'bg-green-600 text-white border-green-700'
                            : 'bg-maroon text-white border-maroon-deep'
                          : 'bg-parchment border-warm-tan hover:bg-warm-peach'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 space-y-4">
              <span className="text-6xl block">🎉</span>
              <h3 className="font-display text-2xl font-bold text-maroon">Activity Completed!</h3>
              <p className="text-lg font-semibold text-warm-black">Score: {score} / {PATTERNS.length}</p>
              <button
                onClick={() => {
                  setCurrentIdx(0)
                  setScore(0)
                  setIsCompleted(false)
                }}
                className="px-6 py-3 bg-maroon text-white font-bold rounded-full hover:bg-maroon-deep"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </ElderLayout>
  )
}