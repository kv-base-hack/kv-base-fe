'use client'

import { ImageToken } from '@/components/common/Image/ImageToken'
import SkeletonDefault from '@/components/common/Skeleton/SkeletonDefault'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ReactNode, Suspense, useState } from 'react'
import { TooltipCustom } from '@/components/common/Tooltip'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'

import { cn } from '@/lib/utils'

import { useGetTotalScore } from '@/query/total-score/getTotalScore'
import { CHAIN } from '@/constant/chain'
import { CardInfoTopToken } from '@/components/common/Card/CardInfoTopToken'
import CircularChartScore from './chart/circular-chart-score'
import { PieChartActive } from './chart/pie-chart-active'
import { TopPerformingTokens } from './top-performing'
import Image from 'next/image'

export const SmartMoneyOverview = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const [duration] = useState('24h')

  // top holding tokens
  const topTokenHoldingQuery = useSuspenseQuery(
    useFindGemsSmartMoneyHoldingQuery({
      limit: 5,
      start: 1,
      chain: CHAIN,
      sort_by: 'hold_in_usdt',
      duration: duration,
    }),
  )
  const dataTopHolding = topTokenHoldingQuery.data?.smart_money_holding || []

  const totalScoreQuery = useSuspenseQuery(useGetTotalScore({ chain: CHAIN }))

  const totalScore = totalScoreQuery.data?.total_score || 0
  const onchainScore = totalScoreQuery.data?.onchain_score || 0
  const technicalScore = totalScoreQuery.data?.technical_score || 0
  //

  return (
    <div className="mx-4 mt-4 flex flex-col gap-2 lg:flex-row">
      <div className="flex w-full flex-col gap-2 lg:w-1/2 lg:flex-row">
        {/* BASE Analysic */}
        <div className="w-full lg:w-1/2">
          <CardContent
            title={
              <div className="flex h-9 items-center gap-2">
                <Image
                  loading="lazy"
                  src="/assets/icons/chain/base.svg"
                  alt="base"
                  width={24}
                  height={24}
                />
                <div>BASE Analysis by AI</div>
              </div>
            }
            content="Total earnings of the top 500 Smart Traders in the last 3 days."
          >
            <div className="flex items-center gap-5">
              <div className="">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-core"></div>
                  <div className="text-xs leading-7 text-light-telegray">
                    Technical Rating
                  </div>
                </div>
                <div className="text-[28px] text-[#00FCED]">Bullish</div>
              </div>
              <div className="">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-purple"></div>
                  <div className="text-xs leading-7 text-light-telegray">
                    Onchain Rating
                  </div>
                </div>
                <div className="text-[28px] text-[#EE007B]">Bearish</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <CircularChartScore
                size={268}
                dotSize={12}
                numberOfDots={50}
                totalScore={totalScore}
                technicalScore={technicalScore}
                onchainScore={onchainScore}
              />
            </div>
          </CardContent>
        </div>
         {/* Top Holding */}
        <div className="w-full lg:w-1/2">
          <Suspense fallback={<div>loading...</div>}>
            <CardContent title="Top Holding Tokens">
              <div className="flex items-center gap-1">
                {dataTopHolding.map((token, index) => {
                  return (
                    <div key={index}>
                      {topTokenHoldingQuery.isFetching ? (
                        <div className="h-11 w-11 overflow-hidden rounded-full">
                          <SkeletonDefault />
                        </div>
                      ) : (
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger>
                              <Link
                                key={index}
                                href={`/smartmoney-onchain/token-explorer/${token?.address}`}
                              >
                                <ImageToken
                                  imgUrl={token?.image_url}
                                  symbol={token.symbol}
                                  className="h-11 w-11"
                                />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              className="w-[200px] !border-none !p-0"
                              side="bottom"
                            >
                              <CardInfoTopToken
                                view="token"
                                type="buy"
                                token={token}
                              />
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  )
                })}
              </div>
              <PieChartActive
                title="Total Hold Volume"
                type="hold"
                data={dataTopHolding}
                loading={topTokenHoldingQuery.isFetching}
              />
            </CardContent>
          </Suspense>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <TopPerformingTokens searchParams={searchParams} />
      </div>
    </div>
  )
}

const CardContent = ({
  icon,
  title,
  img,
  children,
  className,
  content,
  duration,
}: {
  icon?: ReactNode
  title: ReactNode | string
  img?: ReactNode
  children: ReactNode
  className?: string
  content?: string
  duration?: ReactNode
}) => {
  return (
    <div
      className={cn(
        'h-full w-full rounded-2xl border border-solid border-white/10 bg-black bg-opacity-50 px-6 pb-8 pt-6 shadow-2xl',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-1">
          <div className="text-base font-medium text-neutral-100 md:text-sm xl:text-base">
            {title}
          </div>
          {content ? (
            <TooltipCustom
              content={content}
              className="max-w-[210px] rounded border border-white/10 bg-neutral-06 font-inter text-xs font-semibold text-neutral-02"
            >
              <InfoIcon className="h-4 w-4 md:w-5 lg:w-5" />
            </TooltipCustom>
          ) : null}
          {duration ? duration : null}
        </div>
        {children}
      </div>
    </div>
  )
}
