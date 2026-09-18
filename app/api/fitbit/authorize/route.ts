import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET(request: Request) {
  const clientId = process.env.FITBIT_CLIENT_ID
  if (!clientId) return NextResponse.json({ error: 'FITBIT_CLIENT_ID is not configured. Use Preview demo data in the app.' }, { status: 503 })
  const url = new URL(request.url)
  const redirectUri = process.env.FITBIT_REDIRECT_URI || `${url.origin}/api/fitbit/callback`
  const state = crypto.randomBytes(24).toString('hex')
  const auth = new URL('https://www.fitbit.com/oauth2/authorize')
  auth.searchParams.set('response_type', 'code')
  auth.searchParams.set('client_id', clientId)
  auth.searchParams.set('redirect_uri', redirectUri)
  auth.searchParams.set('scope', 'activity heartrate profile sleep')
  auth.searchParams.set('state', state)
  const response = NextResponse.redirect(auth)
  response.cookies.set('fitbit_oauth_state', state, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 600, path: '/' })
  return response
}
