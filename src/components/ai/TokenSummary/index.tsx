/* eslint-disable @next/next/no-img-element */
'use client'

import { TokenList } from '@/types/tokenList'
import React, { useEffect, useState } from 'react'
import { BotMessage } from '../../common'
import { TokenItem } from '../../common/Search/TokenItem'
import { runAnalysis } from './action'
import {
  StreamableValue,
  readStreamableValue,
  useActions,
  useUIState,
} from 'ai/rsc'
import { AI } from '@/app/kaichat/action'
import { TokenInfo } from '@/components/common/Message/TokenInfo'
import { useGetSmartMoneyTokenSummaryQuery } from '@/query/getSmartMoneyTokenSummary'
import { SkeletonText } from '@/components/common/Skeleton/SkeletonText'
import { CHAIN_X } from '@/constant/chain'

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

  const smTokenSummaryQuery = useGetSmartMoneyTokenSummaryQuery(
    selectedToken!?.chainId,
    selectedToken!?.tokenAddress,
  )

  const smTokenSummary = smTokenSummaryQuery.data?.data?.summary

  if (!tokens.length) {
    return <BotMessage content={`No token found with symbol ${symbol}`} />
  }

  const onClickToken = async (token: TokenList) => {
    setAnalysis(null)
    setSelectedToken(token)
    const x = await runAnalysis(token.symbol, token.tokenAddress, CHAIN_X)
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
    <>
      <h2 className="text-neutral-100 font-semibold text-base">
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
        <div>
          <TokenInfo
            imgUrl={selectedToken.imageUrl}
            name={selectedToken.name}
            symbol={selectedToken.symbol}
            usdPrice={selectedToken.usdPrice}
            price_24h={selectedToken.price_24h}
            value_buy={0}
            avg_entry={smTokenSummary?.avg_entry_price}
            number_sm_hold={smTokenSummary?.number_of_smart_money_hold}
            realized={smTokenSummary?.realized_percent}
            loading={smTokenSummaryQuery.isFetching}
            address={selectedToken.tokenAddress}
          />
          <div>
            {analysis ? <BotMessage content={analysis} /> : <SkeletonText />}
          </div>

          <div className="suggestion-question mt-8 flex flex-col gap-2 items-start">
            <h2 className="text-[#FFBC99] text-xl font-normal">
              Suggest question
            </h2>
            <button
              onClick={() =>
                onSmartMoneyTransactionsClick(
                  selectedToken.symbol,
                  selectedToken.tokenAddress,
                )
              }
              className="btn_suggest_question"
            >
              <p>Smart Money Transactions of</p>
              <img
                src={selectedToken.imageUrl}
                alt={selectedToken.name}
                className="w-6 h-6 rounded-full ml-2"
              />
              <p className="text-sm text-neutral-02">{selectedToken.symbol}</p>
            </button>
            <button
              onClick={() =>
                onTopSmartMoneyTradingClick(
                  selectedToken.symbol,
                  selectedToken.tokenAddress,
                )
              }
              className="btn_suggest_question"
            >
              Top Smart Money trading
              <img
                src={selectedToken.imageUrl}
                alt={selectedToken.name}
                className="w-6 h-6 rounded-full ml-2"
              />
              <p className="text-sm text-neutral-02">{selectedToken.symbol}</p>
            </button>
            <button
              onClick={() =>
                onActivityTopSmartMoneyTradingClick(
                  selectedToken.symbol,
                  selectedToken.tokenAddress,
                )
              }
              className="btn_suggest_question"
            >
              Activity of Top Smart Money trading
              <img
                src={selectedToken.imageUrl}
                alt={selectedToken.name}
                className="w-6 h-6 rounded-full ml-2"
              />
              <p className="text-sm text-neutral-02">{selectedToken.symbol}</p>
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
