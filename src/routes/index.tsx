import { Heading3 } from '@/components/common/Typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="w-full h-full">
      <Heading3>Dashboard</Heading3>
    </div>
  )
}
