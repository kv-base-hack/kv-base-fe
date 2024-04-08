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
import SmartMoneyRankingIcon from '@/components/shared/icons/leaderboard/SmartMoneyRankingIcon'
import SmartMoneyTopPerformingIcon from '@/components/shared/icons/dashboard/SmartMoneyTopPerformingIcon'
import { DateGroup } from '@/components/common/DateGroup'
import { cn } from '@/lib/utils'

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

const DATA_DATE = [
  {
    value: '1h',
    label: '1h',
  },
  {
    value: '4h',
    label: '4h',
  },
  {
    value: '24h',
    label: '1D',
  },
  {
    value: '168h',
    label: '3D',
  },
]

export const Route = createFileRoute('/smartmoney-onchain/leaderboard')({
  component: Leaderboard,
})

function Leaderboard() {
  const CHAIN = useAtomValue(chainAtom)
  const [tab, setTabs] = useState('smart_money')
  const [pageTopProfit, setPageTopProfit] = useState(1)
  const [pageLeaderboard, setPageLeaderboard] = useState(1)
  const [filterDate, setFilterDate] = useState('24h')
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
    duration: filterDate,
  })
  const dataTopTokenProfit = topTokenProfitQuery.data?.data.top_token_profit || []
  const totalTopTokenProfit = topTokenProfitQuery.data?.data.total || 1
  //

  const handleChangeTab = (tab: string) => () => {
    setTabs(tab)
  }

  return (
    <div className="w-full h-full">
      {/* header */}
      <div className="bg-[url('/assets/images/bg-tabs.svg')] w-full bg-no-repeat bg-cover flex overflow-hidden relative flex-col justify-center items-start self-stretch px-10 text-base font-semibold tracking-normal leading-6 whitespace-nowrap min-h-[55px] max-md:px-5">
        <div className="flex relative gap-5 justify-between">
          <div
            onClick={handleChangeTab('smart_money')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3 text-neutral-01">
            <div>Smart Money</div>
            <div
              className={cn(
                'shrink-0 mt-4 h-1 rounded-sm',
                tab === 'smart_money' ? 'bg-amber-200' : ''
              )}
            />
          </div>
          <div
            onClick={handleChangeTab('insider_trade')}
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3 text-gray-500">
            <div>Insider Trade</div>
            <div
              className={cn(
                'shrink-0 mt-4 h-1 rounded-sm',
                tab === 'insider_trade' ? 'bg-amber-200' : ''
              )}
            />
          </div>
        </div>
      </div>
      <GroupHeader
        className="mt-4 mx-10"
        title={
          tab === 'smart_money'
            ? 'Smartmoney Leaderboard'
            : 'Insider Trade(Speculation) Leaderboard'
        }
        desc={
          tab === 'smart_money'
            ? 'Showcases ranked profiles of Smart Money based on their returns, highlights their most profitable trades, and reveals their recent market moves'
            : 'Showcases ranked profiles of Insider Trade based on their returns, highlights their most profitable trades, and reveals their recent market moves'
        }
        info={
          tab === 'smart_money'
            ? ''
            : 'We do not encourage people to copy trade these individuals because this Insider Trade is just speculation'
        }>
        <SelectChain />
      </GroupHeader>
      {/* table */}
      <div className="m-10">
        <WrapTable
          icon={<SmartMoneyRankingIcon />}
          title="Smart Money Ranking"
          childHeader={<RightGroup />}>
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
        <WrapTable
          icon={<SmartMoneyTopPerformingIcon />}
          title="Smart Money's Top Performing Tokens"
          childHeader={
            <DateGroup dataSource={DATA_DATE} active={filterDate} handleActive={setFilterDate} />
          }>
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
