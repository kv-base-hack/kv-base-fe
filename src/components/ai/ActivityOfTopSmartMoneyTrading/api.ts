'use server'

import { ofetch } from 'ofetch'

export const getActivityOfTopSmartMoneyTrading = async (
  address: string,
  page: number,
  perPage: number,
  chain: string
) => {
  const limit = perPage
  const start = (page - 1) * perPage + 1
  const resp = await ofetch(
    `https://api-onchain.kaivest.net/v1/token/activity_smart_money_of_token?chain=${chain}&limit=${limit}&start=${start}&address=${address}`,
  )

  return resp
}
