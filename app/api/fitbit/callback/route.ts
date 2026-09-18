import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')
  const cookieState = request.headers.get('cookie')?.match(/(?:^|;\s*)fitbit_oauth_state=([^;]+)/)?.[1]
  const clientId = process.env.FITBIT_CLIENT_ID
  const clientSecret = process.env.FITBIT_CLIENT_SECRET
  const redirectUri = process.env.FITBIT_REDIRECT_URI || `${url.origin}/api/fitbit/callback`
  if (error) return NextResponse.redirect(new URL(`/?fitbit=error&reason=${encodeURIComponent(error)}`, url.origin))
  if (!code || !state || !cookieState || state !== cookieState) return NextResponse.redirect(new URL('/?fitbit=error&reason=invalid_state', url.origin))
  if (!clientId || !clientSecret) return NextResponse.redirect(new URL('/?fitbit=error&reason=not_configured', url.origin))

  const body = new URLSearchParams({ client_id: clientId, grant_type: 'authorization_code', redirect_uri: redirectUri, code })
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const tokenResponse = await fetch('https://api.fitbit.com/oauth2/token', {
    method: 'POST', headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body,
  })
  if (!tokenResponse.ok) return NextResponse.redirect(new URL('/?fitbit=error&reason=token_exchange', url.origin))
  const token = await tokenResponse.json()
  const response = NextResponse.redirect(new URL('/?fitbit=connected', url.origin))
  response.cookies.set('fitbit_access_token', token.access_token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: token.expires_in || 28800, path: '/' })
  if (token.refresh_token) response.cookies.set('fitbit_refresh_token', token.refresh_token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 31536000, path: '/' })
  response.cookies.set('fitbit_oauth_state', '', { httpOnly: true, expires: new Date(0), path: '/' })
  return response
}
