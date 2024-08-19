export interface DataUserInfo {
  user_info: UserInfo
}

export interface UserInfo {
  address: string
  badges: string[]
  last_activity: string
  pnl: number
  ranking: string
  realized_pnl: number
  roi_percent: number
  roi_realized_percent: number
  roi_unrealized_percent: number
  scan_link: string
  token_loss: number
  token_win: number
  total: number
  total_pnl: number
  tx_buy: number
  tx_sell: number
  unrealized_pnl: number
  user_info_chart_point: UserInfoChartPoint

  volume: number
  volume_24h: number
  win_rate: number
}

export interface TradeCount {
  buy: number
  sell: number
  total: number
}

export interface UserInfoChartPoint {
  high_frequency: number
  balance: number
  diversify: number
  win_rate: number
  roi: number
  profit: number
}

export interface UserInfoResponse {
  data: DataUserInfo
}
