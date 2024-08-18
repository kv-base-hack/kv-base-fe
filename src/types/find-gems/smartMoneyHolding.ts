export interface DataSmartMoneyHolding {
  smart_money_holding: SmartMoneyHolding[]
  total?: number
}

export interface SmartMoneyHolding {
  address: string
  network: string
  name: string
  symbol: string
  current_price: number
  image_url: string
  price_percent_change_24h: number
  avg_price: number
  number_of_smart_money_hold: number
  realized_percent: number
  pnl: number
  total_spent_3d: number
  roi: number
  liquidity: number
  fdv: number
  tx_buy: number
  tx_sell: number
  buy_volume_in_usdt: number
  sell_volume_in_usdt: number
  hold_in_usdt: number
  token_age: string
  score: number
}

export interface FindGemsSmartMoneyHoldingResponse {
  data: DataSmartMoneyHolding
}
