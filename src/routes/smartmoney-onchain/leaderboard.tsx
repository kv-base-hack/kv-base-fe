import { DataTable } from '@/components/common/DataTable'
import { columnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'
import { columnsPerformanceToken } from '@/components/common/DataTable/columnsPerformanceToken'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectChain } from '@/components/common/SelectChain'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const RightGroup = () => {
  return (
    <div className="flex gap-4 justify-between px-3 text-gray-500 rounded-lg">
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Filter by Token</div>
        <ArrowDownIcon />
      </div>
      <div className="flex items-center gap-2 justify-between px-4 py-2 rounded-xl border-2 border-solid border-white/10">
        <div className="grow">Filter by Badge</div>
        <ArrowDownIcon />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/smartmoney-onchain/leaderboard')({
  component: Leaderboard,
})

function Leaderboard() {
  const CHAIN = useAtomValue(chainAtom)
  const [pageTopProfit, setPageTopProfit] = useState(1)
  const [pageLeaderboard, setPageLeaderboard] = useState(1)
  //
  const leaderboardQuery = useLeaderboardQuery({
    start: pageLeaderboard,
    limit: 10,
    chain: CHAIN,
  })
  const dataLeaderboard = leaderboardQuery.data?.data.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = leaderboardQuery.data?.data.total || 1
  //
  const topTokenProfitQuery = useTopTokenProfitQuery({
    limit: 10,
    start: pageTopProfit,
    chain: CHAIN,
    duration: '24h',
  })
  const dataTopTokenProfit = topTokenProfitQuery.data?.data.top_token_profit || []
  const totalTopTokenProfit = topTokenProfitQuery.data?.data.total || 1
  //

  return (
    <div className="w-full h-full pt-2">
      {/* header */}
      <GroupHeader
        className="mt-4 mx-10"
        title="Leaderboard"
        desc="Showcases ranked profiles of Insider Trade based on their returns, highlights their most profitable trades, and reveals their recent market moves">
        <SelectChain />
      </GroupHeader>
      {/* table */}
      <div className="m-10">
        <WrapTable title="Smart Money Ranking" childHeader={<RightGroup />}>
          <div className="mt-8">
            <DataTable
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
              columns={columnsLeaderboard}
              data={dataLeaderboard || []}
              isFetching={leaderboardQuery.isFetching}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          </div>
          <PaginationCustom
            className="mt-8"
            currentPage={pageLeaderboard}
            updatePage={(page: number) => setPageLeaderboard(page)}
            pageSize={10}
            total={totalLeaderboard}
            setPage={setPageLeaderboard}
          />
        </WrapTable>
      </div>
      <div className="m-10">
        <WrapTable title="Smart Money's Top Performing Tokens">
          <div className="mt-8">
            <DataTable
              className="text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap bg-neutral-07/50"
              columns={columnsPerformanceToken}
              data={dataTopTokenProfit || []}
              noneBorder
              noneBgHeader
              isFetching={topTokenProfitQuery.isFetching}
              emptyData="No results."
            />
          </div>
          <PaginationCustom
            className="mt-8"
            currentPage={pageTopProfit}
            updatePage={(page: number) => setPageTopProfit(page)}
            pageSize={10}
            total={totalTopTokenProfit}
            setPage={setPageTopProfit}
          />
        </WrapTable>
      </div>
    </div>
  )
}
