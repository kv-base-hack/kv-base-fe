export interface DataTopTokenSell {
  top_sell_by_smart_money: TopTokenSell[]
  total_sell?: number
}

export interface TopTokenSell {
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
  volume_24h: number
  address: string
  net_flow: number
  pnl: number
  balance_change_percent: number
  volume: number
}

export interface TopTokenSellResponse {
  data: DataTopTokenSell
}
