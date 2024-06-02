export interface DataSmartMoneyForToken {
  smart_money_for_token: SmartMoneyForToken[]
  total: number
}

export interface SmartMoneyForToken {
  user_address: string
  net_profit: number
  roi: number
  total_balance: number
  most_buy: MostBuy
  most_sell: MostSell
  most_profit: MostProfit
  largest_position: LargestPosition
  last_trade: string
  pnl_of_3d_trades: number
  volume_24h: number
  leaderboard_with_tokens: LeaderboardWithToken[]
  pnl: number
  roi_3d_token: number
  pnl_3d_token: number
  balance_of_token: number
  balance_change_24h: number
  number_of_token_trade: number
}

export interface MostBuy {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface MostSell {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface MostProfit {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface LargestPosition {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface LeaderboardWithToken {
  token_address: string
  roi: number
  pnl: number
  number_of_trades: number
  balance_change_24h: number
  balance_in_usdt: number
}

export interface SmartMoneyForTokenResponse {
  data: DataSmartMoneyForToken
}
