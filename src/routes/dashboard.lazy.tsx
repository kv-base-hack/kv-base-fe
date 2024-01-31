import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="w-full h-full">
      <Heading3>Dashboard</Heading3>
    </div>
  )
}
