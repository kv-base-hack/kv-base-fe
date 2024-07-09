'use server'

import { ofetch } from 'ofetch'

export const getSmartMoneyNewListingBuy = async (
  page: number,
  perPage: number,
  chain: string,
) => {
  const limit = perPage
  const start = (page - 1) * perPage + 1
  const resp = await ofetch(
    `https://api.kaivest.net/onchain/v1/token/smart_money_new_listing_buy?limit=${limit}&duration=24h&start=${start}&chain=${chain}&sort_by=`,
  )

  return resp
}
