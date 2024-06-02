'use server'

import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

export const runNews = async (input: string, data: string) => {
  const stream = createStreamableValue()

  ;(async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o'),
      system: `\
      Please analyze the provided information and generate a concise summary focusing on the most important and relevant points for users. The summary should include the following key elements:
      1. Overview of recent market trends and drivers, including notable price movements of major cryptocurrencies such as Bitcoin, Ethereum, etc.
      2. Significant events and announcements from companies, organizations, or countries that have a substantial impact on the market.
      3. Analyses and predictions from reputable experts and organizations regarding the short-term and long-term outlook of the market.

      Please condense the information into a concise news, prioritizing the most crucial and valuable content for crypto market followers. Use clear and easy-to-understand language.
      Remove any irrelevant information (e.g. dates, names, link, follow, telegram channel, twitter (X), source, copyright etc.)

      Context: \n\n
      ${data}
      `,
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
    })

    for await (const text of textStream) {
      stream.update(text)
    }

    stream.done()
  })()

  return stream.value
}
