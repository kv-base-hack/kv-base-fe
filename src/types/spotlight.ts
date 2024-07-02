export type SpotlightType = {
  action: string
  avg_price: number
  balance_change_percent: number
  block_number: number
  block_timestamp: string
  pnl: number
  portfolio_percent: number
  price: number
  price_change_24h: number
  roi: number
  scan_link: string
  sender: string
  token_address: string
  token_age: string
  total_token: number
  total_volume_usdt: number
  tx_hash: string
  value_in_token: number
  value_in_usdt: number
}

export type SpotlightResp = {
  spot_light: SpotlightType[]
  total: number
}