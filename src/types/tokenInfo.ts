export interface DataTokenInfo {
  info: TokenInfo
}

export interface TokenInfo {
  name: string
  symbol: string
  circulating_supply: number
  total_supply: number
  max_supply: number
  usd_price: number
  market_cap: number
  tags: string[]
  volume_24h: number
  fully_diluted_valuation: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
}

export interface TokenInfoResponse {
  data: DataTokenInfo
}
