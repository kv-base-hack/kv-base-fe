export interface DataTrendingToken {
  trending_tokens: TrendingToken[]
  total?: number
}

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
  liquidity: number
  priceChangeH1: number
  priceChangeH2?: number
  priceChangeH4?: number
  priceChangeH24: number
  fdv: number
}

export interface FindGemsTrendingResponse {
  data: DataTrendingToken
}
