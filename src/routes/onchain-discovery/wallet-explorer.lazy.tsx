import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/wallet-explorer')({
  component: WalletExplorer,
})

function WalletExplorer() {
  return (
    <div className="w-full h-full">
      <Heading3>Wallet Explorer</Heading3>
    </div>
  )
}
