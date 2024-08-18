export interface FirstTimeBuy {
  address: string
  avg_price: number
  current_price: number
  fdv: number
  hold_in_usdt: number
  hold_in_token: number
  image_url: string
  liquidity: number
  market_cap: number
  name: string
  number_of_users: number
  pnl: number
  price_change_24h: number
  realized_percent: number
  roi: number
  symbol: string
  score: number
  token_age: string
  total_spent: number
  usdt_value: number
  users: Users[]
  sell_usdt_amount: number
  buy_usdt_amount: number
  tx_buy: number
  tx_sell: number
}

export interface Users {
  pnl: number
  roi: number
  user_address: string
}

export interface DataFirstTimeBuy {
  first_time_buy: FirstTimeBuy[]
  total: number
}

export interface FirstTimeBuyResponse {
  data: DataFirstTimeBuy
}
