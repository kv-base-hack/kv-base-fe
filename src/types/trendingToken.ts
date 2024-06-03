export interface TrendingToken {
  name: string
  symbol: string
  thumb: string
  small: string
  price: number
  market_cap: string
  total_volume: string
  price_change_percentage_24h: number
  address: string
  chain_id: string
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH24: number
  liquidity: number
  fdv: number
}

export interface TrendingTokenData {
  trending_tokens: TrendingToken[]
}

export interface TrendingTokenResponse {
  data: TrendingTokenData
}
