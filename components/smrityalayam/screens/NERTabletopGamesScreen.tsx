'use client'

import { useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useLang } from '../useT'
import { useApp } from '../AppContext'

interface TabletopGameOption {
  id: string
  name: string
  region: string
  icon: string
  description: string
  cognitiveBenefit: string
}

export default function NERTabletopGamesScreen() {
  const { navigate } = useApp()
  const lang = useLang()

  const [selectedGame, setSelectedGame] = useState<'sholo' | 'jhandi' | 'solaimani'>('sholo')
  
  // State for Jhandi Munda Prediction Exercise
  const [predictedSymbol, setPredictedSymbol] = useState<string | null>(null)
  const [diceResults, setDiceResults] = useState<string[]>([])
  const [score, setScore] = useState(0)

  const JHANDI_SYMBOLS = [
    { name: 'Flag (Jhandi)', icon: '🚩' },
    { name: 'Crown (Burja)', icon: '👑' },
    { name: 'Spade', icon: '♠️' },
    { name: 'Heart', icon: '♥️' },
    { name: 'Club', icon: '♣️' },
    { name: 'Diamond', icon: '♦️' },
  ]

  const gamesList: TabletopGameOption[] = [
    {
      id: 'sholo',
      name: 'Sholo Gutti (16 Beads)',
      region: 'Assam & Rural Northeast',
      icon: '⚪',
      description: 'A classic bead-capture strategy game played on a gridded board. Players jump over opposing pieces to capture them.',
      cognitiveBenefit: 'Spatial Planning & Strategic Foresight',
    },
    {
      id: 'jhandi',
      name: 'Jhandi Munda (Langur Burja)',
      region: 'Arunachal Pradesh, Assam & Sikkim',
      icon: '🎲',
      description: 'A traditional symbol-prediction game played with six specialized dice featuring flags, crowns, and card suits.',
      cognitiveBenefit: 'Visual Pattern Recognition & Symbol Recall',
    },
    {
      id: 'solaimani',
      name: 'Solaimani',
      region: 'Tripura',
      icon: '🧩',
      description: 'A traditional tactical board game from Tripura reflecting local strategic pastimes and piece positioning.',
      cognitiveBenefit: 'Focus & Tactile Reasoning',
    },
  ]

  const handleRollJhandi = () => {
    if (!predictedSymbol) return
    const rolled = Array.from({ length: 6 }, () => {
      const idx = Math.floor(Math.random() * JHANDI_SYMBOLS.length)
      return JHANDI_SYMBOLS[idx].icon
    })

    setDiceResults(rolled)
    const matches = rolled.filter((s) => s === predictedSymbol).length
    if (matches > 0) {
      setScore((prev) => prev + matches * 10)
    }
  }

  return (
    <ElderLayout active="activities">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('activities')}
            className="px-4 py-2 bg-warm-peach text-maroon border border-warm-tan font-bold rounded-full text-xs hover:bg-maroon hover:text-white transition-colors cursor-pointer"
          >
            ← {lang === 'hi' ? 'वापस' : 'Back'}
          </button>
          <ReadAloudButton textToRead="Northeast Traditional Tabletop Games. Enjoy classic pastimes like Sholo Gutti, Jhandi Munda, and Solaimani." />
        </div>

        {/* Main Content Card */}
        <div className="bg-cream border-2 border-warm-tan rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-warm-tan pb-4">
            <span className="px-3 py-1 bg-saffron text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
              Traditional Regional Pastimes
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-maroon mt-2">
              🎲 Traditional Tabletop & Strategy Games
            </h1>
            <p className="text-warm-gray text-xs mt-1">
              Engage with authentic games played across Arunachal Pradesh, Assam, Sikkim, and Tripura.
            </p>
          </div>

          {/* Game Selector Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {gamesList.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGame(g.id as any)}
                className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedGame === g.id
                    ? 'bg-saffron text-white border-saffron shadow-sm'
                    : 'bg-parchment border-warm-tan text-warm-black hover:bg-warm-peach'
                }`}
              >
                <span className="text-2xl block mb-1">{g.icon}</span>
                <span className="font-bold text-xs block leading-tight">{g.name}</span>
                <span className="text-[9px] opacity-80 block mt-0.5">{g.region}</span>
              </button>
            ))}
          </div>

          {/* GAME 1: SHOLO GUTTI VIEW */}
          {selectedGame === 'sholo' && (
            <div className="bg-parchment border border-warm-tan rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-maroon">Sholo Gutti (16 Beads)</h3>
                  <p className="text-xs text-warm-gray mt-0.5">Assam & Rural Eastern India</p>
                </div>
                <span className="text-xs font-bold text-saffron bg-warm-peach px-2.5 py-1 rounded-full border border-warm-tan">
                  Spatial Strategy
                </span>
              </div>
              <p className="text-xs text-warm-black leading-relaxed">
                A famous bead-capture strategy game played on a gridded board. Players maneuver 16 beads, jumping over opponent pieces to clear the board.
              </p>

              {/* Interactive Board Preview Canvas */}
              <div className="h-44 bg-cream border-2 border-dashed border-warm-tan rounded-xl flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <div className="flex justify-center gap-4 text-3xl">
                    <span>⚪</span><span>⚪</span><span>⚪</span><span>⚪</span>
                  </div>
                  <div className="text-xs font-bold text-maroon">
                    [ Gridded Strategy Board Simulator ]
                  </div>
                  <div className="flex justify-center gap-4 text-3xl">
                    <span>🔴</span><span>🔴</span><span>🔴</span><span>🔴</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GAME 2: JHANDI MUNDA VIEW */}
          {selectedGame === 'jhandi' && (
            <div className="bg-parchment border border-warm-tan rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-maroon">Jhandi Munda (Langur Burja)</h3>
                  <p className="text-xs text-warm-gray mt-0.5">Arunachal Pradesh, Assam & Sikkim</p>
                </div>
                <span className="text-xs font-bold text-saffron bg-warm-peach px-2.5 py-1 rounded-full border border-warm-tan">
                  Score: {score} pts
                </span>
              </div>
              <p className="text-xs text-warm-black leading-relaxed">
                Select a traditional symbol and roll the six dice. Predict which symbols appear most frequently!
              </p>

              {/* Symbol Selector */}
              <div className="grid grid-cols-6 gap-2 pt-2">
                {JHANDI_SYMBOLS.map((s) => (
                  <button
                    key={s.icon}
                    onClick={() => setPredictedSymbol(s.icon)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      predictedSymbol === s.icon
                        ? 'bg-maroon text-white border-maroon'
                        : 'bg-cream border-warm-tan hover:bg-warm-peach'
                    }`}
                  >
                    <span className="text-2xl block">{s.icon}</span>
                  </button>
                ))}
              </div>

              {/* Dice Result Display */}
              {diceResults.length > 0 && (
                <div className="p-3 bg-cream border border-warm-tan rounded-xl text-center space-y-1">
                  <span className="text-[10px] font-bold text-warm-gray block uppercase">
                    6 Dice Rolled:
                  </span>
                  <div className="flex justify-center gap-3 text-3xl">
                    {diceResults.map((r, idx) => (
                      <span key={idx}>{r}</span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleRollJhandi}
                disabled={!predictedSymbol}
                className={`w-full py-3 rounded-full font-bold text-xs text-white transition-all ${
                  predictedSymbol
                    ? 'bg-maroon hover:bg-maroon-deep cursor-pointer shadow-sm'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                🎲 Roll 6 Jhandi Munda Dice
              </button>
            </div>
          )}

          {/* GAME 3: SOLAIMANI VIEW */}
          {selectedGame === 'solaimani' && (
            <div className="bg-parchment border border-warm-tan rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-maroon">Solaimani Tactical Board</h3>
                  <p className="text-xs text-warm-gray mt-0.5">Tripura Traditional Heritage</p>
                </div>
                <span className="text-xs font-bold text-saffron bg-warm-peach px-2.5 py-1 rounded-full border border-warm-tan">
                  Tactile Focus
                </span>
              </div>
              <p className="text-xs text-warm-black leading-relaxed">
                A traditional board game originating from Tripura that focuses on strategic positioning and tactical piece movement.
              </p>
            </div>
          )}
        </div>
      </div>
    </ElderLayout>
  )
}