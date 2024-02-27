export interface DataCexIn {
  topCexIn: TopCexIn[]
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
