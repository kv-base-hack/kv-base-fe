export interface DataUserBalance {
  address: string
  total_balance: number
  tokens: Token[]
}

export interface Token {
  symbol: string
  address: string
  token_amount: number
  usdt_amount: number
  price: number
  price_24h_change: number
  balance_24h_change?: number
  image_url: string
}

export interface UserBalanceResponse {
  data: DataUserBalance
}
