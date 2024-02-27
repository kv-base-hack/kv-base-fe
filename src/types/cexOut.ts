export interface DataCexOut {
  topCexOut: TopCexOut[]
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
