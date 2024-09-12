export interface DataActivityWalletExplorer {
  activities: ActivityWalletExplorer[]
  total: number
}

export interface ActivityWalletExplorer {
  chain_id: string
  price: number
  price_change_24h: number
  scan_link: string
  symbol: string
  token_image_url: string
  tx: {
    action: string
    avg_price: number
    block_number: number
    block_timestamp: {
      seconds: number
    }
    movement: string
    sender: string
    time: string
    token_address: string
    value_in_token: number
    value_in_usdt: number
    tx: string
  }
}

export interface ActivityWalletExplorerResponse {
  data: DataActivityWalletExplorer
}
