export interface DataCexIn {
  top_cex_in: TopCexIn[]
  total: number
}

export interface TopCexIn {
  address: string
  value: number
  symbol: string
  network: string
  net_flow_24h: number
  oi_24h: number
  current_price: number
  image_url: string
}

export interface CexInResponse {
  data: DataCexIn
}
