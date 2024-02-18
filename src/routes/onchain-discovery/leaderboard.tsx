import { DataTable } from '@/components/common/DataTable'
import {
  PerformingToken,
  columnsPerformanceToken,
} from '@/components/common/DataTable/columnsPerformanceToken'
import {
  SmartMoneyRanking,
  columnsSmartMoneyRanking,
} from '@/components/common/DataTable/columnsSmartMoneyRanking'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectChain } from '@/components/common/SelectChain'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

async function getDataPerformanceToken(): Promise<PerformingToken[]> {
  return [
    {
      id: '1',
      symbol: 'USDT',
      gains: 207220.61,
      net_flow: 1964000,
      avg_cost: 0.022692,
      current_price: 0.0242551,
      realized_percentage: 35.89,
      avg_roi: 245.01,
    },
    {
      id: '2',
      symbol: 'USDT',
      gains: 207220.61,
      net_flow: 1964000,
      avg_cost: 0.022692,
      current_price: 0.0242551,
      realized_percentage: 35.89,
      avg_roi: 245.01,
    },
    {
      id: '3',
      symbol: 'USDT',
      gains: 207220.61,
      net_flow: 1964000,
      avg_cost: 0.022692,
      current_price: 0.0242551,
      realized_percentage: 35.89,
      avg_roi: 245.01,
    },
    {
      id: '4',
      symbol: 'USDT',
      gains: 207220.61,
      net_flow: 1964000,
      avg_cost: 0.022692,
      current_price: 0.0242551,
      realized_percentage: 35.89,
      avg_roi: 245.01,
    },
    {
      id: '5',
      symbol: 'USDT',
      gains: 207220.61,
      net_flow: 1964000,
      avg_cost: 0.022692,
      current_price: 0.0242551,
      realized_percentage: 35.89,
      avg_roi: 245.01,
    },
    {
      id: '6',
      symbol: 'USDT',
      gains: 207220.61,
      net_flow: 1964000,
      avg_cost: 0.022692,
      current_price: 0.0242551,
      realized_percentage: 35.89,
      avg_roi: 245.01,
    },
  ]
}

async function getDataSmartMoneyRanking(): Promise<SmartMoneyRanking[]> {
  return [
    {
      id: '1',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '2',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '3',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '4',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '5',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
  ]
}

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

export const Route = createFileRoute('/onchain-discovery/leaderboard')({
  loader: async () => {
    return {
      dataSmartMoneyRanking: await getDataSmartMoneyRanking(),
      dataPerformanceToken: await getDataPerformanceToken(),
    }
  },
  component: Leaderboard,
})

function Leaderboard() {
  const { dataPerformanceToken, dataSmartMoneyRanking } = Route.useLoaderData()
  const [page, setPage] = useState(1)
  const [tab, setTabs] = useState('smart_money')

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
        title={tab === 'smart_money' ? 'Leaderboard' : 'Insider Trade(Speculation) Leaderboard'}
        desc="Showcases ranked profiles of Insider Trade based on their returns, highlights their most profitable trades, and reveals their recent market moves"
        info={
          tab === 'smart_money'
            ? ''
            : 'We do not encourage people to copy trade these individuals because this Insider Trade is just speculation'
        }>
        <SelectChain name="Ethereum Chain" />
      </GroupHeader>
      {/* table */}
      <div className="m-10">
        <WrapTable
          title={tab === 'smart_money' ? 'Smart Money Ranking' : 'Insider Trade Ranking'}
          childHeader={<RightGroup />}>
          <div className="mt-8">
            {dataSmartMoneyRanking ? (
              <DataTable
                className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
                columns={columnsSmartMoneyRanking}
                data={dataSmartMoneyRanking}
                noneBorder
                noneBgHeader
                emptyData="No results."
              />
            ) : null}
          </div>
          <PaginationCustom
            className="mt-8"
            currentPage={page}
            updatePage={() => null}
            pageSize={10}
            total={10}
            setPage={setPage}
          />
        </WrapTable>
      </div>
      <div className="m-10">
        <WrapTable
          title={
            tab === 'smart_money'
              ? "Smart Money's Top Performing Tokens"
              : "Insider Trade's Top Performing Tokens"
          }>
          <div className="mt-8">
            {dataPerformanceToken ? (
              <DataTable
                className="text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap bg-neutral-07/50"
                columns={columnsPerformanceToken}
                data={dataPerformanceToken}
                noneBorder
                noneBgHeader
                emptyData="No results."
              />
            ) : null}
          </div>
          <PaginationCustom
            className="mt-8"
            currentPage={page}
            updatePage={() => null}
            pageSize={10}
            total={10}
            setPage={setPage}
          />
        </WrapTable>
      </div>
    </div>
  )
}
