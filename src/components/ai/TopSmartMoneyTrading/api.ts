'use server'

import { ofetch } from 'ofetch'

export const getTopSmartMoneyTrading = async (
  address: string,
  page: number,
  perPage: number,
) => {
  const limit = perPage
  const start = (page - 1) * perPage + 1
  const resp = await ofetch(
    `https://api-onchain.kaivest.net/v1/token/top_smart_money_for_token?chain=solana&limit=${limit}&start=${start}&address=${address}`,
  )

  return resp
}
