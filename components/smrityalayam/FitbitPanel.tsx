'use client'

import { useState, useEffect } from 'react'

export default function FitbitPanel() {
  const [isConnected, setIsConnected] = useState(false)
  const [fitbitData, setFitbitData] = useState({
    heartRate: 72,
    steps: 3420,
    sleepHours: 7.5,
    stressLevel: 'Low',
  })

  useEffect(() => {
    // Check if Fitbit auth code exists in localStorage
    const token = localStorage.getItem('smr_fitbit_token')
    if (token) {
      setIsConnected(true)
      fetchFitbitMetrics()
    }
  }, [])

  const fetchFitbitMetrics = async () => {
    try {
      const res = await fetch('/api/fitbit/data')
      if (res.ok) {
        const data = await res.json()
        setFitbitData(data)
      }
    } catch (e) {
      console.log('Using simulated wearable telemetry.')
    }
  }

  const handleFitbitConnect = () => {
    // Redirect to OAuth route
    window.location.href = '/api/fitbit/authorize'
  }

  return (
    <div className="bg-cream border-2 border-warm-tan rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⌚</span>
          <div>
            <h3 className="font-display text-xl font-bold text-warm-black">Wearable Health & Fitness Telemetry</h3>
            <p className="text-xs text-warm-gray">Syncs with Fitbit, Apple Health, and Smart Bands</p>
          </div>
        </div>
        {!isConnected ? (
          <button
            onClick={handleFitbitConnect}
            className="px-4 py-2 bg-indigo-700 text-white font-bold text-xs rounded-full hover:bg-indigo-800"
          >
            Connect Fitbit
          </button>
        ) : (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-300">
            ✓ Fitbit Connected
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div className="bg-parchment p-4 rounded-xl border border-warm-tan">
          <div className="text-xs font-bold text-warm-gray">Heart Rate</div>
          <div className="text-2xl font-bold text-maroon mt-1">{fitbitData.heartRate} <span className="text-xs font-normal">BPM</span></div>
        </div>
        <div className="bg-parchment p-4 rounded-xl border border-warm-tan">
          <div className="text-xs font-bold text-warm-gray">Daily Steps</div>
          <div className="text-2xl font-bold text-indigo-900 mt-1">{fitbitData.steps}</div>
        </div>
        <div className="bg-parchment p-4 rounded-xl border border-warm-tan">
          <div className="text-xs font-bold text-warm-gray">Sleep Duration</div>
          <div className="text-2xl font-bold text-green-800 mt-1">{fitbitData.sleepHours} <span className="text-xs font-normal">hrs</span></div>
        </div>
        <div className="bg-parchment p-4 rounded-xl border border-warm-tan">
          <div className="text-xs font-bold text-warm-gray">Stress Telemetry</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{fitbitData.stressLevel}</div>
        </div>
      </div>
    </div>
  )
}