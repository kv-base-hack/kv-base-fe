export interface DataTokenInspectDepositWithdraw {
  cex_in_flow: number
  cex_in_flow_in_usdt: number
  cex_out_flow: number
  cex_out_flow_in_usdt: number
}

export interface TokenInspectDepositWithdrawResponse {
  data: DataTokenInspectDepositWithdraw
}
