import { chainAtom } from '@/atom/chain'
import { cn } from '@/lib/utils'
import { useTrendingTokenQuery } from '@/query/wallet-explorer/getTrendingToken'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { ImageToken } from '../Image/ImageToken'
import { useRef } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
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
  const CHAIN = useAtomValue(chainAtom)

  const trendingTokenQuery = useTrendingTokenQuery({
    chain: CHAIN,
    search: '',
    limit: 10,
  })
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
    <div className="mt-2 flex items-stretch justify-between gap-0 whitespace-nowrap pr-4 text-base leading-6 max-md:max-w-full max-md:flex-wrap">
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
          {trendingTokenQuery.data?.data?.trending_tokens?.map(
            (token, index: number) => {
              const tokenFormat = {
                image_url: token.small,
                symbol: token.symbol,
                current_price: token.price,
                price_percent_change_24h: token.price_change_percentage_24h,
                avg_price: 0,
                hold_in_usdt: 0,
                roi: 0,
                realized_percent: 0,
                number_of_smart_money_hold: 0,
                number_of_smart_money: 0,
                percent: 0,
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
                            token.priceChangeH24 > 0
                              ? 'text-[#16FFAB]'
                              : 'text-red',
                          )}
                        >
                          {token.priceChangeH24 > 0 ? '+' : null}
                          {token.priceChangeH24.toFixed(2)}%
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
    </div>
  )
}
