import { Heading3 } from '@/components/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/bots-strategy')({
  component: BotsStrategy,
})

function BotsStrategy() {
  return (
    <div className="w-full h-full">
      <Heading3>Bots Strategy</Heading3>
    </div>
  )
}
