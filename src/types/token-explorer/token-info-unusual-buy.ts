export interface DataTokenInfoUnusualBuy {
  res: TokenInfoUnusualBuy
}

export interface TokenInfoUnusualBuy {
  name: string
  address: string
  pnl: number
  avg_price: number
  price_change_24h: number
  number_of_users: number
  number_of_hold_users: number
  roi: number
  realized_percent: number
  buy_volume_in_usdt: number
  sell_volume_in_usdt: number
}
export interface TokenInfoUnusualBuyResponse {
  data: DataTokenInfoUnusualBuy
}
