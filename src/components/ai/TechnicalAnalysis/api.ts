'use server'

import { ofetch } from 'ofetch'

export const getTechnicalAnalysis = async (
  symbol: string,
  interval: string = '4h',
) => {
  const resp = await ofetch(
    `${process.env.BOLAI_API}/ai/technical-analysis?symbol=${symbol}&interval=${interval}`,
  )

  return resp
}
