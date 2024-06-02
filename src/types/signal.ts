export interface DataTradingSignal {
  data: TradingSignal[]
  metadata: Metadata
}

export interface TradingSignal {
  id: number
  direction: string
  pair: string
  entry: number[]
  targets: number[]
  stop: number
  created_at: string
}

export interface Metadata {
  current_page: number
  page_size: number
  total_pages: number
  total_items: number
}

export interface TradingSignalResponse {
  data: DataTradingSignal
}
