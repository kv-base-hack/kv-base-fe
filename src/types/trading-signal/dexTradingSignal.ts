export interface DataDexTradingSignal {
  data: DexTradingSignalInfo[]
  metadata: Metadata
}

export interface SmartMoneyTradeWithTokenResponse {
  useraddress: string
  roi: number
  pnl: number
}

export interface DataSM {
  summary: {
    avg_entry_price: number
    net_flow: number
    realized_percent: number
    number_of_smart_money_hold: number
  }
}

export interface DexTradingSignalInfo {
  _id: string
  symbol: string
  address: string
  name: string
  current_price: number
  percent_change_24h: number
  signal_time: string
  entry: number
  content: string
  image_url?: string
  data: Data
  dex_trade_signal_type: string
  target_max: number
  target_min: number
  ai_score: number
  users: SmartMoneyTradeWithTokenResponse[]
}

export interface Data {
  summary: Summary
}

export interface Summary {
  net_flow: number
  number_of_smart_money_hold: number
  realized_percent: number
  avg_entry_price: number
  balance_change_percent: number
}

export interface Metadata {
  page: number
  perPage: number
  pageCount: number
  total: number
}

export interface DexTradingSignalResponse {
  data: DataDexTradingSignal
}
