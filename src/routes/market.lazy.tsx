import { Heading3 } from '@/components/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/market')({
  component: Market,
})

function Market() {
  return (
    <div className="w-full h-full">
      <Heading3>Market</Heading3>
    </div>
  )
}
