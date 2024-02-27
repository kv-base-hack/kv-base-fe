import { GroupHeader } from '@/components/common/GroupHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="w-full h-full pt-2">
      <GroupHeader className="mt-4 mx-10" title="Dashboard"></GroupHeader>
    </div>
  )
}
