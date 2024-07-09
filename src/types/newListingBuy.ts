export interface DataNewListingBuy {
  smart_money_new_listing_buy: NewListingBuy[]
  total: number
}

export interface NewListingBuy {
  name: string
  address: string
  symbol: string
  current_price: number
  usdt_value: number
  image_url: string
  pnl: number
  token_age: string
  avg_price: number
  price_change_24h: number
  number_of_smart_money: number
  price: number
  roi: number
  liquidity: number
  market_cap: number
  fdv: number
  total_spent: number
  users?: any[]
}

export interface NewListingBuyResponse {
  data: DataNewListingBuy
}
