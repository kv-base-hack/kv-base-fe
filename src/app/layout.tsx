import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { Sora } from 'next/font/google'

import { Providers } from '@/components/providers'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { DefaultLayout } from '@/components/common/Layout/DefaultLayout'
import Script from 'next/script'
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
    icon: '/favicon.ico',
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
  const gtmId = 'G-HKKHKHK'
  return (
    <html lang="en" className={sora.className} suppressHydrationWarning>
      <GoogleTagManager gtmId={gtmId} />
      <body className="antialiased">
        <Toaster />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
        <Script
          src="https://terminal.jup.ag/main-v2.js"
          strategy="beforeInteractive"
        />
        <GoogleAnalytics gaId={gtmId} />
      </body>
    </html>
  )
}
