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
import { ImageToken } from '@/components/common/Image/ImageToken'
import Close from '@/components/shared/icons/Close'
import { SelectRank } from '../smart-traders/select/select-ranking'
import { SelectBadge } from '../smart-traders/select/select-badge'

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

  const [token, setToken] = useQueryState('token', {
    defaultValue: searchParams?.token?.toString() || '',
    history: 'push',
    shallow: false,
  })

  const currentRanking = searchParams?.ranking?.toString() || 'all'
  const currentBadges = searchParams?.badges?.toString() || 'all'

  const [, setRanking] = useQueryState('ranking', {
    defaultValue: currentRanking,
    history: 'push',
    shallow: false,
  })

  const [, setBadges] = useQueryState('badge', {
    defaultValue: currentBadges,
    history: 'push',
    shallow: false,
  })

  const dataSpotlightQuery = useQuery(
    useGetSpotlight({
      chain: searchParams?.chain?.toString() || CHAIN,
      start: parseInt(searchParams?.start_spotlight?.toString() || '1'),
      limit: parseInt(searchParams?.limit_spotlight?.toString() || '5'),
      token_addresses: token || '',
      ranking: currentRanking,
      badges: currentBadges,
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

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listTokenSpotlight.filter(
      (token) => token.token_address !== item.token_address,
    )
    setListTokenSpotlight([...newListToken])
    setToken(newListToken?.map((item) => item.token_address)?.toString() || '')
  }

  const handleChooseTokens = (items: TokenList[]) => {
    setListTokenSpotlight(items)
    setToken(items?.map((item) => item.token_address)?.toString() || '')
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
            setListToken={handleChooseTokens}
          />
          {listTokenSpotlight?.length > 0 ? (
            <div className="flex items-center gap-2">
              {listTokenSpotlight.map((item) => (
                <div
                  className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]"
                  key={item.token_address}
                >
                  <div className="flex h-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-neutral-07 px-4 text-xs leading-5 tracking-normal text-white">
                    <ImageToken
                      imgUrl={item?.imageUrl || item?.image_url}
                      symbol={item?.symbol}
                    />
                    <div>{item.symbol}</div>
                    <Close
                      className="h-4 w-4"
                      onclick={handleRemoveToken(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
           <SelectRank
            setPage={setPageSpotlight}
            setRanking={setRanking}
            ranking={currentRanking}
          />
          <SelectBadge
            setPage={setPageSpotlight}
            setBadge={setBadges}
            badge={currentBadges}
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
