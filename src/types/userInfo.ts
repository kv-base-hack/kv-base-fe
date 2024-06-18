export interface DataUserInfo {
  user_info: UserInfo
}

export interface UserInfo {
  pnl: number
  roi_percent: number
  address: string
  volume_24h: number
  last_activity: string
  scan_link: string
}

export interface UserInfoResponse {
  data: DataUserInfo
}
