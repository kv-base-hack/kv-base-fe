export interface TradeStatisticTokens {
  token_stats: TokenStat[]
  first_time_buy: TokenStat[]
}

export interface TokenStat {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chain?: string
  cex_symbol: string
  name: string
  time?: string
  chainId: string
  sourcePrice: string
  imageUrl: string
  dexId: string
  url: string
  priceChangeM5: number
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  liquidity_usd: number
  fdv: number
  updated_at: string
  created_at: string
  address: string
  pnl: number
  avg_roi: number
  realized_percent: number
  realized_percent_30d: number
  unrealized_percent_30d: number
  total_profit_30d: number
  balance: number
  volume: number
  avg_price: number
  roi: number
  entry_price_sell: number
}

export interface TradeStatisticTokensResponse {
  data: TradeStatisticTokens
}
