'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

import { TooltipProvider } from '@/components/ui/tooltip'

import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dynamic from 'next/dynamic'

import { WagmiProvider, createConfig, http } from 'wagmi'
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, base } from 'wagmi/chains'

import {
  bitgetWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'

const id = '2e7dc518c252e86b1423572af2179822'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [bitgetWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'Kaivest App',
    projectId: id,
  },
)

const config = createConfig({
  connectors,
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const ReactQueryDevtoolsProduction = dynamic(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])
  const queryClient = getQueryClient()
  return (
    <NextThemesProvider {...props}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="compact">
            <TooltipProvider>{children}</TooltipProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            {showDevtools && (
              <React.Suspense fallback={null}>
                <ReactQueryDevtoolsProduction />
              </React.Suspense>
            )}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextThemesProvider>
  )
}
