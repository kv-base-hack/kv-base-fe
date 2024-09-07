'use client'

import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'
import { DataTable } from '@/components/common/DataTable'
import { columnsActivity } from '@/components/common/DataTable/columnsActivity'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import SmartmoneyActivityIcon from '@/components/shared/icons/activity/SmartmoneyActivityIcon'
import Close from '@/components/shared/icons/Close'
import { CHAIN } from '@/constant/chain'
import { useTopActivityQuery } from '@/query/leaderboard/getTopActivity'
import { TokenList } from '@/types/tokenList'

import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState, parseAsString } from 'nuqs'
import { useState } from 'react'
import { SelectRank } from '../smart-traders/select/select-ranking'
import { SelectBadge } from '../smart-traders/select/select-badge'

const customParseAsString = parseAsString.withDefault('').withOptions({
  history: 'push',
  shallow: false,
}) as unknown as typeof parseAsString

export const TraderActivity = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const [, setPageActivity] = useQueryState(
    'start_activity',
    parseAsInteger
      .withDefault(parseInt(searchParams?.start_activity?.toString() || '1'))
      .withOptions({
        history: 'push',
        shallow: false,
      }),
  )
  const [listToken, setListToken] = useState<TokenList[]>([])

  const [filterActivity, setFilterActivity] = useQueryState('action', customParseAsString)

  const [, setSortBy] = useQueryState('sort_by', {
    defaultValue: searchParams?.sort_by?.toString() || '',
    history: 'push',
    shallow: false,
  })

  const [token, setToken] = useQueryState('token_activity', customParseAsString)

  const [tradeValue, setTradeValue] = useQueryState('amount_filter', customParseAsString)

  const [userAddress, setUserAddress] = useQueryState('user_address', customParseAsString)

  const [, setRankingActivity] = useQueryState('ranking_activity', customParseAsString)
  const [, setBadgesActivity] = useQueryState('badges_activity', customParseAsString)

  const activityQuery = useQuery(
    useTopActivityQuery({
      action: searchParams?.action?.toString() || 'all',
      limit: parseInt(searchParams?.limit_activity?.toString() || '10'),
      start: parseInt(searchParams?.start_activity?.toString() || '1'),
      chain: searchParams?.chain?.toString() || CHAIN,
      amount_filter: searchParams?.amount_filter?.toString() || '',
      token_addresses: searchParams?.token_activity?.toString() || '',
      sort_by: searchParams?.sort_by?.toString() || '',
      user_address: searchParams?.user_address?.toString() || '',
      ranking: searchParams?.ranking_activity?.toString() || 'all',
      badges: searchParams?.badges_activity?.toString() || 'all',
    }),
  )

  const totalActivity = activityQuery.data?.total || 1

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.token_address !== item.token_address,
    )
    setListToken([...newListToken])
    setToken(newListToken?.map((item) => item.token_address)?.toString() || '')
  }

  const handleChooseTokens = (items: TokenList[]) => {
    setListToken(items)
    setToken(items?.map((item) => item.token_address)?.toString() || '')
  }

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-white/10 bg-black/50 p-6">
      <div className="flex justify-between max-md:flex-wrap">
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-core bg-[#182317] p-2">
            <SmartmoneyActivityIcon />
          </div>
          <p className="text-base font-medium text-neutral-100">
            Smart Traders Activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ButtonChooseToken
            listToken={listToken}
            setListToken={handleChooseTokens}
          />
          {listToken?.length > 0 ? (
            <div className="flex items-center gap-2">
              {listToken.map((item) => (
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
            setPage={setPageActivity}
            setRanking={setRankingActivity}
            ranking={searchParams?.ranking_activity?.toString() || 'all'}
          />
          <SelectBadge
            setPage={setPageActivity}
            setBadge={setBadgesActivity}
            badge={searchParams?.badges_activity?.toString() || 'all'}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center self-stretch font-semibold leading-[160%] shadow-2xl">
          <DataTable
            className="text-xs font-bold leading-4 tracking-normal text-gray-300"
            columns={columnsActivity(
              setSortBy,
              setToken,
              token as string,
              setFilterActivity,
              filterActivity as string,
              setPageActivity,
              setTradeValue,
              tradeValue,
              setUserAddress,
              userAddress as string,
            )}
            data={activityQuery?.data?.activities || []}
            noneBorder
            noneBgHeader
            emptyData="No results."
            isFetching={activityQuery.isLoading || activityQuery.isFetching}
          />
          <PaginationTable
            className="mt-4"
            currentPage={
              searchParams?.start_activity
                ? +searchParams.start_activity?.toString()
                : 1
            }
            pageSize={
              searchParams?.limit_activity
                ? +searchParams?.limit_activity?.toString()
                : 10
            }
            total={totalActivity}
            setPage={setPageActivity}
          />
        </div>
      </div>
    </div>
  )
}
