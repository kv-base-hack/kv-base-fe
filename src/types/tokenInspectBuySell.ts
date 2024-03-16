export interface DataTokenInspectBuySell {
  in_flow_in_token: number
  in_flow_in_usdt: number
  out_flow_in_token: number
  out_flow_in_usdt: number
}

export interface TokenInspectBuySellResponse {
  data: DataTokenInspectBuySell
}
