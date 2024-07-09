'use client'

import { AI } from '@/app/kaichat/action'
import { chainAtom } from '@/atom/chain'
import { UserMessage } from '@/components/common'
import { IconArrow } from '@/components/shared/icons/IconArrow'
import { LogoChat } from '@/components/shared/icons/LogoChat'
import { Button } from '@/components/ui/button'
import { useActions, useUIState } from 'ai/rsc'
import { useAtomValue } from 'jotai'
import React from 'react'

export const ShouldBuyTokens = () => {
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const CHAIN = useAtomValue(chainAtom)

  const onSmartMoneyNewListingBuyClick = async () => {
    setMessages((prev: any[]) => [
      ...prev,
      {
        id: Date.now(),
        display: (
          <UserMessage>Smart Money New Listing Buy on chain</UserMessage>
        ),
      },
    ])

    const resp = await submitUserMessage(
      `Smart Money New Listing Buy:
      - Chain: ${CHAIN}
      `,
    )
    setMessages((prev) => [...prev, resp])
  }

  const onSmartMoneyTopBuysClick = async () => {
    setMessages((prev: any[]) => [
      ...prev,
      {
        id: Date.now(),
        display: <UserMessage>Smart Money Top Buys</UserMessage>,
      },
    ])
    const resp = await submitUserMessage(
      `Smart Money Top Buys on chain:
      - Chain: ${CHAIN}
      `,
    )
    setMessages((prev) => [...prev, resp])
  }

  const onInsiderBuyClick = async () => {
    setMessages((prev: any[]) => [
      ...prev,
      {
        id: Date.now(),
        display: <UserMessage>Insider Buy</UserMessage>,
      },
    ])
    const resp = await submitUserMessage(
      `Insider Buy on chain:
      - Chain: ${CHAIN}
      `,
    )
    setMessages((prev) => [...prev, resp])
  }

  return (
    <div className="flex items-start gap-4 my-8">
      <LogoChat className="w-8 h-8" />
      <div>
        <h2 className="text-neutral-07 text-[15px] leading-6 font-normal">
          Kaivest suggests that you can refer to the tokens purchased by
          smartmoney within the past 24 hours, below are the categories of
          potential tokens that you can choose:
        </h2>
        <div className="flex items-end justify-between mt-4 gap-4">
          <Button
            variant="link"
            className="h-auto w-full p-3 border-[#EFEFEF] border bg-neutral-01 rounded-[20px] text-sm text-neutral-07 text-[15px] leading-6 flex items-center gap-4 font-bold"
            onClick={() => onSmartMoneyNewListingBuyClick()}
          >
            <div className="line-clamp-2 md:line-clamp-1 text-left w-full">
              Smart money new listing buy
            </div>
            <div className="">
              <IconArrow className="hidden md:block" />
            </div>
          </Button>
          <Button
            variant="link"
            className="h-auto w-full p-3 border-[#EFEFEF] border bg-neutral-01 rounded-[20px] text-sm text-neutral-07 text-[15px] leading-6 flex items-center gap-4 font-bold"
            onClick={() => onSmartMoneyTopBuysClick()}
          >
            <div className="line-clamp-2 md:line-clamp-1 text-left w-full">
              Smart money top buys
            </div>
            <div className="">
              <IconArrow className="hidden md:block" />
            </div>
          </Button>
          <Button
            variant="link"
            className="h-auto w-full p-3 border-[#EFEFEF] border bg-neutral-01 rounded-[20px] text-sm text-neutral-07 text-[15px] leading-6 flex items-center gap-4 font-bold"
            onClick={() => onInsiderBuyClick()}
          >
            <div className="line-clamp-2 md:line-clamp-1 text-left w-full">
              Insider Buy
            </div>
            <div className="">
              <IconArrow className="hidden md:block" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
