'use client'

import { useState } from 'react'
import ElderLayout from '../ElderLayout'
import { useT } from '../useT'
import ReadAloudButton from '../ReadAloudButton'
import MusicPlayer, { type MusicTrack } from '../MusicPlayer'
import NERCultureGamesScreen from './NERCultureGamesScreen'
import { NER_FESTIVALS, NER_FOODS, NER_GAMES, NER_MUSIC, NER_STATES } from '../nerCulture'


const REGIONS = [
  { id: 'northeast', label: 'Northeast', flag: '🌿', desc: 'Assam · Arunachal Pradesh · Manipur · Meghalaya · Mizoram · Nagaland · Sikkim · Tripura' },
  { id: 'north', label: 'North', flag: '🏔️', desc: 'Punjab · UP · Rajasthan · Himachal' },
  { id: 'south', label: 'South', flag: '🌴', desc: 'Tamil Nadu · Kerala · Karnataka · AP' },
  { id: 'east', label: 'East', flag: '🌊', desc: 'West Bengal · Odisha · Assam · Bihar' },
  { id: 'west', label: 'West', flag: '🏜️', desc: 'Gujarat · Maharashtra · Goa' },
]

const CONTENT_TYPES = [
  { id: 'music', emoji: '🎵', label: 'Music' },
  { id: 'stories', emoji: '📖', label: 'Stories' },
  { id: 'food', emoji: '🍲', label: 'Food' },
  { id: 'festivals', emoji: '🎉', label: 'Festivals' },
  { id: 'games', emoji: '🎯', label: 'Games' },
]

const NORTHEAST_MUSIC: MusicTrack[] = (NER_MUSIC ?? []).map(track => ({
  id: `${track.state}-${track.tradition}`,
  title: track.tradition,
  region: track.state,
  tradition: track.tradition,
  language: track.state === 'Assam' ? 'Assamese' : track.state === 'Manipur' ? 'Manipuri' : 'Regional tradition',
  emoji: track.emoji,
  src: '',
  description: `${track.description} Instrument/sound: ${track.instrument}.`,
}))

const CONTENT: Record<string, Record<string, { title: string; desc: string; emoji: string }[]>> = {
  north: {
    music: [
      { emoji: '🎻', title: 'Maand', desc: 'A lyrical folk form from Rajasthan, sung at royal courts.' },
      { emoji: '🥁', title: 'Bhangra', desc: 'Energetic harvest folk music and dance from Punjab.' },
      { emoji: '🎶', title: 'Thumri', desc: 'Romantic devotional songs popularised in Lucknow.' },
    ],
    stories: [
      { emoji: '📜', title: 'Panchatantra Tales', desc: 'Wisdom fables featuring animals and clever characters.' },
      { emoji: '✨', title: 'Heer Ranjha', desc: 'A timeless Punjabi love story retold through generations.' },
    ],
    food: [
      { emoji: '🥘', title: 'Dal Baati Churma', desc: 'Rajasthan\'s iconic combination of baked wheat balls and lentils.' },
      { emoji: '🫓', title: 'Makki di Roti', desc: 'Cornmeal flatbread traditionally served with sarson da saag.' },
    ],
    crafts: [
      { emoji: '🪆', title: 'Phulkari', desc: 'Vibrant needlework from Punjab using silk thread on cotton.' },
      { emoji: '🏺', title: 'Blue Pottery', desc: 'Turquoise-glazed Jaipur pottery with Persian roots.' },
    ],
  },
  south: {
    music: [
      { emoji: '🎻', title: 'Carnatic Kritis', desc: 'Classical compositions by Thyagaraja, Muthuswami Dikshitar.' },
      { emoji: '🥁', title: 'Thavil', desc: 'A barrel drum central to Tamil Nadu\'s temple music.' },
    ],
    stories: [
      { emoji: '📜', title: 'Cilappatikaram', desc: 'One of Tamil literature\'s greatest epics, a love story.' },
    ],
    food: [
      { emoji: '🍛', title: 'Sadya', desc: 'Kerala\'s grand banana-leaf feast for festivals like Onam.' },
    ],
    crafts: [
      { emoji: '🏺', title: 'Tanjore Painting', desc: 'Gold-leaf classical art depicting deities, from Tamil Nadu.' },
    ],
  },
  east: {
    music: [
      { emoji: '🎶', title: 'Baul Songs', desc: 'Mystical folk songs of Bengal\'s wandering Baul singers.' },
    ],
    stories: [
      { emoji: '📜', title: 'Tagore\'s Stories', desc: 'Short stories from Rabindranath Tagore, Nobel laureate.' },
    ],
    food: [
      { emoji: '🍬', title: 'Rasgulla', desc: 'Soft cheese balls in sugar syrup — Bengal\'s beloved sweet.' },
    ],
    crafts: [
      { emoji: '🎨', title: 'Pattachitra', desc: 'Odisha\'s ancient scroll painting of mythological scenes.' },
    ],
  },
  west: {
    music: [
      { emoji: '🎻', title: 'Lavani', desc: 'Maharashtra\'s powerful folk music with strong rhythms.' },
    ],
    stories: [
      { emoji: '📜', title: 'Birbal Tales', desc: 'Comic wisdom tales of Akbar\'s witty minister Birbal.' },
    ],
    food: [
      { emoji: '🥘', title: 'Dhokla', desc: 'Steamed fermented rice and chickpea cakes from Gujarat.' },
    ],
    crafts: [
      { emoji: '🪆', title: 'Warli Painting', desc: 'Tribal art of Maharashtra using circles, triangles, squares.' },
    ],
  },
}

