export interface DataTopSmartMoneyRanking {
  top_smart_money_ranking: TopSmartMoneyRanking[]
  total?: number
}

export interface TopSmartMoneyRanking {
  id: string
  address?: string
  value?: number
  smart_money: string
  badge: string[]
  roi: number
  net_profit: number
  total_balance: number
  most_profitable_trade: string
  current_largest_position: string
  most_bought_token_24h: string
  most_sell_token_24h: string
  largest_trade: string
  number_of_trades_3d: number
  realized_pnl: number
  unrealized_pnl: number
}

export interface TopSmartMoneyRankingResponse {
  data: DataTopSmartMoneyRanking
}
