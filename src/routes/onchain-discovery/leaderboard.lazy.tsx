import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/leaderboard')({
  component: () => <div>Hello /onchain-discovery/leaderboard!</div>,
})
