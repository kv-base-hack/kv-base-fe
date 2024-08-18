export interface DataTopTokenProfit {
  top_smart_money_token_profit: TopTokenProfit[]
  total?: number
}

export interface TopTokenProfit {
  address: string
  name: string
  symbol: string
  current_price: number
  image_url: string
  pnl: number
  avg_cost: number
  price_change_24h: number
  liquidity: number
  market_cap: number
  avg_roi: number
  realized: number
  number_of_smart_money?: number
}

export interface TopTokenProfitResponse {
  data: DataTopTokenProfit
}
