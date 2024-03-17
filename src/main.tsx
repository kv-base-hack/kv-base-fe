import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WagmiProvider } from 'wagmi'
import './index.css'
import './polyfills'
import '@rainbow-me/rainbowkit/styles.css'

import { RainbowKitProvider, Theme, darkTheme } from '@rainbow-me/rainbowkit'
import { merge } from 'lodash'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { configWallet } from '@/constant/config-wallet'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const customTheme = merge(darkTheme(), {
  colors: {
    modalBackground: '#0E111B',
  },
  radii: {
    modal: '16px',
  },
  shadows: {
    dialog: '0px 0px 16px 0px rgba(105, 91, 255, 0.50)',
    selectedWallet: '0px 0px 30px 0px rgba(161, 145, 243, 0.10)',
  },
} as Theme)

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Suspense fallback={<div className="m-10">Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={configWallet}>
            <RainbowKitProvider theme={customTheme} modalSize="compact">
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  )
}
