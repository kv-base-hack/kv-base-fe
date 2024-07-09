import { AIState, Message, MutableAIState, RenderTool } from './types'
import { z } from 'zod'
import { nanoid, sleep } from '@/lib/utils'
import { SkeletonTokenInfo } from '@/components/common/Skeleton/TokenInfo/SkeletonTokenInfo'
import { getTokenList } from '@/services/api'
import { TokenSummary } from '@/components/ai/TokenSummary'
import { BotMessage } from '@/components/common'
import { CHAIN_X } from '@/constant/chain'

const parameters = z.object({
  symbol: z
    .string()
    .describe('Token symbol. Example: bitcoin, eth, sol, apt, ...'),
})

export const createSmartMoneyAnalystTool = (
  aiState: MutableAIState<AIState>,
): RenderTool => {
  return {
    description:
      'Show information of token and provide smart money data analyst of token',
    parameters,
    generate: async function* ({ symbol }: z.infer<typeof parameters>) {
      yield <SkeletonTokenInfo />

      const toolCallId = nanoid()
      try {
        const resp = await getTokenList({
          chain: CHAIN_X,
          symbol_search: symbol,
        })

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
                  toolName: 'smart-money-analyst',
                  toolCallId,
                  args: { symbol },
                },
              ],
            },
            {
              id: nanoid(),
              role: 'tool',
              content: [
                {
                  type: 'tool-result',
                  toolName: 'smart-money-analyst',
                  toolCallId,
                  result: `[UI "smart money analyst" of token ${symbol}]`,
                },
              ],
            },
          ],
        })

        return <TokenSummary tokens={resp.data.tokens} symbol={symbol} />
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
                  toolName: 'smart-money-analyst',
                  toolCallId,
                  args: { symbol },
                },
              ],
            },
            {
              id: nanoid(),
              role: 'tool',
              content: [
                {
                  type: 'tool-result',
                  toolName: 'smart-money-analyst',
                  toolCallId,
                  result: `[UI "smart money analyst" of token ${symbol}]`,
                },
              ],
            },
          ],
        })

        return <BotMessage content={`I can't find information of ${symbol}`} />
      }
    },
  }
}
