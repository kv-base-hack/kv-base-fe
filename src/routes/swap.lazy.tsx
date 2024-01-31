import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/swap')({
  component: Swap,
})

function Swap() {
  return (
    <div className="w-full h-full">
      <Heading3>Swap</Heading3>
    </div>
  )
}
