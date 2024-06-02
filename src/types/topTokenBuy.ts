export interface DataTopTokenBuy {
  top_buy_by_smart_money: TopTokenBuy[]
  total_buy?: number
}

export interface TopTokenBuy {
  network: string
  symbol: string
  name: string
  current_price: number
  token_amount: number
  usdt_amount: number
  avg_price: number
  image_url: string
  number_of_smart_money: number
  price_percent_change_24h: number
  price_percent_change: number
  market_cap: number
  liquidity_usd: number
  volume: number
  volume_24h: number
  address: string
  net_flow: number
  pnl: number
  balance_change_percent: number
  balance_24h_change: number
  fdv: number
}

export interface TopTokenBuyResponse {
  data: DataTopTokenBuy
}
