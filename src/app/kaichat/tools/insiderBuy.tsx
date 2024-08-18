import { z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'
import { nanoid } from 'nanoid'
import { BotMessage } from '@/components/common'
import { LogoChat } from '@/components/shared/icons/LogoChat'
import { SmartMoneyTopBuys } from '@/components/ai/SmartMoneyTopBuys'
import { getInsiderBuy } from '@/components/ai/InsiderBuy/api'
import { InsiderBuy } from '@/components/ai/InsiderBuy'

const parameters = z.object({
  chain: z.string().describe('Chain. Example: ethereum, base, ...'),
})

export const createInsiderBuy: CreateToolFunction = (aiState) => {
  return {
    description: `Show UI "insider buy"`,
    parameters,
    generate: async function* ({ chain }: z.infer<typeof parameters>) {
      yield (
        <div className="mt-4 px-6">
          <SkeletonMessageSmartMoney />
        </div>
      )
      const toolCallId = nanoid()

      try {
        const initData = await getInsiderBuy(chain)
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
                  toolName: 'insiderBuy',
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
                  toolName: 'insiderBuy',
                  toolCallId,
                  result: initData,
                },
              ],
            },
          ],
        })

        return (
          <div className="my-8 flex items-start gap-4">
            <LogoChat className="h-8 w-8 shrink-0" />
            <InsiderBuy data={initData} />
          </div>
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
                  toolName: 'insiderBuy',
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
                  toolName: 'insiderBuy',
                  toolCallId,
                  result: [],
                },
              ],
            },
          ],
        })
        return (
          <BotMessage
            content={`I can't find Insider Buy on chain: ${chain}. Please try again!!!`}
          />
        )
      }
    },
  }
}
