'use server'

import { ofetch } from 'ofetch'

export const getActivityOfTopSmartMoneyTrading = async (
  address: string,
  page: number,
  perPage: number,
) => {
  const limit = perPage
  const start = (page - 1) * perPage + 1
  const resp = await ofetch(
    `https://api-onchain.boltrade.ai/v1/token/activity_smart_money_of_token?chain=solana&limit=${limit}&start=${start}&address=${address}`,
  )

  return resp
}
