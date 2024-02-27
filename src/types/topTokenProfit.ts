export interface DataTopTokenProfit {
  topTokenProfit: TopTokenProfit[]
}

export interface TopTokenProfit {
  id: string
  address?: string
  value?: number
  symbol: string
  gains: number
  net_flow: number
  avg_cost: number
  current_price: number
  realized_percentage: number
  avg_roi: number
  image_url?: string
}

export interface TopTokenProfitResponse {
  data: DataTopTokenProfit
}
