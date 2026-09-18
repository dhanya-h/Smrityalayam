'use client'

import { useMemo, useState } from 'react'
import ElderLayout from '../ElderLayout'
import ReadAloudButton from '../ReadAloudButton'
import { useApp } from '../AppContext'
import { NER_FESTIVALS, NER_FOODS, NER_GAMES, NER_MEMORIES, NER_MUSIC, NER_STATES, type NERState } from '../nerCulture'

type Mode = 'festival' | 'food' | 'games' | 'music' | 'memories'

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

export default function NERCultureGamesScreen({ onBack }: { onBack?: () => void }) {
  const { recordPendingSync } = useApp()
  const [state, setState] = useState<NERState>('Assam')
  const [mode, setMode] = useState<Mode>('festival')
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [feedback, setFeedback] = useState('')
  const [memoryOrder, setMemoryOrder] = useState<string[]>([])

  const festivals = useMemo(() => NER_FESTIVALS.filter(x => x.state === state), [state])
  const foods = useMemo(() => NER_FOODS.filter(x => x.state === state), [state])
  const games = useMemo(() => NER_GAMES.filter(x => x.state === state), [state])
  const music = useMemo(() => NER_MUSIC.filter(x => x.state === state), [state])
  const memories = useMemo(() => NER_MEMORIES.filter(x => x.state === state), [state])

  const festival = festivals[round % Math.max(festivals.length, 1)]
  const foodRound = foods.slice(0, Math.min(4, foods.length))
  const gameRound = games.slice(0, Math.min(4, games.length))
  const musicTrack = music[round % Math.max(music.length, 1)]
  const memory = memories[round % Math.max(memories.length, 1)]

  const resetRound = () => {
    setSelected([])
    setFeedback('')
    setMemoryOrder([])
  }

  const chooseState = (s: NERState) => {
    setState(s)
    setRound(0)
    setScore(0)
    resetRound()
  }

  const complete = (points: number, message: string) => {
    setScore(s => s + points)
    setFeedback(message)
    recordPendingSync(`NER activity: ${mode} — ${state}`)
  }

  const nextRound = () => {
    setRound(r => r + 1)
    resetRound()
  }

  const toggleFood = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(x => x !== name))
      return
    }
    const next = [...selected, name]
    setSelected(next)
    if (next.length === foodRound.length) {
      const correct = foodRound.every(x => next.includes(x.name))
      complete(correct ? 1 : 0, correct ? 'Wonderful! You remembered the foods.' : 'Good try. Let’s look at them together.')
    }
  }

  const chooseGame = (name: string) => {
    setSelected([name])
    const item = games.find(x => x.name === name)
    if (item) {
      complete(1, `${item.name} is a traditional game associated with ${state}.`)
    }
  }

  const playMusic = () => {
    if (!musicTrack) return
    complete(1, `Listen and remember the ${musicTrack.tradition} rhythm.`)
  }

  const chooseMemoryItem = (item: string) => {
    if (memoryOrder.includes(item)) return
    const next = [...memoryOrder, item]
    setMemoryOrder(next)
    if (next.length === memory.items.length) {
      const correct = next.every((x, i) => x === memory.items[i])
      complete(correct ? 2 : 1, correct ? 'Excellent! You reconstructed the memory.' : 'Nice effort. The story can be remembered in a different order.')
    }
  }

  return (
    <ElderLayout active="cultural">
      <div className="p-5 md:p-8 max-w-4xl mx-auto screen-enter">
        <button onClick={onBack} className="text-saffron font-semibold text-sm mb-4">← Back to Culture</button>

        <div className="p-5 md:p-6 rounded-3xl bg-saffron-lt border-2 border-warm-tan mb-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-4xl mb-2">🌿</div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-warm-black">Northeast Memory Garden</h1>
              <p className="text-warm-gray mt-1 max-w-2xl">
                Familiar festivals, foods, games, music and memory stories from the eight states of Northeast India.
              </p>
            </div>
            <div className="px-4 py-2 rounded-full bg-cream font-bold text-warm-black">Score: {score}</div>
          </div>
          <div className="mt-3">
            <ReadAloudButton text="Northeast Memory Garden. Choose a state and an activity." compact />
          </div>
        </div>

        <section className="mb-6">
          <h2 className="font-semibold text-warm-black mb-3 text-sm uppercase tracking-wider">Choose a state</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {NER_STATES.map(s => (
              <button
                key={s.id}
                onClick={() => chooseState(s.id)}
                className={`text-left p-3 rounded-xl border-2 ${state === s.id ? 'border-saffron bg-saffron-lt' : 'border-warm-tan bg-cream hover:border-saffron'}`}
              >
                <span className="text-xl">{s.emoji}</span>
                <div className="font-semibold text-sm text-warm-black">{s.id}</div>
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          {([
            ['festival', '🎉', 'Festivals'],
            ['food', '🍲', 'Food'],
            ['games', '🎯', 'Games'],
            ['music', '🥁', 'Music'],
            ['memories', '💭', 'Memories'],
          ] as const).map(([id, emoji, label]) => (
            <button
              key={id}
              onClick={() => { setMode(id); resetRound() }}
              className={`p-3 rounded-xl border-2 font-semibold ${mode === id ? 'border-kumkum bg-kumkum-lt' : 'border-warm-tan bg-cream hover:border-kumkum'}`}
            >
              <span className="text-xl">{emoji}</span>
              <div className="text-sm text-warm-black">{label}</div>
            </button>
          ))}
        </div>

        {mode === 'festival' && (
          <section className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
            <div className="text-3xl">{festival?.emoji}</div>
            <h2 className="font-display text-xl font-bold text-warm-black mt-2">{festival?.name ?? 'Festival memory'}</h2>
            <p className="text-warm-gray text-sm mt-1">{festival?.description}</p>
            <p className="font-semibold text-warm-black mt-5 mb-3">Put the celebration in order:</p>
            <div className="grid gap-2">
              {festival && shuffle(festival.sequence).map(item => (
                <button
                  key={item}
                  onClick={() => {
                    const expected = festival.sequence[selected.length]
                    if (item === expected) {
                      const next = [...selected, item]
                      setSelected(next)
                      setFeedback(next.length === festival.sequence.length ? 'Excellent! You remembered the festival journey.' : 'That’s right. What comes next?')
                      if (next.length === festival.sequence.length) complete(2, 'Excellent! You remembered the festival journey.')
                    } else {
                      setFeedback('Not quite. Think about what would happen next.')
                    }
                  }}
                  className={`text-left p-4 rounded-xl border-2 ${selected.includes(item) ? 'border-forest bg-green-50' : 'border-warm-tan hover:border-saffron'}`}
                  disabled={selected.includes(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 font-semibold text-forest">{feedback}</p>}
            <button onClick={nextRound} className="mt-4 px-4 py-2 rounded-xl bg-saffron text-white font-bold">Next memory</button>
          </section>
        )}

        {mode === 'food' && (
          <section className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
            <h2 className="font-display text-xl font-bold text-warm-black">Taste & Remember</h2>
            <p className="text-warm-gray text-sm mt-1">Tap the foods that belong to {state}. Learn the name, then remember the group.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {foodRound.map(item => (
                <button
                  key={item.name}
                  onClick={() => toggleFood(item.name)}
                  className={`text-left p-4 rounded-xl border-2 ${selected.includes(item.name) ? 'border-forest bg-green-50' : 'border-warm-tan hover:border-saffron'}`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="font-semibold text-warm-black mt-1">{item.name}</div>
                  <div className="text-xs text-warm-gray mt-1">{item.description}</div>
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 font-semibold text-forest">{feedback}</p>}
            <button onClick={nextRound} className="mt-4 px-4 py-2 rounded-xl bg-saffron text-white font-bold">Next food memory</button>
          </section>
        )}

        {mode === 'games' && (
          <section className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
            <h2 className="font-display text-xl font-bold text-warm-black">Games of {state}</h2>
            <p className="text-warm-gray text-sm mt-1">Which traditional game or sport do you recognise?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {gameRound.map(item => (
                <button
                  key={item.name}
                  onClick={() => chooseGame(item.name)}
                  className={`text-left p-4 rounded-xl border-2 ${selected.includes(item.name) ? 'border-forest bg-green-50' : 'border-warm-tan hover:border-saffron'}`}
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="font-semibold text-warm-black mt-1">{item.name}</div>
                  <div className="text-xs text-warm-gray mt-1">{item.description}</div>
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 font-semibold text-forest">{feedback}</p>}
          </section>
        )}

        {mode === 'music' && (
          <section className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
            <div className="text-4xl">{musicTrack?.emoji}</div>
            <h2 className="font-display text-xl font-bold text-warm-black mt-2">{musicTrack?.tradition}</h2>
            <p className="text-warm-gray text-sm mt-1">{musicTrack?.description}</p>
            <div className="mt-5 p-5 rounded-2xl bg-parchment text-center">
              <div className="text-sm text-warm-gray mb-3">Instrument / sound</div>
              <div className="font-semibold text-warm-black">{musicTrack?.instrument}</div>
              <div className="flex justify-center gap-2 mt-5">
                {(musicTrack?.pattern ?? []).map((beat, i) => (
                  <span key={i} className={`w-7 h-7 rounded-full ${beat ? 'bg-saffron' : 'bg-warm-tan'}`} />
                ))}
              </div>
              <button onClick={playMusic} className="mt-5 px-5 py-3 rounded-xl bg-saffron text-white font-bold">
                🥁 Play rhythm & remember
              </button>
            </div>
            {feedback && <p className="mt-4 font-semibold text-forest">{feedback}</p>}
            <button onClick={nextRound} className="mt-4 px-4 py-2 rounded-xl bg-saffron text-white font-bold">Next rhythm</button>
          </section>
        )}

        {mode === 'memories' && (
          <section className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
            <div className="text-4xl">{memory?.emoji}</div>
            <h2 className="font-display text-xl font-bold text-warm-black mt-2">{memory?.title}</h2>
            <p className="text-warm-gray text-sm mt-1">{memory?.prompt}</p>
            <p className="font-semibold text-warm-black mt-5 mb-3">Tap what happened next:</p>
            <div className="grid gap-2">
              {memory && shuffle(memory.items).map(item => (
                <button
                  key={item}
                  onClick={() => chooseMemoryItem(item)}
                  disabled={memoryOrder.includes(item)}
                  className={`text-left p-4 rounded-xl border-2 ${memoryOrder.includes(item) ? 'border-forest bg-green-50' : 'border-warm-tan hover:border-saffron'}`}
                >
                  {memoryOrder.includes(item) ? `${memoryOrder.indexOf(item) + 1}. ` : ''}{item}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-4 font-semibold text-forest">{feedback}</p>}
            <button onClick={nextRound} className="mt-4 px-4 py-2 rounded-xl bg-saffron text-white font-bold">Next memory</button>
          </section>
        )}

        <p className="text-xs text-warm-gray mt-5">
          Cultural activities are for memory, attention and engagement. They are not diagnostic or medical treatment.
        </p>
      </div>
    </ElderLayout>
  )
}
