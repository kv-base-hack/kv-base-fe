export interface DataTokenInfoTrade {
  res: TokenInfoTrade
}

export interface TokenInfoTrade {
  network: string
  token_amount: number
  volume: number
  avg_price: number
  number_of_smart_money: number
  number_of_hold_users: number
  price_percent_change_24h: number
  volume_24h: number
  address: string
  realized_percent: number
  roi: number
  buy_usdt_amount: number
  sell_usdt_amount: number
  total_profit: number
}

export interface TokenInfoTradeResponse {
  data: DataTokenInfoTrade
}
