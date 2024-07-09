/* eslint-disable @next/next/no-img-element */
'use client'

import { TokenList } from '@/types/tokenList'
import React from 'react'
import { BotMessage } from '../../common'
import { TokenItem } from '../../common/Search/TokenItem'
import { runAnalysis } from './action'
import { StreamableValue, useActions, useUIState } from 'ai/rsc'
import { AI } from '@/app/kaichat/action'
import { TokenInfo } from '@/components/common/Message/TokenInfo'
import { SkeletonText } from '@/components/common/Skeleton/SkeletonText'
import { useTokenInfoQuery } from '@/query/token-explorer/getTokenInfo'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { LogoChat } from '@/components/shared/icons/LogoChat'

interface TokenListProps {
  symbol: string
  tokens: TokenList[]
}

export const TokenSummary: React.FC<TokenListProps> = ({ symbol, tokens }) => {
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [selectedToken, setSelectedToken] = React.useState<TokenList | null>(
    null,
  )
  const [analysis, setAnalysis] = React.useState<StreamableValue | null>(null)
  const CHAIN = useAtomValue(chainAtom)

  const smTokenSummaryQuery = useTokenInfoQuery({
    chain: selectedToken!?.chainId,
    address: selectedToken!?.tokenAddress,
  })

  const smTokenSummary = smTokenSummaryQuery.data?.data?.info

  if (!tokens.length) {
    return <BotMessage content={`No token found with symbol ${symbol}`} />
  }

  const onClickToken = async (token: TokenList) => {
    setAnalysis(null)
    setSelectedToken(token)
    const x = await runAnalysis(token.symbol, token.tokenAddress, CHAIN)
    setAnalysis(x)
  }

  const onSmartMoneyTransactionsClick = async (
    symbol: string,
    address: string = '',
  ) => {
    const response = await submitUserMessage(
      `Smart Money Transactions of token:
      - Symbol: ${symbol}
      - Address: ${address}`,
    )
    setMessages((prev) => [...prev, response])
  }

  const onTopSmartMoneyTradingClick = async (
    symbol: string,
    address: string = '',
  ) => {
    const response = await submitUserMessage(
      `Top Smart Money trading:
      - Symbol: ${symbol}
      - Address: ${address}`,
    )
    setMessages((prev) => [...prev, response])
  }

  const onActivityTopSmartMoneyTradingClick = async (
    symbol: string,
    address: string = '',
  ) => {
    const response = await submitUserMessage(
      `Activity of Top Smart Money trading:
      - Symbol: ${symbol}
      - Address: ${address}`,
    )
    setMessages((prev) => [...prev, response])
  }

  return (
    <div className="py-6">
      <h2 className="text-neutral-07 font-semibold text-base">
        Please choose token you want to Analyze
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-2 mt-4 w-[80%] xl:w-[100%]">
        {tokens.map((token, index: number) => (
          <TokenItem
            key={index}
            token={token}
            onClick={() => onClickToken(token)}
          />
        ))}
      </div>
      {selectedToken ? (
        <div className="flex items-start gap-4 mt-8">
          <LogoChat className="w-8 h-8 shrink-0" />
          <div className="w-full">
            <TokenInfo
              imgUrl={selectedToken.imageUrl}
              name={selectedToken.name}
              symbol={selectedToken.symbol}
              usdPrice={selectedToken.usdPrice}
              price_24h={selectedToken.price_24h}
              volume_buy={smTokenSummary?.buy_volume || 0}
              volume_sell={smTokenSummary?.sell_volume || 0}
              avg_entry={smTokenSummary?.avg_price_smart_money || 0}
              number_sm_hold={smTokenSummary?.number_of_smart_money_hold || 0}
              unusual_buy={smTokenSummary?.number_of_unusual_buy}
              loading={smTokenSummaryQuery.isFetching}
              address={selectedToken.tokenAddress}
            />
            <div>
              {analysis ? (
                <BotMessage content={analysis} isLogo={false} />
              ) : (
                <SkeletonText />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
