import { z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'

import { ActivityOfTopSmartMoneyTrading } from '@/components/ai/ActivityOfTopSmartMoneyTrading'
import { getActivityOfTopSmartMoneyTrading } from '@/components/ai/ActivityOfTopSmartMoneyTrading/api'
import { nanoid } from '@/lib/utils'
import { BotMessage } from '@/components/common'
import { CHAIN } from '@/constant/chain'

const parameters = z.object({
  symbol: z
    .string()
    .describe('Token symbol. Example: bitcoin, eth, sol, apt, ...'),
  address: z.string().describe('Token address'),
})

export const createActivityOfTopSmartMoneyTradingTool: CreateToolFunction = (
  aiState,
) => {
  return {
    description: `Show UI "activity of top smart money trading token"`,
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

      try {
        const initData = await getActivityOfTopSmartMoneyTrading(
          address,
          1,
          10,
          CHAIN,
        )
        const toolCallId = nanoid()

        aiState.done({
          chatId: aiState.get().chatId,
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content: [
                {
                  toolName: 'activity-of-top-smart-money-trading',
                  toolCallId,
                  type: 'tool-call',
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
                  toolName: 'activity-of-top-smart-money-trading',
                  toolCallId,
                  result: { address, symbol },
                },
              ],
            },
          ],
        })

        return (
          <div className="mt-4 px-6">
            <ActivityOfTopSmartMoneyTrading data={initData} />
          </div>
        )
      } catch (e) {
        return <BotMessage content={`Something wrent wrong, Plese try again`} />
      }
    },
  }
}
