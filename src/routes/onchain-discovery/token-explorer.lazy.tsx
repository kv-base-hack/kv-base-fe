import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/token-explorer')({
  component: TokenExplorer,
})

function TokenExplorer() {
  return (
    <div className="p-2 text-red-500">
      <h3>Welcome TokenExplorer!</h3>
    </div>
  )
}
