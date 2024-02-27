export interface TrendingToken {
  name: string
  symbol: string
  image_url?: string
  thumb?: string
  small: string
  price: string
  market_cap: string
  total_volume: string
  price_change_percentage_24h: number
  address: string
  chain_id: string
}

export interface TrendingTokenData {
  trending_tokens: TrendingToken[]
}

export interface TrendingTokenResponse {
  data: TrendingTokenData
}
