'use client'


import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import SkeletonDefault from '@/components/common/Skeleton/SkeletonDefault'

import Link from 'next/link'
import { useGetSpotlight } from '@/query/leaderboard/getSpotlight'
import { IconStar } from '@/components/shared/icons/activity/icon-star'
import { CardSpotlight } from '../../activity/card-spotlight'
import { CHAIN } from '@/constant/chain'

export const LastestSpotlight = () => {
  const [start] = useState(0)
  const limit = 2

  const dataSpotlightQuery = useSuspenseQuery(
    useGetSpotlight({
      chain: CHAIN,
      start: 1,
      limit,
    }),
  )

  const dataSpotlight =
    dataSpotlightQuery?.data?.spot_light.slice(start, limit + start) || []

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-[20px] border border-white/10 bg-black/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-core p-2">
            <IconStar />
          </div>
          Lastest Activity Spotlight by AI
        </div>
        <Link
          href="/activity"
          className="text-sm font-medium text-core underline"
        >
          See All Activity
        </Link>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-full flex-col justify-between gap-4 lg:flex-row">
          <Suspense
            fallback={[...(Array(limit).keys() as any)].map((_, i) => (
              <div
                key={i}
                className="h-[156px] w-[345px] overflow-hidden rounded-[20px]"
              >
                <SkeletonDefault />
              </div>
            ))}
          >
            {dataSpotlight?.map((item, i) => {
              return <CardSpotlight item={item} key={i} />
            })}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
