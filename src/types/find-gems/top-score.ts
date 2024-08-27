

export interface DataTopTokenBuy {
  users: TopScoreByAI[]
  total?: number
}

export interface TopScoreByAI {
  fdv: number
  imageUrl: string
  liquidity_usd: number
  name: string
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  priceChangeM5: number
  score: number
  symbol: string
  tokenAddress: string
  url: string
  usdPrice: number
  volume24h: number
  token_Age: number
  avg_price: number
  hold_in_usdt: number
  roi: number
  pnl: number
  realized_percent: number
  number_of_users: number
  address: string
  tx_buy: number
  tx_sell: number
  buy_volume_in_usdt: number
  sell_volume_in_usdt: number
  token_age: number
}


export interface FindGemsTopScoreByAiResponse {
  data: DataTopTokenBuy
}
