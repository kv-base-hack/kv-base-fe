export interface DataSmartMoneyHolding {
  smart_money_holding: SmartMoneyHolding[]
  total?: number
}

export interface SmartMoneyHolding {
  address: string
  value: number
  network: string
  name: string
  symbol: string
  current_price: number
  image_url: string
  net_flow: number
  oi: number
  volume_24h: number
  price_percent_change_24h: number
  market_cap: number
  net_flow_24h: number
  number_of_deposit: number
  number_of_withdraw: number
  oi_1h: number
  oi_4h: number
  oi_24h: number
  avg_price?: number
}

export interface FindGemsSmartMoneyHoldingResponse {
  data: DataSmartMoneyHolding
}

export interface MessageTokenInfoResponse {
  name: string
  symbol: string
  tags: string[]
  usd_price: number
  percent_change_24h: number
  percent_change_7d: number
  percent_change_1h: number
  website: string
  twitter: string
  telegram: string
  chart: any[]
  market_cap: number
  volume_24h: number
  fully_diluted_valuation: number
  liquidity: number
}

export interface TableProps {
  page: number
  perPage: number
  data: any[]
  isFetching?: boolean
  duration?: string
  setSortBy: (value: string) => void
}

export interface TableFindGemsProps {
  tab: string
  page: number
  perPage: number
  setPage: (v: number) => void
  data: any[]
  total: number
  isFetching: boolean
  setSort: (v: string) => void
}

export interface TopSmartMoneyTradeUsersListProps {
  chain: string
  limit: number
  start: number
  address: string
  duration: string
  enabled?: boolean
  type?: string
}

export interface TokenInfoProps {
  symbol: string
  name: string
  usdPrice: number
  price_24h: number
  market_cap?: number
  value_buy: number
  avg_entry: number
  imgUrl: string
  number_sm_hold: number
  realized: number
  loading?: boolean
  address?: string
}

export interface SmartMoneyTransaction {
  tx: string
  token_address: string
  block_timestamp: string
  block_number: number
  sender: string
  time: string
  value_in_token: number
  value_in_usdt: number
  avg_price: number
  movement: string
  action: string
  log_index: number
  symbol: string
  token_image_url: string
  scan_link: string
  price: number
}

export interface TopSmartMoneyTradingQuery {
  user_address: string
  roi_3d_token: number
  net_profit: number
  roi: number
  total_balance: number
  last_trade: string
  number_of_3d_trades: number
  volume_24h: number
  pnl_of_3d_trades: number
}

export interface ActivitySmartMoneyOfTokenProps {
  action: string
  avg_price: number
  block_number: number
  block_timestamp: string
  movement: string
  price: number
  scan_link: string
  sender: string
  symbol: string
  time: string
  token_address: string
  token_image_url: string
  tx: string
  value_in_token: number
  value_in_usdt: number
}
