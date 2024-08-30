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
  most_profit_token_24h: MostProfitToken24h
  last_trade: string
  total_balance: number
  pnl_of_3d_trades: number
  volume_24h: number
  point: number
  badges: string[]
  ranking: string
  win_rate_percent: number
  buy_trade: number
  sell_trade: number
  total_trade: number
  token_holds: TokenHold[]
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
  volumeH24: number
  fdv: number
  priceChangeM5: number
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  liquidity_usd: number
  pair_address: string
  websites: string[]
  discord_url: string
  telegram_handle: string
  twitter_handle: string
  updated_at: string
  created_at: string
  image_url: string
  token_address: string
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
  volumeH24: number
  fdv: number
  priceChangeM5: number
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  liquidity_usd: number
  pair_address: string
  websites: string[]
  discord_url: string
  telegram_handle: string
  twitter_handle: string
  updated_at: string
  created_at: string
  image_url: string
  token_address: string
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
  volumeH24: number
  fdv: number
  priceChangeM5: number
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  liquidity_usd: number
  pair_address: string
  websites: string[]
  discord_url: string
  telegram_handle: string
  twitter_handle: string
  updated_at: string
  created_at: string
  image_url: string
  token_address: string
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
  volumeH24: number
  fdv: number
  priceChangeM5: number
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  liquidity_usd: number
  pair_address: string
  websites: string[]
  discord_url: string
  telegram_handle: string
  twitter_handle: string
  updated_at: string
  created_at: string
  image_url: string
  token_address: string
}

export interface MostProfitToken24h {
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
  volumeH24: number
  fdv: number
  priceChangeM5: number
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  liquidity_usd: number
  pair_address: string
  websites: string[]
  discord_url: string
  telegram_handle: string
  twitter_handle: string
  updated_at: string
  created_at: string
  image_url: string
  token_address: string
}

export interface TokenHold {
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
  volumeH24: number
  fdv: number
  priceChangeM5: number
  priceChangeH1: number
  priceChangeH2: number
  priceChangeH4: number
  priceChangeH6: number
  priceChangeH24: number
  liquidity_usd: number
  pair_address: string
  websites: string[]
  discord_url: string
  telegram_handle: string
  twitter_handle: string
  updated_at: string
  created_at: string
  image_url: string
  token_address: string
}

export interface LeaderboardResponse {
  data: DataLeaderboard
}
