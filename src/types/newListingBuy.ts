export interface DataNewListingBuy {
  smart_money_new_listing_buy: NewListingBuy[]
  total: number
}

export interface NewListingBuy {
  name: string
  address: string
  symbol: string
  current_price: number
  image_url: string
  pnl: number
  token_age: string
  avg_price: number
  price_change_24h: number
  number_of_smart_money: number
  usdt_value: number
  total_spent: number
  liquidity: number
  market_cap: number
  fdv: number
  roi: number
  users: User[]
  realized_percent: number
  hold_in_token: number
  hold_in_usdt: number
  tx_buy: number
  tx_sell: number
  buy_volume_in_usdt: number
  sell_volume_in_usdt: number
  score: number
}

export interface User {
  user_address: string
  roi: number
  pnl: number
}

export interface NewListingBuyResponse {
  data: DataNewListingBuy
}
