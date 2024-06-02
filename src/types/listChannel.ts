export interface ListChannel {
  name: string
  __v: number
  winRate: number
  runtime: string
  thirtyDaysROI: number
  total7DaysSignals: number
}

export interface TData {
  data: ListChannel[]
}
export interface ListChannelResponse {
  data: TData
}

export interface ChannelResponse {
  data: ListChannel
}
