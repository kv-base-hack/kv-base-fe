'use client'

import { TopTokenBuy, TopTokenSell } from '@/types/top-token'
import { MessageTopTokenBuy } from './MessageTopTokenBuy'
import { MessageTopTokenSell } from './MessageTopTokenSell'

interface MessageSmartMoneyResponse {
  top_buy_by_smart_money: TopTokenBuy[]
  top_sell_by_smart_money: TopTokenSell[]
  total_buy: number
  total_sell: number
}

export const MessageSmartMoney = (data: MessageSmartMoneyResponse) => {
  return (
    <div className="mb-10 flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#1A1D1F]/50 p-4 shadow-chat-ai backdrop-blur-[32px]">
      <MessageTopTokenBuy
        data={data.top_buy_by_smart_money}
        total={data.total_buy}
      />
      <MessageTopTokenSell
        data={data.top_sell_by_smart_money}
        total={data.total_sell}
      />
    </div>
  )
}
