export interface DataTokenInspectActivity {
  activities: Activity[]
  total?: number
}

export interface Activity {
  tx: string
  token_address: string
  block_timestamp: string
  block_number: number
  sender: string
  time: string
  value_in_token: number
  value_in_usdt: number
  price: number
  movement: string
  action: string
  symbol: string
  token_image_url: string
  chain_id: string
  scan_link: string
}

export interface TokenInspectActivityResponse {
  data: DataTokenInspectActivity
}
