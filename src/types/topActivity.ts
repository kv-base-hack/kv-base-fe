export interface DataTopActivity {
  activities: TopActivity[]
  total: number
}

export interface TopActivity {
  id: string
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
  chainId: string
}

export interface TopActivityResponse {
  data: DataTopActivity
}
