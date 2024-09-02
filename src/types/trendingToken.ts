export interface TrendingToken {
  name: string
  symbol: string
  thumb: string
  imageUrl: string
  small: string
  price: number
  market_cap: string
  total_volume: string
  price_change_percentage_24h: number
  address: string
  tokenAddress: string
  chain_id: string
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH24: number
  liquidity: number
  fdv: number
  score: number
  hold_in_usdt: number
  total_profit: number
  number_of_smart_money_hold: number
  realized_percent: number
  token_address: string
  image_url: string
}

export interface TrendingTokenData {
  trending_tokens: TrendingToken[]
}

export interface TrendingTokenResponse {
  data: TrendingTokenData
}
