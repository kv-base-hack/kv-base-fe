export interface PriceWithTransferData {
  price_with_transfer: PriceWithTransfer
}

export interface PriceWithTransfer {
  [key: string]: Data
}

export interface Data {
  date: string
  deposit: number
  withdraw: number
  price: number
}

export interface PriceWithTransferResponse {
  data: PriceWithTransferData
}

export interface DataLeaderboard {
  leaderboard: Leaderboard[]
  total: number
}

export interface Leaderboard {
  user_address: string
  net_profit: number
  roi: number
  current_largest_position: CurrentLargestPosition
  most_token_buy: MostTokenBuy
  most_token_sell: MostTokenSell
  most_profit_token: MostProfitToken
  last_trade: string
  total_balance: number
}

export interface CurrentLargestPosition {
  usdPrice: number
  tokenAddress: string
  symbol: string
  cex_symbol: string
  name: string
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
  pair_address: string
}

export interface MostTokenBuy {
  usdPrice: number
  tokenAddress: string
  symbol: string
  cex_symbol: string
  name: string
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
  pair_address: string
}

export interface MostTokenSell {
  usdPrice: number
  tokenAddress: string
  symbol: string
  cex_symbol: string
  name: string
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
  pair_address: string
}

export interface MostProfitToken {
  usdPrice: number
  tokenAddress: string
  symbol: string
  cex_symbol: string
  name: string
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
  pair_address: string
}

export interface LeaderboardResponse {
  data: DataLeaderboard
}
