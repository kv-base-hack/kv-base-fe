export interface DataTopUserProfit {
  topUserProfit: TopUserProfit[]
  total?: number
}

export interface TopUserProfit {
  id: string
  address?: string
  value?: number
  smart_money: string
  badge: string[]
  roi: number
  net_profit: number
  total_balance: number
  most_profitable_trade: string
  current_largest_position: string
  most_bought_token_24h: string
  most_sell_token_24h: string
  largest_trade: string
}

export interface TopUserProfitResponse {
  data: DataTopUserProfit
}
