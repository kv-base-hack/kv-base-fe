import { symbol, z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'
import { nanoid } from 'nanoid'
import { TopSmartMoneyTrading } from '@/components/ai/TopSmartMoneyTrading'
import { BotMessage } from '@/components/common'
import { getSmartMoneyNewListingBuy } from '@/components/ai/SmartMoneyNewListingBuy/api'
import { SmartMoneyNewListingBuy } from '@/components/ai/SmartMoneyNewListingBuy'
import { LogoChat } from '@/components/shared/icons/LogoChat'
import { getSmartMoneyTopBuys } from '@/components/ai/SmartMoneyTopBuys/api'
import { SmartMoneyTopBuys } from '@/components/ai/SmartMoneyTopBuys'

const parameters = z.object({
  chain: z.string().describe('Chain. Example: ethereum, base, ...'),
})

export const createSmartMoneyTopBuysTool: CreateToolFunction = (aiState) => {
  return {
    description: `Show UI "top smart money top buys"`,
    parameters,
    generate: async function* ({ chain }: z.infer<typeof parameters>) {
      yield (
        <div className="mt-4 px-6">
          <SkeletonMessageSmartMoney />
        </div>
      )
      const toolCallId = nanoid()

      try {
        const initData = await getSmartMoneyTopBuys(chain)
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
                  toolName: 'smartMoneyTopBuys',
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
                  toolName: 'smartMoneyTopBuys',
                  toolCallId,
                  result: initData,
                },
              ],
            },
          ],
        })

        return (
          <div className="flex items-start gap-4 my-8">
            <LogoChat className="w-8 h-8 shrink-0" />
            <SmartMoneyTopBuys data={initData} />
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
                  toolName: 'smartMoneyTopBuys',
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
                  toolName: 'smartMoneyTopBuys',
                  toolCallId,
                  result: [],
                },
              ],
            },
          ],
        })
        return (
          <BotMessage
            content={`I can't find Smart Money Top Buys on chain: ${chain}. Please try again!!!`}
          />
        )
      }
    },
  }
}
