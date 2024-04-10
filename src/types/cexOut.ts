export interface DataCexOut {
  top_cex_out: TopCexOut[]
  total: number
}

export interface TopCexOut {
  address: string
  value: number
  symbol: string
  network: string
  net_flow_24h: number
  oi_24h: number
  current_price: number
  image_url: string
}

export interface CexOutResponse {
  data: DataCexOut
}
