import { symbol, z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'
import { nanoid } from 'nanoid'
import { TopSmartMoneyTrading } from '@/components/ai/TopSmartMoneyTrading'
import { BotMessage } from '@/components/common'
import { getSmartMoneyNewListingBuy } from '@/components/ai/SmartMoneyNewListingBuy/api'
import { SmartMoneyNewListingBuy } from '@/components/ai/SmartMoneyNewListingBuy'
import { LogoChat } from '@/components/shared/icons/LogoChat'

const parameters = z.object({
  chain: z.string().describe('Chain. Example: ethereum, base, ...'),
})

export const createSmartMoneyNewListingBuyTool: CreateToolFunction = (
  aiState,
) => {
  return {
    description: `Show UI "top smart money new listing buy"`,
    parameters,
    generate: async function* ({ chain }: z.infer<typeof parameters>) {
      yield (
        <div className="mt-4 px-6">
          <SkeletonMessageSmartMoney />
        </div>
      )
      const toolCallId = nanoid()

      try {
        const initData = await getSmartMoneyNewListingBuy(1, 10, chain)
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
                  toolName: 'smartMoneyNewListingBuy',
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
                  toolName: 'smartMoneyNewListingBuy',
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
            <SmartMoneyNewListingBuy data={initData} />
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
                  toolName: 'smartMoneyNewListingBuy',
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
                  toolName: 'smartMoneyNewListingBuy',
                  toolCallId,
                  result: [],
                },
              ],
            },
          ],
        })
        return (
          <BotMessage
            content={`I can't find Smart Traders New Listing Buy on chain: ${chain}. Please try again!!!`}
          />
        )
      }
    },
  }
}
