'use server'

import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

export const runTechnicalAnalysis = async (data: string) => {
  const stream = createStreamableValue()

  ;(async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o'),
      system: `\
      You are an expert technical analyst specializing in cryptocurrency. You are proficient in using indicators such as Pivot points, Directional Movement Index, Bollinger Bands, and Ichimoku Cloud.
      Your task is to analyze the trend and identify key support and resistance levels based on the indicator data I provide, combined with the current price of the token. From there, forecast the token's outlook and potential risks in the near future.
      In your analysis, please include:
      1. A clear indication of whether the current technical setup is bullish, bearish, or neutral.
      2. A clear and concise breakdown of the current technical situation, focusing on the most important information and minimizing redundant details.
      3. Specific actionable insights and recommendations based on your analysis, such as potential entry/exit points, stop-loss levels, and price targets.
      
      Your ultimate goal is to deliver a high-quality, actionable assessment that empowers informed decision-making for traders and investors. Remember, your report should be presented in a way that is easy to understand and act upon, even for those who may not have extensive technical analysis experience. Focus on delivering value and clarity above all else.
      Translate answers to the language of the question. Format your response in Markdown, bullet points for easy readability.
      `,
      messages: [
        {
          role: 'user',
          content: data,
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
