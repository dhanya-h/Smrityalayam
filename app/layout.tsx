import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '../components/smrityalayam/AppContext'

export const metadata: Metadata = {
  title: 'Smrityalayam — The home of your memories',
  description: 'An adaptive, culturally grounded cognitive-engagement platform for older adults and families.',
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppProvider>{children}</AppProvider></body></html>
}
