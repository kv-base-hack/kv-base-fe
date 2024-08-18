'use client'

import { ReactNode, useState } from 'react'
import { CardCommon } from '../common/Card/CardCommon'
import { TitleCard } from '../common/Card/TitleCard'
import { IconRanking } from '../shared/icons/leaderboard/IconRanking'
import { IconActivity } from '../shared/icons/leaderboard/IconActivity'
import { IconInfo } from '../shared/icons/leaderboard/IconInfo'
import { IconBag } from '../shared/icons/leaderboard/IconBag'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useGetTotalEarning } from '@/query/leaderboard/getTotalEarning'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { nFormatter } from '@/utils/nFormatter'
import Skeleton from '../common/Skeleton'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useSMNewListingBuyQuery } from '@/query/leaderboard/getSMNewListingBuy'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import Link from 'next/link'
import { ImageToken } from '../common/Image/ImageToken'
import { CardInfo } from './CardInfoToken'
import { TooltipCustom } from '../common/Tooltip'
import { divide } from 'lodash'
import { TooltipTokenInfo } from '../common/Tooltip/TooltipTokenInfo'

export const SMMoneyOverview = ({ className }: { className?: string }) => {
  const [filterDate, setFilterDate] = useState<string>('24h')
  const CHAIN = useAtomValue(chainAtom)

  // total earning
  const totalEarningQuery = useQuery(useGetTotalEarning({ chain: CHAIN }))
  const totalEarning = totalEarningQuery.data?.overview?.total_pnl_3d || 0

  // smart money holding
  const findGemsTrendingQuery = useQuery(
    useFindGemsSmartMoneyHoldingQuery({
      limit: 5,
      start: 1,
      chain: CHAIN,
      sort_by: '',
      duration: '24h',
    }),
  )
  const dataFindGemsTrending = findGemsTrendingQuery.isFetching
    ? [...(Array(5).keys() as any)]
    : findGemsTrendingQuery.data?.smart_money_holding || []

  // smart money new listing buy
  const smNewListingBuyQuery = useQuery(
    useSMNewListingBuyQuery({
      limit: 5,
      start: 1,
      chain: CHAIN,
      duration: '24h',
      sort_by: '',
    }),
  )
  const dataSMNewListingBuy = smNewListingBuyQuery.isFetching
    ? [...(Array(5).keys() as any)]
    : smNewListingBuyQuery.data?.smart_money_new_listing_buy || []

  return (
    <CardCommon className={className}>
      <TitleCard
        iconFirst={<IconRanking />}
        title="Smart Money Overview"
      ></TitleCard>
      <div className="flex flex-col items-center gap-3 xl:flex-row">
        <CardContent
          title="3D Total Earning"
          content="Total earnings of the top 500 Smartmoney in the last 3 days."
          className="bg-[#B5E4CA]/30"
        >
          {totalEarningQuery.isFetching ? (
            <div className="h-12 w-[200px] overflow-hidden rounded-full">
              <Skeleton />
            </div>
          ) : (
            <p
              className={cn(
                'text-[48px] font-semibold leading-[48px]',
                totalEarning > 0
                  ? 'text-semantic-success-1'
                  : 'text-semantic-error-1',
              )}
            >
              ${nFormatter(totalEarning)}
            </p>
          )}
        </CardContent>
        <CardContent
          title="Top Token Holding by Value"
          content="Top 5 tokens held by Smartmoney ranked by Value Buy in the last 1 day."
          className="bg-[#b1e5fc40]"
        >
          <div className="flex items-center gap-1">
            {dataFindGemsTrending?.length > 0 ? (
              dataFindGemsTrending.map((token, index) => {
                return (
                  <div key={index}>
                    {findGemsTrendingQuery.isFetching ? (
                      <div className="h-11 w-11 overflow-hidden rounded-full">
                        <Skeleton />
                      </div>
                    ) : (
                      <TooltipTokenInfo
                        token={token}
                        chain={CHAIN}
                        className="h-11 w-11"
                        isSymbol={false}
                      />
                    )}
                  </div>
                )
              })
            ) : (
              <div className="h-[50.5px] text-lg text-neutral-07">
                No result
              </div>
            )}
          </div>
        </CardContent>
        <CardContent
          title="Top New Token Holding"
          content="Top 5 newly launched tokens bought by Smartmoney ranked by Value Buy in the last 1 day."
          className="bg-[#F0ECFD]"
        >
          <div className="flex items-center gap-1">
            {dataSMNewListingBuy.length > 0 ? (
              dataSMNewListingBuy.map((token, index) => {
                return (
                  <div key={index}>
                    {smNewListingBuyQuery.isFetching ? (
                      <div className="h-11 w-11 overflow-hidden rounded-full">
                        <Skeleton />
                      </div>
                    ) : (
                      <TooltipTokenInfo
                        token={token}
                        chain={CHAIN}
                        className="h-11 w-11"
                        isSymbol={false}
                      />
                    )}
                  </div>
                )
              })
            ) : (
              <div className="h-[50.5px] text-lg text-neutral-07">
                No result
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </CardCommon>
  )
}

const CardContent = ({
  content,
  title,
  img,
  children,
  className,
}: {
  content: string
  title: string
  img?: ReactNode
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn('w-full rounded-xl p-4', className)}>
      <div className="flex flex-col gap-4 p-4">
        {img ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-07 p-3">
            {img}
          </div>
        ) : null}
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold text-neutral-05">{title}</p>
            <TooltipCustom content={content}>
              <IconInfo />
            </TooltipCustom>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
