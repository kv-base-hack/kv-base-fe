import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="w-full h-full">
      <Heading3>Index</Heading3>
    </div>
  )
}
