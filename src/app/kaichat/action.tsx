import { BotMessage } from '@/components/common'
import { DotLoading } from '@/components/shared/icons/Loading/DotLoading'
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from 'ai/rsc'

import { openai } from '@ai-sdk/openai'
import { createSmartMoneyAnalystTool } from './tools/tokenSummary'
import { AIState, UIState } from './tools/types'
import { createSmartMoneyTransactionsTool } from './tools/smartMoneyTransactions'
import { nanoid } from '@/lib/utils'
import { createTopSmartMoneyTradingTool } from './tools/topSmartMoneyTrading'
import { createActivityOfTopSmartMoneyTradingTool } from './tools/activityOfSmartMoney'
import { createTechnicalAnalysisTool } from './tools/technicalAnalysis'
import { createMarketNewsTool } from './tools/marketNews'
import { createAnalyzeWalletTool } from './tools/analyzeWallet'
import { createShouldBuyTokensTool } from './tools/shouldBuyTokens'
import { LogoChat } from '@/components/shared/icons/LogoChat'
import { createSmartMoneyNewListingBuyTool } from './tools/smartMoneyNewListingBuy'
import { createSmartMoneyTopBuysTool } from './tools/smartMoneyTopBuys'
import { createInsiderBuy } from './tools/insiderBuy'

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content,
      },
    ],
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: (
      <div className="flex items-start gap-4 py-8">
        <LogoChat className="h-8 w-8 shrink-0" />
        <div className="flex items-start">
          <DotLoading />
        </div>
      </div>
    ),
    system: `\
    You are a crypto trading assistant. Your goal is to help users understand the market and make informed decisions by providing them with relevant information and analysis. You can engage in discussions with users about crypto market trends, news, and strategies to facilitate better decision-making within the UI.
    When a user sends a message, analyze the content to determine which function to call based on the following guidelines:
    1. If the user asks for information or smart money analysis of a specific token, call the \`smart_money_analyst\` function to display the token information and provide a smart money data analysis.
    2. If the user requests market news or insights, call the \`market_news\` function to show a summary of the latest news and insights.
    3. If the user seeks technical analysis of a particular token, call the \`technical_analysis\` function to present the technical analysis for that token.
    4. If the user inquires about Smart Traders transactions for a token, call the \`smart_money_transactions\` function to display the "Smart Traders Transactions" UI for the specified token.
    5. If the user asks about top Smart Traders trading for a token, call the \`top_smart_money_trading\` function to show the "Top Smart Traders Trading" UI for the given token.
    6. If the user requests information on the activity of top Smart Traders trading for a token, call the \`activity_of_top_smart_money_trading\` function to present the "Activity of Top Smart Traders Trading" UI for the token in question.
    7. If the user requests analyze wallet by address, call the \`analyze_wallet\` function to show the analysis of the wallet.
    8. If the user requests about what tokens they should buy, call the \`should_buy_tokens\` function to provide a list of tokens that they should consider buying.
    9. If the user inquires about Smart Traders New Listing Buy, call the \`smart_money_new_listing_buy\` function to display the "Smart Traders New Listing Buy" UI for the specified token on chain.
    10. If the user inquires about Smart Traders Top Buys, call the \`smart_money_top_buys\` function to display the "Smart Traders Top Buys" UI for the specified token on chain.
    11. If the user inquires about Insider Buy, call the \`insider_buy\` function to display the "Insider Buy" UI for the specified token on chain.

    In the UI, messages enclosed in square brackets [] indicate a UI element or a user event. For example:
    - "[Information of SOL]" signifies that the SOL token information interface is being shown to the user.
    - "[Technical analysis of $WIF]" means that the technical analysis interface for the WIF token is displayed in the UI.

    If the user attempts to perform a task that is not possible or beyond the scope of your capabilities, politely inform them that you are unable to fulfill that request.
    In addition to the specific functions mentioned above, you can engage in general conversation with users and perform calculations when necessary to assist them further.
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => {
        return {
          role: message.role,
          content: message.content,
          name: message.name,
        }
      }),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content,
            },
          ],
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      smartMoneyAnalyst: createSmartMoneyAnalystTool(aiState),
      marketNews: createMarketNewsTool(aiState),
      technicalAnalysis: createTechnicalAnalysisTool(aiState),
      smartMoneyTransactions: createSmartMoneyTransactionsTool(aiState),
      topSmartMoneyTrading: createTopSmartMoneyTradingTool(aiState),
      activityOfSmartMoneyTrading:
        createActivityOfTopSmartMoneyTradingTool(aiState),
      walletAnalyze: createAnalyzeWalletTool(aiState),
      shouldBuyTokens: createShouldBuyTokensTool(aiState),
      smartMoneyNewListingBuy: createSmartMoneyNewListingBuyTool(aiState),
      smartMoneyTopBuys: createSmartMoneyTopBuysTool(aiState),
      insiderBuy: createInsiderBuy(aiState),
    },
  })

  return {
    id: nanoid(),
    display: result.value,
  }
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
})
