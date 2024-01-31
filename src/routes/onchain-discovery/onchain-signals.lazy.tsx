import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/onchain-signals')({
  component: OnchainSignals,
})

function OnchainSignals() {
  return (
    <div className="w-full h-full">
      <Heading3>Onchain Signals</Heading3>
    </div>
  )
}
