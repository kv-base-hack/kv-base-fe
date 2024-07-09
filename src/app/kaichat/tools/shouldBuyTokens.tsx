import { CreateToolFunction } from './types'
import { z } from 'zod'
import { nanoid } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ShouldBuyTokens } from '@/components/ai/ShouldBuyTokens'

const parameters = z.object({
  chain: z.string().describe('Chain. Example: ethereum, base, ...'),
})

export const createShouldBuyTokensTool: CreateToolFunction = (aiState) => {
  return {
    description: `Should buy tokens`,
    parameters,
    generate: async function* ({ chain }: z.infer<typeof parameters>) {
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
                toolName: 'should-buy-tokens',
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
                toolName: 'should-buy-tokens',
                toolCallId,
                result: {},
              },
            ],
          },
        ],
      })

      return <ShouldBuyTokens />
    },
  }
}
