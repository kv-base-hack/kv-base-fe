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
  roi?: number
}

export interface FindGemsSmartMoneyHoldingResponse {
  data: DataSmartMoneyHolding
}
