import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/onchain-signals')({
  component: () => <div>Hello /onchain-discovery/onchain-signals!</div>
})