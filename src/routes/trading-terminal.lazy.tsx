import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/trading-terminal')({
  component: () => <div>Hello /trading-terminal!</div>
})
  component: TradingTerminal,
})

function TradingTerminal() {
  return (
    <div className="w-full h-full">
      <Heading3>Trading Terminal</Heading3>
    </div>
  )
}
