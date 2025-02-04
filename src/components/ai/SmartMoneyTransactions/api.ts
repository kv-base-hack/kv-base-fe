'use server'

import { ofetch } from 'ofetch'

export const getSmartMoneyTransactions = async (
  address: string,
  page: number,
  perPage: number,
  chain: string,
) => {
  const limit = perPage
  const start = (page - 1) * perPage + 1
  const resp = await ofetch(
    `https://api.kaivest.net/user-onchain/v1/token/smart_money_tx?chain=${chain}&limit=${limit}&start=${start}&address=${address}`,
  )

  return resp
}
