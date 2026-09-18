'use client'

import { useRef, useState } from 'react'
import { useApp } from './AppContext'

export interface MusicTrack {
  id: string
  title: string
  region: string
  tradition: string
  language?: string
  description: string
  emoji: string
  src: string
}

const SCALES: Record<string, number[]> = {
  Assam: [261.63, 293.66, 329.63, 392, 440, 523.25],
  Manipur: [220, 261.63, 293.66, 329.63, 392],
  Meghalaya: [261.63, 311.13, 349.23, 392, 466.16],
  Mizoram: [220, 246.94, 277.18, 329.63, 369.99],
  Nagaland: [196, 220, 261.63, 293.66, 329.63],
  Tripura: [261.63, 293.66, 349.23, 392, 440],
  'Arunachal Pradesh': [220, 261.63, 293.66, 349.23, 392],
  Sikkim: [261.63, 293.66, 329.63, 392, 493.88],
}

export default function MusicPlayer({ track }: { track: MusicTrack }) {
  const { settings } = useApp()
  const ctxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const noteRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)


  const stopSynth = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    if (ctxRef.current) {
      void ctxRef.current.close()
      ctxRef.current = null
    }
  }

  const playSynth = async () => {
    stopSynth()
    const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) throw new Error('Web Audio is not supported')
    const ctx = new Ctx()
    ctxRef.current = ctx
    if (ctx.state === 'suspended') await ctx.resume()
    const scale = SCALES[track.region] ?? SCALES.Assam
    noteRef.current = 0

    const loop = () => {
      if (!ctxRef.current) return
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      osc.type = track.region === 'Assam' ? 'sine' : 'triangle'
      osc.frequency.value = scale[noteRef.current % scale.length]
      filter.type = 'lowpass'
      filter.frequency.value = 1800
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.11, now + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65)
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.7)
      noteRef.current += 1
      timerRef.current = setTimeout(loop, 420)
    }
    loop()
  }

  const stop = () => {
    stopSynth()
    setPlaying(false)
  }

  const toggle = async () => {
    if (!settings.audioEnabled) return
    if (playing) { stop(); return }
    setError(false)
    try {
      await playSynth()
      setPlaying(true)
    } catch {
      setError(true)
      setPlaying(false)
    }
  }

  return (
    <div className="p-5 bg-cream rounded-2xl border-2 border-warm-tan" style={{ boxShadow: '0 2px 8px rgba(28,13,5,0.07)' }}>
      <div className="flex items-start gap-4">
        <div className="text-4xl shrink-0">{track.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="text-kumkum text-xs font-semibold uppercase tracking-wider">{track.region} · {track.tradition}</div>
          <div className="font-display font-semibold text-warm-black text-lg mt-1">{track.title}</div>
          {track.language && <div className="text-warm-gray text-xs mt-0.5">Language/tradition: {track.language}</div>}
          <p className="text-warm-gray text-sm mt-2 leading-relaxed">{track.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" disabled={!settings.audioEnabled} onClick={toggle} className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-saffron text-white font-semibold text-sm hover:bg-saffron-dk disabled:opacity-50 transition-colors">
              {playing ? '⏹ Stop' : '▶ Play music'}
            </button>
            <span className="text-warm-gray text-xs">
              Offline synthetic demo melody
            </span>
          </div>
          {error && <p className="mt-3 text-kumkum text-xs">Audio could not start. Check that your browser allows sound, then try Play again.</p>}
        </div>
      </div>
    </div>
  )
}
