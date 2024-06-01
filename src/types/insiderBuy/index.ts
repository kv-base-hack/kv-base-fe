export interface DataInsiderBuy {
  unusual_token_buy: InsiderBuy[]
  total: number
}

export interface InsiderBuy {
  name: string
  address: string
  symbol: string
  current_price: number
  image_url: string
  pnl: number
  avg_price: number
  price_change_24h: number
  number_of_users: number
  usdt_value: number
  roi: number
  liquidity: number
  market_cap: number
  price: number
  token_age: string
  fdv: number
  total_spent: number
}

export interface InsiderBuyResponse {
  data: DataInsiderBuy
}
