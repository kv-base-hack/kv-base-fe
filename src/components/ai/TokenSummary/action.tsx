'use server'

import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { ofetch } from 'ofetch'

export const runAnalysis = async (
  symbol: string,
  address: string,
  chain: string,
) => {
  const data = await ofetch(
    `https://user-api-onchain.kaivest.net/v1/token/smart_money_token_summary?chain=${chain}&address=${address}`,
  )

  const stream = createStreamableValue()

  ;(async () => {
    const { textStream } = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: `\
      You are an expert onchain smart money analyst in the dex trading market. I will provide you with the following data for a given token:
        1. Smartmoney volume buy & sell 24h
        2. Smartmoney Netflow buy/sell in 24h
        3. Number of Smart money holding 24h
        4. Number of smart money selling 24h
        5. Avg entry price of smart money 24h
      Analyze this data and create a concise report including:
        1. Overall smart money sentiment (bullish/bearish/neutral)
        2. Actionable insights and recommendations for traders/investors
      Focus on critical information, use clear language, and maintain an objective tone. Your goal is to provide valuable, data-driven insights to inform decision-making.
      `,
      prompt: `Analyze token ${symbol} with the following data: \n\n${JSON.stringify(
        data,
      )}`,
    })

    for await (const text of textStream) {
      stream.update(text)
    }

    stream.done()
  })()

  return stream.value
}
