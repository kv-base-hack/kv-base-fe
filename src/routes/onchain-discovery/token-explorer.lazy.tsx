import { Heading3 } from '@/components/shared/common/Typography'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/onchain-discovery/token-explorer')({
  component: TokenExplorer,
})

function TokenExplorer() {
  return (
    <div className="w-full h-full">
      <Heading3>Token Explorer</Heading3>
    </div>
  )
}
