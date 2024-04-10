export interface DataTopUnusualCex {
  top_unusual_cex: TopUnusualCex[]
  total: number
}

export interface TopUnusualCex {
  address: string
  value: number
  network: string
  symbol: string
  current_price: number
  image_url: string
  net_flow_24h: number
  oi_24h: number
  volume_24h: number
  price_percent_change_24h: number
  market_cap: number
  net_flow: number
  oi_1h: number
  oi_4h: number
  action: string
  unusual_percent: number
}

export interface FindGemsUnusualCexResponse {
  data: DataTopUnusualCex
}
