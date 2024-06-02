export interface DataCexDeposit {
  top_cex_in: TopCexDeposit[]
  total: number
}

export interface TopCexDeposit {
  address: string
  value: number
  symbol: string
  network: string
  net_flow: number
  oi: number
  current_price: number
  image_url: string
}

export interface CexDepositResponse {
  data: DataCexDeposit
}
