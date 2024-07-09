import { z } from 'zod'
import { CreateToolFunction } from './types'
import { SkeletonMessageSmartMoney } from '@/components/common/Skeleton/SkeletonMessageSmartMoney'
import { nanoid } from '@/lib/utils'
import { BotMessage } from '@/components/common'

const parameters = z.object({
  address: z.string().describe('Wallet address'),
})

export const createAnalyzeWalletTool: CreateToolFunction = (aiState) => {
  return {
    description: `Analyze wallet`,
    parameters,
    generate: async function* ({ address }: z.infer<typeof parameters>) {
      yield (
        <div className="mt-4 px-6">
          <SkeletonMessageSmartMoney />
        </div>
      )

      // TODO: Call API to get wallet analysis
      // Trade Activity of this wallet
      // Assets holding of this wallet
      // Trades Statistics of this wallet

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
                toolName: 'wallet-analyze',
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
                toolName: 'wallet-analyze',
                toolCallId,
                result: { address },
              },
            ],
          },
        ],
      })

      return (
        <>
          <div>Card Wallet</div>
          <div>Phân tích</div>
        </>
      )
    },
  }
}
