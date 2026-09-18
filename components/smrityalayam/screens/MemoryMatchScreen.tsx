'use client'

import { useState, useEffect } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useLang } from '../useT'
import { useApp } from '../AppContext'

interface Tile {
  id: number
  symbol: string
  name: string
  region: string
  isFlipped: boolean
  isMatched: boolean
}

const CULTURAL_ARTIFACTS = [
  { symbol: '👒', name: 'Jaapi (Bamboo Hat)', region: 'Assam' },
  { symbol: '🪘', name: 'Pung & Pena Drum', region: 'Manipur' },
  { symbol: '🪕', name: 'Duitara String Instrument', region: 'Meghalaya' },
  { symbol: '🌾', name: 'Paddy & Bamboo Weave', region: 'Mizoram' },
]

export default function NERMemoryMatchGame() {
  const { navigate } = useApp()
  const lang = useLang()

  const [tiles, setTiles] = useState<Tile[]>([])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)

  const initGame = () => {
    // Duplicate artifacts to form matching pairs
    const deck = [...CULTURAL_ARTIFACTS, ...CULTURAL_ARTIFACTS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        symbol: item.symbol,
        name: item.name,
        region: item.region,
        isFlipped: false,
        isMatched: false,
      }))

    setTiles(deck)
    setSelectedIndices([])
    setMoves(0)
    setIsWon(false)
  }

  useEffect(() => {
    initGame()
  }, [])

  const handleTileClick = (index: number) => {
    if (tiles[index].isFlipped || tiles[index].isMatched || selectedIndices.length === 2) {
      return
    }

    const updated = [...tiles]
    updated[index].isFlipped = true
    setTiles(updated)

    const newSelected = [...selectedIndices, index]
    setSelectedIndices(newSelected)

    if (newSelected.length === 2) {
      setMoves((m) => m + 1)
      const [firstIdx, secondIdx] = newSelected

      if (updated[firstIdx].symbol === updated[secondIdx].symbol) {
        // Match found
        updated[firstIdx].isMatched = true
        updated[secondIdx].isMatched = true
        setTiles(updated)
        setSelectedIndices([])

        // Check if all matched
        if (updated.every((t) => t.isMatched)) {
          setIsWon(true)
        }
      } else {
        // No match - reset flip after delay
        setTimeout(() => {
          updated[firstIdx].isFlipped = false
          updated[secondIdx].isFlipped = false
          setTiles(updated)
          setSelectedIndices([])
        }, 1000)
      }
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
          <ReadAloudButton textToRead="Northeast Heritage Memory Match. Flip cards to match traditional symbols like Jaapi, Pung drum, and Duitara." />
        </div>

        {/* Main Board */}
        <div className="bg-cream border-2 border-warm-tan rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-warm-tan pb-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-maroon">
                🧩 {lang === 'hi' ? 'पूर्वांचल विरासत मैच' : 'Northeast Heritage Match'}
              </h1>
              <p className="text-warm-gray text-xs mt-1">
                {lang === 'hi'
                  ? 'पूर्वांचल के सांस्कृतिक प्रतीकों और वाद्ययंत्रों के जोड़े मिलाएं।'
                  : 'Flip cards to match cultural symbols and traditional music instruments.'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-warm-gray font-bold block">Moves</span>
              <span className="text-2xl font-bold text-saffron">{moves}</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiles.map((tile, index) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(index)}
                className={`h-32 rounded-2xl border-2 font-bold text-center flex flex-col items-center justify-center transition-all cursor-pointer select-none ${
                  tile.isFlipped || tile.isMatched
                    ? 'bg-parchment border-saffron text-maroon shadow-sm'
                    : 'bg-warm-peach border-warm-tan text-warm-black hover:border-maroon'
                }`}
              >
                {tile.isFlipped || tile.isMatched ? (
                  <>
                    <span className="text-4xl mb-1">{tile.symbol}</span>
                    <span className="text-[10px] font-bold text-warm-black px-1 leading-tight">
                      {tile.name}
                    </span>
                    <span className="text-[9px] text-saffron font-semibold">
                      {tile.region}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl text-warm-tan">🪷</span>
                )}
              </button>
            ))}
          </div>

          {/* Win Screen Overlay */}
          {isWon && (
            <div className="p-6 bg-parchment border-2 border-saffron rounded-2xl text-center space-y-3">
              <span className="text-5xl block">🏆</span>
              <h2 className="font-display text-2xl font-bold text-maroon">
                {lang === 'hi' ? 'बधाई हो! आपने सभी जोड़े मिला लिए!' : 'Wonderful Job! All Cultural Pairs Matched!'}
              </h2>
              <p className="text-xs text-warm-gray">
                Completed in <span className="font-bold text-saffron">{moves} moves</span>.
              </p>
              <button
                onClick={initGame}
                className="px-6 py-3 bg-maroon text-white font-bold text-xs rounded-full hover:bg-maroon-deep cursor-pointer"
              >
                ↻ {lang === 'hi' ? 'पुनः खेलें' : 'Play Again'}
              </button>
            </div>
          )}
        </div>
      </div>
    </ElderLayout>
  )
}