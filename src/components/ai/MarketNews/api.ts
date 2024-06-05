'use server'

import { ofetch } from 'ofetch'

export const getMarketNews = async () => {
  const resp = await ofetch(`https://api-chat.kaivest.net/ai/market`)

  return resp
}
