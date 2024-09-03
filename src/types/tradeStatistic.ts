export interface DataTradeStatistic {
  most_buy: string
  most_buy_detail: MostBuyDetail
  most_profit: string
  most_profit_detail: MostProfitDetail
  current_largest_position: string
  current_largest_position_detail: CurrentLargestPositionDetail
}

export interface MostBuyDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  score: number
  realized_percent: number
  hold_in_usdt: number
  number_of_users: number
  image_url: string
  symbol: string
  name: string
  price_change_24h: number
}

export interface MostProfitDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  score: number
  realized_percent: number
  hold_in_usdt: number
  number_of_users: number
  image_url: string
  symbol: string
  name: string
  price_change_24h: number
}

export interface CurrentLargestPositionDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
  score: number
  realized_percent: number
  hold_in_usdt: number
  number_of_users: number
  image_url: string
  symbol: string
  name: string
  price_change_24h: number
}

export interface TradeStatisticResponse {
  data: DataTradeStatistic
}
