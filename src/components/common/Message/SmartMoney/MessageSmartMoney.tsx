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
    <div className="bg-[#1A1D1F]/50 border border-white/10 p-4 backdrop-blur-[32px] shadow-chat-ai rounded-2xl mb-10 w-full flex flex-col gap-4">
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
