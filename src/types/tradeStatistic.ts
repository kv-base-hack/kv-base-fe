export interface TradeStatistic {
  current_largest_position: CurrentLargestPosition
  current_largest_position_detail: CurrentLargestPositionDetail
  most_buy: MostBuy
  most_buy_detail: MostBuyDetail
  most_buy_value_avg: number
  most_buy_value_in_usdt: number
  most_loss: MostLoss
  most_loss_detail: MostLossDetail
  most_loss_value_in_usdt: number
  most_profit: MostProfit
  most_profit_detail: MostProfitDetail
  most_profit_value_in_usdt: number
  most_sell: MostSell
  most_sell_detail: MostSellDetail
  most_sell_value_avg: number
  most_sell_value_in_usdt: number
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
}

export interface CurrentLargestPositionDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface MostBuy {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chain?: string
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
}

export interface MostBuyDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface MostLoss {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chain?: string
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
}

export interface MostLossDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface MostProfit {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chain?: string
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
}

export interface MostProfitDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface MostSell {
  usdPrice: number
  tokenAddress: string
  symbol: string
  chain?: string
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
}

export interface MostSellDetail {
  token_address: string
  avg_price: number
  value_in_usdt: number
  volume: number
  roi: number
  pnl: number
}

export interface TradeStatisticResponse {
  data: TradeStatistic
}
