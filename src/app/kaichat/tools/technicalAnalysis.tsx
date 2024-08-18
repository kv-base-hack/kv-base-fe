import { z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'

import { getTechnicalAnalysis } from '@/components/ai/TechnicalAnalysis/api'
import { TechnicalAnalysis } from '@/components/ai/TechnicalAnalysis'
import { getTokenList } from '@/services/api'
import { BotMessage } from '@/components/common'
import { nanoid } from '@/lib/utils'
import { CHAIN } from '@/constant/chain'
import { Button } from '@/components/ui/button'

const parameters = z.object({
  symbol: z
    .string()
    .describe('Token symbol. Example: bitcoin, eth, sol, apt, ...'),
  interval: z
    .enum(['1m', '5m', '15m', '30m', '1h', '2h', '4h', '12h', '1d', '1w'])
    .optional()
    .default('4h'),
})

export const createTechnicalAnalysisTool: CreateToolFunction = (aiState) => {
  return {
    description: `Show technical analysis of a token`,
    parameters,
    generate: async function* ({
      symbol,
      interval,
    }: z.infer<typeof parameters>) {
      yield <SkeletonMessageSmartMoney />

      const searchResp = await getTokenList({
        chain: CHAIN,
        symbol_search: symbol,
      })

      const toolCallId = nanoid()

      if (searchResp.data.tokens.length === 0) {
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
                  toolName: 'technical-analysis',
                  toolCallId,
                  args: { symbol, interval },
                },
              ],
            },
            {
              id: nanoid(),
              role: 'tool',
              content: [
                {
                  type: 'tool-result',
                  toolName: 'technical-analysis',
                  toolCallId,
                  result: null,
                },
              ],
            },
          ],
        })
        return (
          <BotMessage
            content={`Sorry, I can't find the token with symbol ${symbol}`}
          />
        )
      }

      try {
        const taResp = await getTechnicalAnalysis(
          searchResp.data.tokens[0].symbol,
          interval,
        )

        console.log('taResp', taResp)

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
                  toolName: 'technical-analysis',
                  toolCallId,
                  args: { symbol, interval },
                },
              ],
            },
            {
              id: nanoid(),
              role: 'tool',
              content: [
                {
                  type: 'tool-result',
                  toolName: 'technical-analysis',
                  toolCallId,
                  result: searchResp,
                },
              ],
            },
          ],
        })

        return <TechnicalAnalysis data={taResp.data} />
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
                  toolName: 'technical-analysis',
                  toolCallId,
                  args: { symbol, interval },
                },
              ],
            },
            {
              id: nanoid(),
              role: 'tool',
              content: [
                {
                  type: 'tool-result',
                  toolName: 'technical-analysis',
                  toolCallId,
                  result: null,
                },
              ],
            },
          ],
        })

        return (
          <>
            <BotMessage
              content={`There is currently no Technical Indicator data about this token, please try other tokens with larger capitalization and liquidity`}
            />
            <Button>Technical analyst of ETH in 1h timeframe</Button>
            <Button>Technical analyst of BTC in 1h timeframe</Button>
          </>
        )
      }
    },
  }
}
