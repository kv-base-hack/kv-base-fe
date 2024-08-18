'use sever'

import { ofetch } from 'ofetch'

export const getSmartMoneyTopBuys = async (chain: string) => {
  const resp = await ofetch(
    `https://api.kaivest.net/onchain/v1/token/top_smart_money_trade?limit=10&duration=24h&start=1&chain=${chain}&action=buying&price_change_24h_min=0&price_change_24h_max=0&market_cap_min=0&market_cap_max=0&fdv_min=0&fdv_max=0&volume_24h_min=0&volume_24h_max=0&cex_net_flow_min=0&cex_net_flow_max=0&sort_by=`,
  )

  return resp
}
