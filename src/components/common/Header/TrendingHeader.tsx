import { cn } from '@/lib/utils'
import {
  GET_TRENDING_TOKEN,
  useTrendingTokenQuery,
} from '@/query/wallet-explorer/getTrendingToken'
import Image from 'next/image'
import { ImageToken } from '../Image/ImageToken'
import { useEffect, useRef } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CHAIN } from '@/constant/chain'
import React from 'react'
import { getTrendingToken } from '@/services/api'
import { CardInfoTopToken } from '../Card/CardInfoTopToken'

const renderIconRank = (rank: number) => {
  switch (rank) {
    case 1:
      return <div className="grow">🥇</div>
    case 2:
      return <div className="grow">🥈</div>
    case 3:
      return <div className="grow">🥉</div>
    default:
      return <div className="grow text-white">#{rank}</div>
  }
}

export const TrendingHeader = () => {
  const queryClient = useQueryClient()
  const rerender = React.useState(0)[1]
  const chain = CHAIN
  const search = ''
  const limit = 10

  useEffect(() => {
    ;(async () =>
      await queryClient.prefetchQuery({
        queryKey: [GET_TRENDING_TOKEN, { chain, search, limit }],
        queryFn: async () => {
          const result = await getTrendingToken({
            chain,
            search,
            limit,
          })
          return result.data
        },
      }))()
    setTimeout(() => {
      rerender(1)
    }, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const trendingTokenQuery = useQuery(
    useTrendingTokenQuery({
      chain,
      search,
      limit,
    }),
  )

  const scrollRef: any = useRef(null)

  const handleMouseEnter = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = 'paused'
    }
  }

  const handleMouseLeave = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = 'running'
    }
  }

  return (
    <div className="mt-2 flex items-stretch justify-between gap-0 whitespace-nowrap text-base leading-6 max-md:max-w-full">
      <div className="!z-[10000] h-10 w-4 bg-background"></div>
      <div className="!z-[10000] flex flex-col items-stretch justify-center rounded-s-xl bg-core p-2 font-semibold tracking-normal">
        <div className="flex items-stretch justify-between gap-1">
          <Image
            loading="lazy"
            src="/icons/trending.svg"
            className="aspect-square w-6 object-center"
            width={24}
            height={24}
            alt="icon"
          />
          <div className="grow text-[#09060B]">Trending</div>
        </div>
      </div>
      <div className="!z-[9999] flex flex-1 flex-col items-stretch justify-center rounded-none rounded-e-lg bg-black/50 p-2 tracking-tight max-md:max-w-full">
        <div
          id="scroll-text"
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex w-max items-stretch gap-5"
        >
          {trendingTokenQuery?.data?.trending_tokens?.map(
            (token, index: number) => {
              const tokenFormat = {
                image_url: token.small,
                symbol: token.symbol,
                current_price: token.price,
                price_percent_change_24h: token.price_change_percentage_24h,
                avg_price: 0,
                hold_in_usdt: token.hold_in_usdt,
                roi: 0,
                realized_percent: token.realized_percent,
                number_of_smart_money_hold: token.number_of_smart_money_hold,
                number_of_smart_money: 0,
                percent: 0,
                score: token.score,
                total_profit: token.total_profit,
              }
              return (
                <div key={index}>
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${token?.address}`}
                  >
                    <div className="flex cursor-pointer items-stretch gap-0.5">
                      {renderIconRank(index + 1)}
                      <div className="flex items-stretch justify-between gap-1 text-white">
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-1">
                                <ImageToken
                                  imgUrl={token.small}
                                  className="my-auto aspect-square w-4 items-center justify-center object-center"
                                  symbol={token.symbol}
                                />
                                <div className="grow">{token.symbol}</div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              className="z-[9999] !border-none !p-0"
                              side="bottom"
                            >
                              <CardInfoTopToken
                                view="token"
                                type="hold"
                                token={tokenFormat}
                              />
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div
                          className={cn(
                            token.price_change_percentage_24h > 0
                              ? 'text-[#16FFAB]'
                              : 'text-red',
                          )}
                        >
                          {token.price_change_percentage_24h > 0 ? '+' : null}
                          {token.price_change_percentage_24h?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            },
          )}
        </div>
      </div>
      <div className="!z-[10000] h-10 w-4 bg-background"></div>
    </div>
  )
}
