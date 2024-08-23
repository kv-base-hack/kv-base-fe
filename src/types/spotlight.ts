import { symbol } from 'zod'
export interface DataLeaderboardSpotlight {
  most_buy_by_user_number: DataSpotlight
  most_buy_by_volume: DataSpotlight
  most_hold_by_user_number: DataSpotlight
  most_hold_by_volume: DataSpotlight
  most_profit: DataSpotlight
}

export interface DataSpotlight {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  symbol: string
  image_url: string
}

export interface LeaderboardSpotlightResponse {
  data: DataLeaderboardSpotlight
}
