export interface DataTokenList {
  tokens: TokenList[]
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

export interface TokenListResponse {
  data: DataTokenList
}
