export interface DataSignalTriggered {
  data: SignalTriggered[]
  metadata: Metadata
}

export interface SignalTriggered {
  _id: string
  pair: string
  direction: string
  channelId: string
  createdAt: string
  updatedAt: string
  __v: number
  openPrice: number
  closePrice: number
  entryPrice: number
  realizedROI: number
}
export interface Metadata {
  page: number
  perPage: number
  pageCount: number
  total: number
}

export interface SignalTriggeredResponse {
  data: DataSignalTriggered
}
