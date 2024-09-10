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
  volume: number
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
  balance_change_percent: number
  fdv: number
  users: User[]
  realized_percent: number
  hold_in_token: number
  hold_in_usdt: number
  tx_buy: number
  tx_sell: number
  roi: number
  buy_usdt_amount: number
  sell_usdt_amount: number
  token_Age: string
  score: number
  pnl: number
  token_age: string
}

export interface User {
  user_address: string
  roi: number
  pnl: number
}
export interface TopTokenBuyResponse {
  data: DataTopTokenBuy
}
