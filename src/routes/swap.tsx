import { GroupHeader } from '@/components/common/GroupHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/swap')({
  component: Swap,
})

function Swap() {
  return (
    <div className="w-full h-screen pt-2">
      <GroupHeader className="mt-4 mx-10" title="Swap" />
      {/* <iframe
        style={{ width: '100%', height: '100%' }}
        src="https://jup.ag/swap/USDT-USDC"></iframe> */}
    </div>
  )
}
