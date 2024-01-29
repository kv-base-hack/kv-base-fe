import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/leaderboard')({
  component: Leaderboard,
})

function Leaderboard() {
  return (
    <div className="p-2 text-red-500">
      <h3>Welcome Leaderboard!</h3>
    </div>
  )
}
