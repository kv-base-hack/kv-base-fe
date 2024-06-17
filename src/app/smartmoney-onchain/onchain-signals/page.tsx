'use client'

import { TablePerformanceToken } from '@/components/common/DataTable/TablePerformanceToken'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { GroupHeader } from '@/components/common/GroupHeader'
import { TopCoin } from '@/components/common/TopCoin'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'

import { useEffect, useState } from 'react'
import SmartMoneyTopPerformingIcon from '@/components/shared/icons/dashboard/SmartMoneyTopPerformingIcon'
import { SelectDuration } from '@/components/common/Select/SelectDuration'

import { cn } from '@/lib/utils'
import { useWindowSize } from 'react-use'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'

const TABLET_TAB = [
  {
    name: 'CEX Withdraw/ Deposit',
    value: 'cex_withdraw_and_deposit',
  },
  {
    name: 'SM Top Buys/ Sells',
    value: 'sm_top_buys_and_sells',
  },
  {
    name: 'Top Performing',
    value: 'top_performing',
  },
]

const MOBILE_TAB = [
  {
    name: 'CEX Withdraw',
    value: 'cex_withdraw',
  },
  {
    name: 'CEX Deposit',
    value: 'cex_deposit',
  },
  {
    name: 'SM Top Buys',
    value: 'sm_top_buys',
  },
  {
    name: 'SM Top Sells',
    value: 'sm_top_sells',
  },
  {
    name: 'Top Performing',
    value: 'top_performing',
  },
]

export default function OnchainSignals() {
  const CHAIN = useAtomValue(chainAtom)
  const { width } = useWindowSize()

  const [pageTopProfit, setPageTopProfit] = useState(1)
  const [filterDate, setFilterDate] = useState('24h')
  const [sortBy, setSortBy] = useState('')
  const [tab, setTab] = useState('cex_withdraw_and_deposit')

  useEffect(() => {
    if (width <= 425) {
      setTab('cex_withdraw')
    } else if (width <= 834) {
      setTab('cex_withdraw_and_deposit')
    } else {
      setTab('')
    }
  }, [width])
  //
  const topTokenProfitQuery = useTopTokenProfitQuery({
    limit: 5,
    start: pageTopProfit,
    chain: CHAIN,
    duration: filterDate,
    sort_by: sortBy,
  })
  const dataTopTokenProfit = topTokenProfitQuery.isFetching
    ? [...Array(5).keys()]
    : topTokenProfitQuery.data?.data.top_smart_money_token_profit || []
  const totalTopTokenProfit = topTokenProfitQuery.data?.data.total || 1

  return (
    <div className="w-full h-full">
      <GroupHeader
        className="mt-10 mx-10 hidden lg:block"
        title="Smart Money Onchain Dashboard"
      />
      {/* table */}
      {width > 834 || (width <= 834 && tab === 'top_performing') ? (
        <div className="m-0 lg:m-10">
          <WrapTable
            icon={<SmartMoneyTopPerformingIcon />}
            title="Smart Money Top Performing Tokens"
            childHeader={
              <div className="flex items-center gap-2">
                <SelectDuration
                  duration={filterDate}
                  setDuration={setFilterDate}
                />
              </div>
            }
          >
            <div className="mt-8">
              <TablePerformanceToken
                data={dataTopTokenProfit}
                isFetching={topTokenProfitQuery.isFetching}
                setSortBy={setSortBy}
                duration={filterDate}
                chain={CHAIN}
              />
            </div>
            <PaginationTable
              className="mt-8"
              currentPage={pageTopProfit}
              updatePage={(page: number) => setPageTopProfit(page)}
              pageSize={10}
              total={totalTopTokenProfit}
              setPage={setPageTopProfit}
            />
          </WrapTable>
        </div>
      ) : null}
      <div className="hidden md:flex lg:hidden justify-start p-4 items-center text-lg font-medium tracking-tight leading-6 depth-1">
        {TABLET_TAB.map((item, idx) => (
          <div
            className={cn(
              'cursor-pointer',
              tab === item.value
                ? 'justify-center self-stretch rounded-3xl bg-neutral-01/10'
                : 'self-stretch my-auto',
            )}
            key={idx}
            onClick={() => setTab(item.value)}
          >
            <div className="flex gap-2 px-4 py-1">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="flex overflow-x-auto md:hidden justify-start p-4 items-center text-lg font-medium tracking-tight leading-6 depth-1">
        {MOBILE_TAB.map((item, idx) => (
          <div
            className={cn(
              'cursor-pointer whitespace-nowrap',
              tab === item.value
                ? 'justify-center self-stretch rounded-3xl bg-neutral-01/10'
                : 'self-stretch my-auto',
            )}
            key={idx}
            onClick={() => setTab(item.value)}
          >
            <div className="flex gap-2 px-4 py-1">{item.name}</div>
          </div>
        ))}
      </div>
      {/* top coin */}
      <TopCoin width={width} tab={tab} className="m-0 lg:mx-10 lg:mt-10" />
    </div>
  )
}
