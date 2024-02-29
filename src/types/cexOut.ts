export interface DataCexOut {
  top_cex_out: TopCexOut[]
  total: number
}

export interface TopCexOut {
  address: string
  value: number
  symbol: string
  network: string
}

export interface CexOutResponse {
  data: DataCexOut
}
