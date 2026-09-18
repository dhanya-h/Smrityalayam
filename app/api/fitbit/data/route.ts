import { NextResponse } from 'next/server'

async function fitbitGet(path: string, token: string) {
  const r = await fetch(`https://api.fitbit.com${path}`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }, cache: 'no-store' })
  if (!r.ok) throw new Error(`Fitbit API ${r.status}`)
  return r.json()
}

export async function GET(request: Request) {
  const cookie = request.headers.get('cookie') || ''
  const token = cookie.match(/(?:^|;\s*)fitbit_access_token=([^;]+)/)?.[1]
  if (!token) return NextResponse.json({ connected: false })
  try {
    const [activity, heart] = await Promise.all([
      fitbitGet('/1/user/-/activities/date/today.json', token),
      fitbitGet('/1/user/-/activities/heart/date/today/1min.json', token),
    ])
    const summary = activity.summary || {}
    const distance = Array.isArray(summary.distances) ? summary.distances.find((d: any) => d.activity === 'total') : null
    const resting = heart['activities-heart']?.[0]?.value?.restingHeartRate ?? null
    return NextResponse.json({
      connected: true,
      demo: false,
      date: 'Today',
      steps: summary.steps ?? 0,
      distanceKm: distance?.distance ? Number(distance.distance) : null,
      calories: summary.caloriesOut ?? null,
      restingHeartRate: resting,
      sleepHours: null,
      activeMinutes: (summary.fairlyActiveMinutes ?? 0) + (summary.veryActiveMinutes ?? 0),
      note: 'Live Fitbit data. Sleep is shown after the sleep endpoint is configured for the production deployment.',
    })
  } catch {
    return NextResponse.json({ connected: false, note: 'Fitbit authorization may have expired. Reconnect the device.' }, { status: 401 })
  }
}
