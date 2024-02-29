export interface DataCexIn {
  top_cex_in: TopCexIn[]
  total: number
}

export interface TopCexIn {
  address: string
  value: number
  symbol: string
  network: string
}

export interface CexInResponse {
  data: DataCexIn
}
