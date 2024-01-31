import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/leaderboard')({
  component: Leaderboard,
})

function Leaderboard() {
  return (
    <div className="w-full h-full">
      <Heading3>Welcome Leaderboard!</Heading3>
    </div>
  )
}
