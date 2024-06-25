import { z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'
import { getSmartMoneyTransactions } from '@/components/ai/SmartMoneyTransactions/api'
import { SmartMoneyTransactions } from '@/components/ai/SmartMoneyTransactions'

import { BotMessage } from '@/components/common'
import { nanoid } from '@/lib/utils'
import { CHAIN_X } from '@/constant/chain'

const parameters = z.object({
  symbol: z
    .string()
    .describe('Token symbol. Example: bitcoin, eth, sol, apt, ...'),
  address: z.string().describe('Token address'),
})

export const createSmartMoneyTransactionsTool: CreateToolFunction = (
  aiState,
) => {
  return {
    description: `Show UI "smart money transactions of token"`,
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
        const initData = await getSmartMoneyTransactions(
          address,
          1,
          10,
          CHAIN_X,
        )
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
                  toolName: 'smart-money-transactions',
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
                  toolName: 'smart-money-transactions',
                  toolCallId,
                  result: { symbol, address },
                },
              ],
            },
          ],
        })

        return (
          <div className="px-6">
            <SmartMoneyTransactions data={initData} />
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
                  toolName: 'smart-money-transactions',
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
                  toolName: 'smart-money-transactions',
                  toolCallId,
                  result: { symbol, address },
                },
              ],
            },
          ],
        })
        return (
          <BotMessage
            content={`I can't find transactions of ${symbol}. Please try again later!!!`}
          />
        )
      }
    },
  }
}
