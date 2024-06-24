import { z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'

import { MarketNews } from '@/components/ai/MarketNews'
import { getMarketNews } from '@/components/ai/MarketNews/api'
import { nanoid } from '@/lib/utils'
import { BotMessage } from '@/components/common'

const parameters = z.object({})

export const createMarketNewsTool: CreateToolFunction = (aiState) => {
  return {
    description: `Show summary of news and insight`,
    parameters,
    generate: async function* ({}: z.infer<typeof parameters>) {
      yield <SkeletonMessageSmartMoney />

      const toolCallId = nanoid()

      try {
        const initData = await getMarketNews()
        const lastMsg =
          aiState.get().messages[aiState.get().messages.length - 1]

        aiState.done({
          chatId: aiState.get().chatId,
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content: [
                {
                  type: 'tool-call',
                  toolName: 'market-news',
                  toolCallId,
                  args: {},
                },
              ],
            },
            {
              id: nanoid(),
              role: 'tool',
              content: [
                {
                  type: 'tool-result',
                  toolName: 'market-news',
                  toolCallId,
                  result: initData,
                },
              ],
            },
          ],
        })

        return (
          <MarketNews data={initData.data} input={lastMsg.content as string} />
        )
      } catch (e) {
        aiState.done({
          chatId: aiState.get().chatId,
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content: [
                {
                  type: 'tool-call',
                  toolName: 'market-news',
                  toolCallId,
                  args: {},
                },
              ],
            },
            {
              id: nanoid(),
              role: 'tool',
              content: [
                {
                  type: 'tool-result',
                  toolName: 'market-news',
                  toolCallId,
                  result: [],
                },
              ],
            },
          ],
        })

        return (
          <BotMessage
            content={`Something went wrong, I can't find Maket News`}
          />
        )
      }
    },
  }
}
