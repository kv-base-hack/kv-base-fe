import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/wallet-explorer')({
  component: () => <div>Hello /onchain-discovery/wallet-explorer!</div>,
})
