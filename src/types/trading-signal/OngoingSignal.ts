export interface DataOnGoingSignal {
  data: DataOnGoingSignal[]
  metadata: Metadata
}

export interface OnGoingSignal {
  _id: string
  pair: string
  direction: string
  entry: number[]
  targets: Target[]
  stopLoss: StopLoss
  channelId: string
  createdAt: string
  updatedAt: string
  __v: number
  floatingROI: number
}

export interface Target {
  price: number
  reached: boolean
  roi: number
}

export interface StopLoss {
  price: number
  reached: boolean
  roi: number
}

export interface Metadata {
  page: number
  perPage: number
  pageCount: number
  total: number
}

export interface OnGoingSignalResponse {
  data: DataOnGoingSignal
}
