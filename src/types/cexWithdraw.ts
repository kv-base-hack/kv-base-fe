export interface DataCexWithdraw {
  top_cex_out: TopCexWithdraw[]
  total: number
}

export interface TopCexWithdraw {
  address: string
  value: number
  symbol: string
  network: string
  net_flow: number
  oi: number
  current_price: number
  image_url: string
}

export interface CexWithdrawResponse {
  data: DataCexWithdraw
}
