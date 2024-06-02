'use client'

import { AiTradingSignal } from '@/components/pages/trading-signal/ai-trading-signal'

export default function TradingSignal() {
  return (
    <div className="w-full h-full">
      <div className="p-10 max-md:px-5 gap-4">
        <AiTradingSignal />
      </div>
    </div>
  )
}
