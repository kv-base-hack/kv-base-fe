import { symbol } from 'zod'
export interface DataLeaderboardSpotlight {
  largest_position_by_max_holders: LargestPositionByMaxHolders
  largest_position_by_pnl: LargestPositionByPnl
  most_bought: MostBought
  most_profit: MostProfit
}

export interface LargestPositionByMaxHolders {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  symbol: string
}

export interface LargestPositionByPnl {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  symbol: string
}

export interface MostBought {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  symbol: string
}

export interface MostProfit {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  symbol: string
}

export interface LeaderboardSpotlightResponse {
  data: DataLeaderboardSpotlight
}
