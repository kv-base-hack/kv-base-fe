import { metadata } from './../../app/layout'
export interface DataTokenExplorerTradingSignal {
  _id: string
  pair: string
  direction: string
  entry: number[]
  targets: Target[]
  stopLoss: StopLoss
  msgId: number
  done: boolean
  channelId: ChannelId
  createdAt: string
  updatedAt: string
  roi: number
  status: string
  __v: number
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

export interface ChannelId {
  _id: string
  name: string
}

export interface Metadata {
  page: number
  perPage: number
  pageCount: number
  total: number
}

export interface Data1 {
  data: DataTokenExplorerTradingSignal[]
  metadata: Metadata
}

export interface TokenExplorerTradingSignalResponse {
  data: Data1
}
