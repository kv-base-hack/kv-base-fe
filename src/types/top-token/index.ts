export interface DataTopTokenBuy {
  top_buy_by_smart_money: TopTokenBuy[]
  total_buy?: number
}

export interface TopTokenBuy {
  network: string
  address?: string
  symbol: string
  name: string
  current_price: number
  token_amount: number
  usdt_amount: number
  avg_price: number
  image_url: string
  number_of_smart_money: number
  price_percent_change_24h: number
  market_cap: number
  liquidity_usd: number
  volume_24h?: number
}

export interface TopTokenBuyResponse {
  data: DataTopTokenBuy
}

export interface DataTopTokenSell {
  top_sell_by_smart_money: TopTokenSell[]
  total_sell?: number
}

export interface TopTokenSell {
  network: string
  symbol: string
  address?: string
  name: string
  current_price: number
  token_amount: number
  usdt_amount: number
  avg_price: number
  image_url: string
  number_of_smart_money: number
  price_percent_change_24h: number
  market_cap: number
  liquidity_usd: number
}

export interface TopTokenSellResponse {
  data: DataTopTokenSell
}
