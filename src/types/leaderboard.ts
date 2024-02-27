export interface DataLeaderboard {
  leaderboard: Leaderboard[]
}

export interface Leaderboard {
  user_address: string
  net_profit: number
  current_largest_position: CurrentLargestPosition
  most_token_buy: MostTokenBuy
  most_token_sell: MostTokenSell
  last_trade: string
  roi: number
  total_balance: number
}

export interface CurrentLargestPosition {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chainId: string
  sourcePrice: string
  imageUrl: string
}

export interface MostTokenBuy {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chainId: string
  sourcePrice: string
  imageUrl: string
}

export interface MostTokenSell {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chainId: string
  sourcePrice: string
  imageUrl: string
}

export interface LeaderboardResponse {
  data: DataLeaderboard
}
