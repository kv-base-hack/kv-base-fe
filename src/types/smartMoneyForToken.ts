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
  most_profit_24h: MostProfit24h
  largest_position: LargestPosition
  last_trade: string
  pnl_of_3d_trades: number
  volume_24h: number
  leaderboard_with_tokens: LeaderboardWithToken[]
  badges: string[]
  ranking: string
  point: number
  win_rate_percent: number
  buy_trade: number
  sell_trade: number
  total_trade: number
  token_hold_addresses: string[]
  roi_3d_token: number
  pnl_3d_token: number
  realized_profit: number
  unrealized_profit: number
  total_profit: number
  balance_of_token: number
  balance_change_24h: number
  number_of_token_trade: number
  pnl: number
  realized_percent: number
  avg_entry: number
  buy_volume: number
  avg_sell: number
  sell_volume: number
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

export interface MostProfit24h {
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
  realized_profit: number
  unrealized_profit: number
  total_profit: number
  realized_percent: number
  avg_entry: number
  buy_volume: number
  avg_sell: number
  sell_volume: number
}

export interface SmartMoneyForTokenResponse {
  data: DataSmartMoneyForToken
}
