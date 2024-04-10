export interface DataTopCexDesposit {
  top_cex_deposit: TopCexDeposit[]
  total: number
}

export interface TopCexDeposit {
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
  number_of_deposit: number
  oi_1h: number
  oi_4h: number
}

export interface FindGemsDepositResponse {
  data: DataTopCexDesposit
}
