import './globals.css'
import { Sora } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css'

import { AI } from './kaichat/action'
import { Providers } from '@/components/providers'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { DefaultLayout } from '@/components/common/Layout/DefaultLayout'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const meta = {
  title: 'Kaivest',
  description: 'Your personal AI investment assistant.',
}
export const metadata: Metadata = {
  ...meta,
  title: {
    default: 'Kaivest',
    template: `%s - Kaivest`,
  },
  icons: {
    icon: '/assets/images/logo.svg',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    ...meta,
    card: 'summary_large_image',
    site: '@vercel',
  },
  openGraph: {
    ...meta,
    locale: 'en-US',
    type: 'website',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const sora = Sora({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gtmId = 'G-HJ2P8J9GST'
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId={gtmId} />
      <body className={sora.className}>
        <Toaster />
        <AI>
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DefaultLayout>{children}</DefaultLayout>
          </Providers>
        </AI>
        <GoogleAnalytics gaId={gtmId} />
      </body>
    </html>
  )
}
