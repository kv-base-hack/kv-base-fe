'use client'

import { CardCommon } from '../common/Card/CardCommon'
import { TitleCard } from '../common/Card/TitleCard'
import { LinkCustom } from '../common/Link'
import Skeleton from '../common/Skeleton'
import { IconFire } from '../shared/icons/leaderboard/IconFire'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { PaginationTable } from '../common/Pagination/PaginationTable'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'
import { useGetSpotlight } from '@/query/leaderboard/getSpotlight'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { useQuery } from '@tanstack/react-query'
import { IconLink } from '../shared/icons/IconLink'
import { ContentSpotlight } from './ContentSpotlight'
import { usePathname } from 'next/navigation'

export const ActivitySpotlight = ({ limit }: { limit: number }) => {
  const [start, setStart] = useState(0)
  const [page, setPage] = useState(1)
  const CHAIN = useAtomValue(chainAtom)

  const pathName = usePathname()

  const dataSpotlightQuery = useQuery(
    useGetSpotlight({
      chain: CHAIN,
      start: page,
      limit,
    }),
  )

  const dataSpotlight = dataSpotlightQuery.isFetching
    ? [...(Array(limit).keys() as any)]
    : dataSpotlightQuery?.data?.spot_light.slice(start, limit + start) || []

  const total = dataSpotlightQuery?.data?.total || 0

  const handleChangePage = (page: number) => {
    if (page < total / limit + 1) {
      setStart((page - 1) * limit)
      setPage(page)
    }
  }

  return (
    <CardCommon>
      <TitleCard title="Activity Spotlight by AI" iconFirst={<IconFire />}>
        {pathName.includes('/tracking') ? (
          ''
        ) : (
          <LinkCustom url="/tracking" title="See all" />
        )}
      </TitleCard>
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-full justify-between gap-4">
          {dataSpotlight.map((item, i) => {
            return dataSpotlightQuery.isFetching ? (
              <div
                key={i}
                className="h-[156px] w-[345px] overflow-hidden rounded-[20px]"
              >
                <Skeleton />
              </div>
            ) : (
              <Card item={item} key={i} />
            )
          })}
        </div>
        {dataSpotlightQuery.isFetching ? null : (
          <PaginationTable
            currentPage={page}
            className="mt-4"
            pageSize={limit}
            total={total}
            setPage={handleChangePage}
          />
        )}
      </div>
    </CardCommon>
  )
}

const Card = ({
  loading,
  item,
  className,
}: {
  loading?: boolean
  item: any
  className?: string
}) => {
  return (
    <div
      className={cn(
        'flex min-h-[150px] w-full flex-col gap-2 rounded-[20px] p-4',
        item.action === 'buying' || item.action === 'withdraw'
          ? 'bg-[#E1F1FF]'
          : item.action === 'selling' || item.action === 'deposit'
            ? 'bg-[#FFF1E1]'
            : item.action === 'new_listing_buy'
              ? 'bg-[#F4E7FC]'
              : item.action === 'unusual_buy'
                ? 'bg-[#E1FFEF]'
                : 'bg-[#E1F1FF]',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-xl" />
          ) : (
            <div
              className={cn(
                'rounded-xl p-2',
                item.action === 'buying' || item.action === 'withdraw'
                  ? 'bg-[#0C68E9]'
                  : item.action === 'selling' || item.action === 'deposit'
                    ? 'bg-[#FBA94B]'
                    : item.action === 'new_listing_buy'
                      ? 'bg-[#B981DA]'
                      : item.action === 'unusual_buy'
                        ? 'bg-[#32AE60]'
                        : 'bg-[#0C68E9]',
              )}
            >
              {renderMovementIcon(item.action, 'w-6 h-6', '#FCFCFC')}
            </div>
          )}
          <div className={loading ? 'flex flex-col gap-2' : ''}>
            <div className="flex items-center gap-2">
              {loading ? (
                <Skeleton className="h-[14px] w-[140px] rounded-lg" />
              ) : (
                <div className="text-base font-semibold text-neutral-07">
                  {renderMovementName(item.action)}
                </div>
              )}
            </div>
            <div>
              {loading ? (
                <Skeleton className="h-[14px] w-[140px] rounded-lg" />
              ) : (
                <p className="text-medium text-xs text-neutral-04">
                  {moment(item.block_timestamp).fromNow()}
                </p>
              )}
            </div>
          </div>
        </div>

        <a href={item.scan_link} target="_blank">
          <IconLink />
        </a>
      </div>

      <div className="text-[15px] font-normal leading-6 text-neutral-07">
        <ContentSpotlight item={item} />
      </div>
    </div>
  )
}
