'use client'

import { PaginationTable } from '@/components/common/Pagination/PaginationTable'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import SkeletonDefault from '@/components/common/Skeleton/SkeletonDefault'

import { SelectMovement } from '@/components/common/Select/SelectMovements'
import { TokenList } from '@/types/tokenList'
import { parseAsInteger, useQueryState } from 'nuqs'
import { CHAIN } from '@/constant/chain'

import { useGetSpotlight } from '@/query/leaderboard/getSpotlight'
import { IconStar } from '@/components/shared/icons/activity/icon-star'
import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'
import { CardSpotlight } from './card-spotlight'

export const SpotlightByAI = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const [listTokenSpotlight, setListTokenSpotlight] = useState<TokenList[]>([])
  const [start, setStart] = useState(0)
  const [, setPageSpotlight] = useQueryState(
    'start_spotlight',
    parseAsInteger
      .withDefault(parseInt(searchParams?.start_spotlight?.toString() || '1'))
      .withOptions({
        history: 'push',
        shallow: false,
      }),
  )
  const limit = 5

  const dataSpotlightQuery = useQuery(
    useGetSpotlight({
      chain: searchParams?.chain?.toString() || CHAIN,
      start: parseInt(searchParams?.start_spotlight?.toString() || '1'),
      limit: parseInt(searchParams?.limit_spotlight?.toString() || '5'),
    }),
  )

  const dataSpotlight = dataSpotlightQuery.isFetching
    ? [...(Array(limit).keys() as any)]
    : dataSpotlightQuery?.data?.spot_light.slice(start, limit + start) || []

  const total = dataSpotlightQuery?.data?.total || 0

  const handleChangePage = (page: number) => {
    if (page < total / limit + 1) {
      setStart((page - 1) * limit)
      setPageSpotlight(page)
    }
  }

  return (
    <div className="my-2 flex flex-col gap-4 rounded-[20px] border border-white/10 bg-black/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-core bg-[#182317] p-2">
            <IconStar />
          </div>
          Activity Spotlight by AI
        </div>
        <div className="flex items-center gap-2">
          <ButtonChooseToken
            listToken={listTokenSpotlight}
            setListToken={setListTokenSpotlight}
          />
          <SelectMovement
            text="All Action"
            movement=""
            setMovement={() => {}}
          />
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex h-full justify-between gap-4">
          {dataSpotlight.map((item, i) => {
            return dataSpotlightQuery.isFetching ? (
              <div
                key={i}
                className="h-[156px] w-[345px] overflow-hidden rounded-[20px]"
              >
                <SkeletonDefault />
              </div>
            ) : (
              <CardSpotlight item={item} key={i} />
            )
          })}
        </div>
        {dataSpotlightQuery.isFetching ? null : (
          <PaginationTable
            currentPage={
              searchParams?.start_spotlight
                ? +searchParams.start_spotlight?.toString()
                : 1
            }
            className="mt-4"
            pageSize={
              searchParams?.limit_spotlight
                ? +searchParams?.limit_spotlight?.toString()
                : 10
            }
            total={total}
            setPage={handleChangePage}
          />
        )}
      </div>
    </div>
  )
}
