'use client'

import { ButtonChooseToken } from '@/components/common/Button/button-choose-token'
import { DataTable } from '@/components/common/DataTable'
import { columnsActivity } from '@/components/common/DataTable/columnsActivity'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import SmartmoneyActivityIcon from '@/components/shared/icons/activity/SmartmoneyActivityIcon'
import { Switch } from '@/components/ui/switch'
import { CHAIN } from '@/constant/chain'
import { useTopActivityQuery } from '@/query/leaderboard/getTopActivity'
import { TokenList } from '@/types/tokenList'

import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useState } from 'react'

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
  const [filterActivity, setFilterActivity] = useQueryState('action', {
    defaultValue: searchParams?.action?.toString() || 'all',
    history: 'push',
    shallow: false,
  })
  const [tradeValue, setTradeValue] = useState<unknown>([])
  const [, setSortBy] = useQueryState('sort_by', {
    defaultValue: searchParams?.sort_by?.toString() || '',
    history: 'push',
    shallow: false,
  })
  const [hiddenSmallTrades, setHiddenSmallTrades] = useState(false)
  const [token, setToken] = useQueryState('token', {
    defaultValue: searchParams?.token?.toString() || '',
    history: 'push',
    shallow: false,
  })

  const activityQuery = useQuery(
    useTopActivityQuery({
      action: searchParams?.action?.toString() || 'all',
      limit: parseInt(searchParams?.limit_activity?.toString() || '10'),
      start: parseInt(searchParams?.start_activity?.toString() || '1'),
      chain: searchParams?.chain?.toString() || CHAIN,
      amount_filter: searchParams?.amount_filter?.toString() || '',
      token_addresses: token || '',
      sort_by: searchParams?.sort_by?.toString() || '',
    }),
  )

  const totalActivity = activityQuery.data?.total || 1

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
            setListToken={setListToken}
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={hiddenSmallTrades}
              onCheckedChange={(checked: boolean) =>
                setHiddenSmallTrades(checked)
              }
            />
            <p className="text-sm font-normal text-neutral-300">
              Hide Small Trades {`(<$1K)`}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center self-stretch font-semibold leading-[160%] shadow-2xl">
          <DataTable
            className="text-xs font-bold leading-4 tracking-normal text-gray-300"
            columns={columnsActivity(
              setSortBy,
              setToken,
              token,
              setFilterActivity,
              filterActivity,
              setPageActivity,
              setTradeValue,
              tradeValue,
            )}
            data={activityQuery?.data?.activities || []}
            noneBorder
            noneBgHeader
            emptyData="No results."
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
