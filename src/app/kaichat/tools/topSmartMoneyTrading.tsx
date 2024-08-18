import { symbol, z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'
import { nanoid } from 'nanoid'
import { getTopSmartMoneyTrading } from '@/components/ai/TopSmartMoneyTrading/api'
import { TopSmartMoneyTrading } from '@/components/ai/TopSmartMoneyTrading'
import { BotMessage } from '@/components/common'
import { CHAIN } from '@/constant/chain'

const parameters = z.object({
  symbol: z
    .string()
    .describe('Token symbol. Example: bitcoin, eth, sol, apt, ...'),
  address: z.string().describe('Token address'),
})

export const createTopSmartMoneyTradingTool: CreateToolFunction = (aiState) => {
  return {
    description: `Show UI "top smart money trading token"`,
    parameters,
    generate: async function* ({
      address,
      symbol,
    }: z.infer<typeof parameters>) {
      yield (
        <div className="mt-4 px-6">
          <SkeletonMessageSmartMoney />
        </div>
      )
      const toolCallId = nanoid()

      try {
        const initData = await getTopSmartMoneyTrading(address, 1, 10, CHAIN)
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
                  toolName: 'top-smart-money-trading',
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
                  toolName: 'top-smart-money-trading',
                  toolCallId,
                  result: initData,
                },
              ],
            },
          ],
        })

        return (
          <div className="px-6">
            <TopSmartMoneyTrading data={initData} />
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
                  toolName: 'top-smart-money-trading',
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
                  toolName: 'top-smart-money-trading',
                  toolCallId,
                  result: [],
                },
              ],
            },
          ],
        })
        return (
          <BotMessage
            content={`I can't find Top Smart Money trading of ${symbol}. Please try again!!!`}
          />
        )
      }
    },
  }
}
