import { Heading3 } from '@/components/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/subcriptions')({
  component: Subcriptions,
})

function Subcriptions() {
  return (
    <div className="w-full h-full">
      <Heading3>Subcriptions</Heading3>
    </div>
  )
}
