export interface DataTokenList {
  tokens: TokenList[]
}

export interface TokenList {
  address?: string
  tokenAddress?: string
  value: number
  symbol: string
  usdPrice: number
  chainId: string
}

export interface TokenListResponse {
  data: DataTokenList
}
