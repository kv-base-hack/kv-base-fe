export interface DataTokenList {
  tokens: TokenList[]
  users?: WalletList[]
}

export interface TokenList {
  address?: string
  symbol: string
  name: string
  usdPrice: number
  tokenAddress: string
  chainId: string
  imageUrl: string
  market_cap: number
  price_24h: number
}

export interface WalletList {
  address?: string
  balance: number
  volume_24h: number
  roi_percent: number
  pnl: number
}

export interface TokenListResponse {
  data: DataTokenList
}