export default function CulturalScreen() {
  const [region, setRegion] = useState<string | null>(null)
  const [contentType, setContentType] = useState<string | null>(null)
  const [nerState, setNerState] = useState<(typeof NER_STATES)[number]['id']>('Assam')
  const [showNERGames, setShowNERGames] = useState(false)
  const t = useT()

  if (showNERGames) {
    return <NERCultureGamesScreen onBack={() => setShowNERGames(false)} />
  }

  const isNER = region === 'northeast'
  const items = region && contentType ? (CONTENT[region]?.[contentType] ?? []) : []

  return (
    <ElderLayout active="cultural">
      <div className="p-5 md:p-8 max-w-4xl mx-auto screen-enter">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-warm-black mb-1">{t.culturalTitle}</h1>
        <p className="text-warm-gray mb-3">{t.culturalSub}</p>
        <ReadAloudButton text={`${t.culturalTitle}. ${t.culturalSub}`} />

        <section className="mb-6">
          <h2 className="font-semibold text-warm-black mb-3 text-sm uppercase tracking-wider">{t.yourRegion}</h2>
          <div className="grid grid-cols-2 gap-3">
            {REGIONS.map(r => (
              <button
                key={r.id}
                onClick={() => { setRegion(r.id); setContentType(null) }}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${region === r.id ? 'border-saffron bg-saffron-lt' : 'border-warm-tan bg-cream hover:border-saffron hover:bg-saffron-lt'}`}
              >
                <div className="text-3xl mb-1">{r.flag}</div>
                <div className="font-display font-semibold text-warm-black">{r.label} India</div>
                <div className="text-warm-gray text-xs mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {isNER && (
          <section className="mb-6 p-5 rounded-2xl bg-saffron-lt border-2 border-saffron">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-3xl">🌿</div>
                <h2 className="font-display text-xl font-bold text-warm-black mt-1">Northeast Memory Garden</h2>
                <p className="text-warm-gray text-sm mt-1">
                  Eight states. Local festivals, foods, indigenous games, music and memory prompts.
                </p>
              </div>
              <button onClick={() => setShowNERGames(true)} className="px-4 py-3 rounded-xl bg-kumkum text-white font-bold">
                🎮 Play NER memory games
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              {NER_STATES.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setNerState(s.id); setContentType(null) }}
                  className={`text-left p-3 rounded-xl border-2 ${nerState === s.id ? 'border-saffron bg-cream' : 'border-warm-tan bg-cream/70'}`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <div className="font-semibold text-sm text-warm-black">{s.id}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {region && (
          <section className="mb-6 screen-enter">
            <h2 className="font-semibold text-warm-black mb-3 text-sm uppercase tracking-wider">{t.whatToExplore}</h2>
            <div className={`grid grid-cols-2 ${isNER ? 'sm:grid-cols-5' : 'sm:grid-cols-4'} gap-3`}>
              {(isNER ? [
                { id: 'music', emoji: '🎵', label: 'Music' },
                { id: 'stories', emoji: '📖', label: 'Stories' },
                { id: 'food', emoji: '🍲', label: 'Food' },
                { id: 'festivals', emoji: '🎉', label: 'Festivals' },
                { id: 'games', emoji: '🎯', label: 'Games' },
              ] : CONTENT_TYPES.slice(0, 4)).map(ct => (
                <button
                  key={ct.id}
                  onClick={() => setContentType(ct.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${contentType === ct.id ? 'border-kumkum bg-kumkum-lt' : 'border-warm-tan bg-cream hover:border-kumkum hover:bg-kumkum-lt'}`}
                >
                  <span className="text-3xl">{ct.emoji}</span>
                  <span className="font-semibold text-warm-black text-sm">{ct.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {isNER && contentType && (
          <section className="screen-enter">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="font-display text-lg font-semibold text-warm-black">
                {contentType === 'music' ? 'Music' : contentType === 'food' ? 'Food' : contentType === 'festivals' ? 'Festivals' : 'Traditional games'} · {nerState}
              </h2>
              <button onClick={() => setShowNERGames(true)} className="text-saffron font-bold text-sm">Open memory games →</button>
            </div>

            {contentType === 'music' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-saffron-lt border-2 border-warm-tan">
                  <p className="text-warm-black text-sm leading-relaxed">
                    These are offline synthetic demonstrations of rhythm patterns inspired by documented regional traditions. They are not authentic field recordings.
                  </p>
                </div>
                {NORTHEAST_MUSIC.filter(x => x.region === nerState).map(track => <MusicPlayer key={track.id} track={track} />)}
              </div>
            )}

            {contentType === 'food' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NER_FOODS.filter(x => x.state === nerState).map(item => (
                  <div key={item.name} className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
                    <span className="text-4xl">{item.emoji}</span>
                    <div className="font-display font-semibold text-warm-black mt-2">{item.name}</div>
                    <p className="text-warm-gray text-sm mt-1">{item.description}</p>
                    <ReadAloudButton text={`${item.name}. ${item.description}`} compact />
                  </div>
                ))}
              </div>
            )}

            {contentType === 'festivals' && (
              <div className="space-y-3">
                {NER_FESTIVALS.filter(x => x.state === nerState).map(item => (
                  <div key={item.name} className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
                    <span className="text-4xl">{item.emoji}</span>
                    <div className="font-display font-semibold text-warm-black mt-2">{item.name}</div>
                    <p className="text-warm-gray text-sm mt-1">{item.description}</p>
                    <div className="mt-3 text-sm">
                      {item.sequence.map((step, i) => <div key={step} className="py-1 text-warm-black">{i + 1}. {step}</div>)}
                    </div>
                    <ReadAloudButton text={`${item.name}. ${item.description}`} compact />
                  </div>
                ))}
              </div>
            )}

            {contentType === 'games' && (
              <div className="space-y-3">
                {NER_GAMES.filter(x => x.state === nerState).map(item => (
                  <div key={item.name} className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
                    <span className="text-4xl">{item.emoji}</span>
                    <div className="font-display font-semibold text-warm-black mt-2">{item.name}</div>
                    <p className="text-warm-gray text-sm mt-1">{item.description}</p>
                    <button onClick={() => setShowNERGames(true)} className="mt-3 text-saffron font-bold text-sm">Use in a memory activity →</button>
                  </div>
                ))}
              </div>
            )}

            {contentType === 'stories' && (
              <div className="p-5 bg-cream rounded-2xl border-2 border-warm-tan">
                <div className="text-4xl">📖</div>
                <div className="font-display font-semibold text-warm-black mt-2">Community stories and oral traditions</div>
                <p className="text-warm-gray text-sm mt-1">Stories should be added with community/family permission and, where possible, in the elder's preferred language.</p>
              </div>
            )}
          </section>
        )}

        {region && !isNER && contentType && items.length > 0 && (
          <section className="space-y-3">
            {items.map(item => (
              <div key={item.title} className="flex items-start gap-4 p-5 bg-cream rounded-2xl border-2 border-warm-tan">
                <span className="text-4xl shrink-0">{item.emoji}</span>
                <div className="flex-1">
                  <div className="font-display font-semibold text-warm-black">{item.title}</div>
                  <p className="text-warm-gray text-sm mt-1 leading-relaxed">{item.desc}</p>
                  <ReadAloudButton text={`${item.title}. ${item.desc}`} compact />
                </div>
              </div>
            ))}
          </section>
        )}

        {!region && (
          <div className="text-center py-8 text-warm-gray">
            <div className="text-5xl mb-3">🗺️</div>
            <p>Select a region to begin exploring.</p>
          </div>
        )}
      </div>
    </ElderLayout>
  )
}