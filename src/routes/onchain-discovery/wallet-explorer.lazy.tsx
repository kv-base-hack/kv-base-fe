import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/wallet-explorer')({
  component: WalletExplorer,
})

function WalletExplorer() {
  return (
    <div className="p-2 text-red-500">
      <h3>Welcome WalletExplorer!</h3>
    </div>
  )
}
