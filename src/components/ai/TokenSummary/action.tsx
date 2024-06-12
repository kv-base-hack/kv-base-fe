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
      You are a crypto onchain expert. I will provide you with the following token data:
      1. 24h netflow Buy/Sell of smart money 
      2. Number of smart money addresses holding the token
      3. Number of fresh wallets with unusual buying activity
      4. 24h token balance change of smart money 
      5. Average token entry price of the token for SM
      6. Realized percentage of the token by smart money 

      Analyze the data and provide:
      1. Overall smart money sentiment (Bullish/Bearish/Neutral)
      2. Actionable insights and recommendations for traders/investors
      Keep your analysis concise and short, focusing on the most important findings and their implications for the token's future performance. Format your response in Markdown, including bullet points and headers for clarity.
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
