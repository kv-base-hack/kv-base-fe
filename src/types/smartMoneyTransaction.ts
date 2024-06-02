export interface DataSmartMoneyTransaction {
  smart_money_tx: SmartMoneyTx[]
  total: number
}

export interface SmartMoneyTx {
  tx: string
  token_address: string
  block_timestamp: string
  block_number: number
  sender: string
  time: string
  value_in_token: number
  value_in_usdt: number
  avg_price: number
  price: number
  movement: string
  action: string
  log_index: number
  symbol: string
  token_image_url: string
  scan_link: string
}

export interface SmartMoneyTransactionResponse {
  data: DataSmartMoneyTransaction
}
