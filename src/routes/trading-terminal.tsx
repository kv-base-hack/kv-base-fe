import { GroupHeader } from '@/components/common/GroupHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trading-terminal')({
  component: TradingTerminal,
})

function TradingTerminal() {
  return (
    <div className="w-full h-full pt-2">
      <GroupHeader className="mt-4 mx-10" title="Trading Terminal"></GroupHeader>
    </div>
  )
}
