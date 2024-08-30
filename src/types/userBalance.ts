

export interface Balances {
  hold_in_token: number
  hold_in_usdt: number
  realized_percent: number
  realized_profit: number
  total_profit: number
  tx_buy: number
  tx_sell: number
  unrealized_profit: number
  symbol: string
  time: string
  token_address: string
  image_url: string
  pnl: number
  buy_volume: number
  avg_entry: number
  avg_sell: number
  unrealized_percent: number
  sell_volume: number
  pair_address: string
  balance_amount_in_token: number
  avg_price_sell: number
  volume_sell_in_usdt: number
  avg_entry_buy: number
  volume_buy_in_usdt: number
}

export interface UserBalanceResponse {
  balances: Balances[]
}
