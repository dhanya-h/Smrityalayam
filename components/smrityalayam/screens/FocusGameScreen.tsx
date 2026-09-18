'use client'

import { useState, useEffect, useRef } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useT, useLang } from '../useT'
import { useApp } from '../AppContext'

interface TargetItem {
  id: number
  symbol: string
  isTarget: boolean
  x: number
  y: number
}

const TARGET_SYMBOLS = ['🪔', '🦚', '🌺']
const DISTRACTOR_SYMBOLS = ['☕', '🍃', '🌾', '🧵']

export default function FocusGameScreen() {
  const { navigate, updateSettings } = useApp()
  const t = useT()
  const lang = useLang()

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle')
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [items, setItems] = useState<TargetItem[]>([])

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const getPageTitle = () => {
    if (lang === 'hi') return 'एकाग्रता और ध्यान अभ्यास'
    if (lang === 'as') return 'মনোযোগ আৰু একাগ্ৰতা পৰীক্ষা'
    if (lang === 'bn') return 'একাগ্রতা ও দৃষ্টি চর্চা'
    return 'Focus & Visual Attention Test'
  }

  const getInstructions = () => {
    if (lang === 'hi') return 'केवल जलते हुए दीये 🪔 या मोर 🦚 पर टैप करें। अन्य सामानों को छोड़ दें।'
    if (lang === 'as') return 'কেৱল চাকি 🪔 বা মৈৰা 🦚 ত টিপক। বাকীবোৰ এৰি দিয়ক।'
    if (lang === 'bn') return 'শুধু প্রদীপ 🪔 বা ময়ূর 🦚 স্পর্শ করুন। বাকিগুলি এড়িয়ে চলুন।'
    return 'Tap ONLY on the Diya 🪔 or Peacock 🦚 targets. Ignore other distractor symbols.'
  }

  const generateRoundItems = () => {
    const newItems: TargetItem[] = []
    const totalCount = 6

    for (let i = 0; i < totalCount; i++) {
      const isTarget = Math.random() > 0.4
      const symbolList = isTarget ? TARGET_SYMBOLS : DISTRACTOR_SYMBOLS
      const symbol = symbolList[Math.floor(Math.random() * symbolList.length)]

      newItems.push({
        id: Date.now() + i + Math.random(),
        symbol,
        isTarget,
        x: Math.floor(Math.random() * 70) + 10,
        y: Math.floor(Math.random() * 60) + 10,
      })
    }
    setItems(newItems)
  }

  const startGame = () => {
    setScore(0)
    setMistakes(0)
    setTimeLeft(30)
    setGameState('playing')
    generateRoundItems()

    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          setGameState('completed')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleItemTap = (item: TargetItem) => {
    if (gameState !== 'playing') return

    if (item.isTarget) {
      setScore((s) => s + 10)
    } else {
      setMistakes((m) => m + 1)
    }

    // Refresh layout on tap
    generateRoundItems()
  }

  return (
    <ElderLayout active="activities">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('activities')}
            className="px-4 py-2 bg-warm-peach text-maroon border border-warm-tan font-bold rounded-full text-xs hover:bg-maroon hover:text-white transition-colors cursor-pointer"
          >
            ← {lang === 'hi' ? 'वापस' : 'Back'}
          </button>
          <ReadAloudButton textToRead={`${getPageTitle()}. ${getInstructions()}`} />
        </div>

        {/* Game Main Area */}
        <div className="bg-cream border-2 border-warm-tan rounded-3xl p-6 md:p-8 shadow-sm">
          {/* IDLE SCREEN */}
          {gameState === 'idle' && (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <div className="text-7xl mb-2">🎯</div>
              <h1 className="font-display text-3xl font-bold text-warm-black">
                {getPageTitle()}
              </h1>
              <p className="text-warm-gray text-base max-w-md leading-relaxed">
                {getInstructions()}
              </p>
              <button
                onClick={startGame}
                className="mt-4 px-8 py-4 bg-maroon text-white font-bold rounded-full hover:bg-maroon-deep transition-colors text-base shadow-md cursor-pointer"
              >
                {lang === 'hi' ? 'अभ्यास शुरू करें ➔' : 'Start Focus Session ➔'}
              </button>
            </div>
          )}

          {/* PLAYING SCREEN */}
          {gameState === 'playing' && (
            <div className="space-y-4">
              {/* Score & Time Tracker */}
              <div className="flex items-center justify-between border-b border-warm-tan pb-4">
                <div>
                  <span className="text-xs text-warm-gray font-bold block">
                    {lang === 'hi' ? 'समय शेष:' : 'Time Remaining:'}
                  </span>
                  <span className="text-2xl font-bold text-maroon">{timeLeft}s</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-warm-gray font-bold block">
                    {lang === 'hi' ? 'अंक:' : 'Score:'}
                  </span>
                  <span className="text-2xl font-bold text-saffron">{score} pts</span>
                </div>
              </div>

              {/* Interactive Target Canvas */}
              <div className="relative w-full h-80 bg-parchment border-2 border-dashed border-warm-tan rounded-2xl overflow-hidden shadow-inner">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemTap(item)}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    className="absolute text-5xl p-3 transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 active:scale-90 transition-transform cursor-pointer select-none"
                  >
                    {item.symbol}
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-warm-gray font-semibold">
                {lang === 'hi'
                  ? 'केवल सही लक्ष्य पर ही क्लिक करें!'
                  : 'CogniFit Attention Paradigm: Tap targets quickly!'}
              </p>
            </div>
          )}

          {/* COMPLETED SCREEN */}
          {gameState === 'completed' && (
            <div className="flex flex-col items-center text-center py-8 space-y-4">
              <div className="text-7xl mb-2">🏅</div>
              <h2 className="font-display text-3xl font-bold text-maroon">
                {lang === 'hi' ? 'सत्र पूरा हुआ!' : 'Focus Session Complete!'}
              </h2>
              <div className="bg-parchment p-4 rounded-2xl border border-warm-tan w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm font-bold text-warm-black">
                  <span>{lang === 'hi' ? 'अंतिम अंक:' : 'Final Score:'}</span>
                  <span className="text-saffron">{score}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-warm-black">
                  <span>{lang === 'hi' ? 'गलतियां:' : 'Distractor Taps:'}</span>
                  <span className="text-maroon">{mistakes}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-maroon text-white font-bold rounded-full hover:bg-maroon-deep transition-colors text-sm cursor-pointer"
                >
                  {lang === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}
                </button>
                <button
                  onClick={() => navigate('activities')}
                  className="px-6 py-3 bg-warm-peach text-maroon font-bold rounded-full hover:bg-maroon hover:text-white transition-colors text-sm cursor-pointer"
                >
                  {lang === 'hi' ? 'अन्य खेल' : 'Other Activities'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ElderLayout>
  )
}