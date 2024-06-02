'use server'

import { ofetch } from 'ofetch'

export const getMarketNews = async () => {
  const resp = await ofetch(`https://api-chat.boltrade.ai/ai/market`)

  return resp
}
