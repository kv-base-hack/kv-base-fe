'use server'

import { ofetch } from 'ofetch'

export const getInsiderBuy = async (chain: string) => {
  const resp = await ofetch(
    `https://api.kaivest.net/onchain/v1/token/unusual_token_buy?start=1&limit=10&chain=${chain}&duration=24h&sort_by=`,
  )
  return resp
}
