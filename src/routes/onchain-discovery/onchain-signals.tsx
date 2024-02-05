import { DataTable } from '@/components/common/DataTable'
import { Activity, columnsActivity } from '@/components/common/DataTable/columnsActivity'
import {
  PerformingToken,
  columnsPerformanceToken,
} from '@/components/common/DataTable/columnsPerformanceToken'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectChain } from '@/components/common/SelectChain'
import { TopCoin } from '@/components/common/TopCoin'
import BuyVolumnIcon from '@/components/shared/icons/BuyVolumn'
import PortfolioSpeedIcon from '@/components/shared/icons/PortfolioSpeed'
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

async function getDataActivity(): Promise<Activity[]> {
  return [
    {
      id: '1',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '2',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '3',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '4',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '5',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
  ]
}

const DateGroup = () => {
  return (
    <div className="flex gap-5 justify-between items-center text-base tracking-normal text-gray-500">
      <div className="justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.6] bg-gray-300 bg-opacity-10">
        24H
      </div>{' '}
      <div className="self-stretch my-auto">7D</div>
      <div className="self-stretch my-auto">30D</div>
      <div className="grow self-stretch my-auto">3M</div>
    </div>
  )
}

const TypeActivityGroup = () => {
  return (
    <div className="flex gap-5 justify-between items-center text-base tracking-normal text-gray-500">
      <div className="justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.6] bg-gray-300 bg-opacity-10">
        All
      </div>{' '}
      <div className="self-stretch my-auto">Inflow</div>
      <div className="self-stretch my-auto">Outflow</div>
      <div className="grow self-stretch my-auto">Buying</div>
      <div className="grow self-stretch my-auto">Selling</div>
    </div>
  )
}

export const Route = createFileRoute('/onchain-discovery/onchain-signals')({
  loader: async () => {
    return {
      dataPerformanceToken: await getDataPerformanceToken(),
      dataActivity: await getDataActivity(),
    }
  },
  component: OnchainSignals,
})

function OnchainSignals() {
  const { dataPerformanceToken, dataActivity } = Route.useLoaderData()
  const [page, setPage] = useState(1)

  return (
    <div className="w-full h-full">
      {/* header */}
      <div className="bg-[url('/assets/images/bg-tabs.svg')] flex overflow-hidden relative flex-col justify-center items-start self-stretch px-10 text-base font-semibold tracking-normal leading-6 whitespace-nowrap min-h-[55px] max-md:px-5">
        <div className="flex relative gap-5 justify-between">
          <div className="flex flex-col flex-1 justify-between pt-3 text-zinc-50">
            <div>Smart Money</div>
            <div className="shrink-0 mt-4 h-1 bg-amber-200 rounded-sm" />
          </div>
          <div className="flex flex-col flex-1 justify-between pt-3 text-gray-500">
            <div>Insider Trade</div>
            <div className="shrink-0 mt-4 h-1 rounded-sm bg-green-200 bg-opacity-0" />
          </div>
        </div>
      </div>
      <GroupHeader
        className="mt-4 mx-10"
        title="Smart Money Signals"
        desc="With defined the top 1000 addresses that have shown the best token trading performance in the last 30D or 3M. "
        info="We do not encourage people to copy trade these individuals because this Insider Trade is just speculation">
        <SelectChain />
      </GroupHeader>
      {/* top highlight */}
      <div className="self-stretch mx-10 mt-4">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-6 w-full rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-zinc-900 bg-opacity-50 border-[color:var(--Stroke,rgba(255,255,255,0.10))] max-md:px-5 max-md:mt-4 max-md:max-w-full">
              <div className="flex gap-4 justify-between text-xl font-semibold tracking-tight leading-8 text-gray-300 max-md:flex-wrap max-md:max-w-full">
                <PortfolioSpeedIcon />
                <div className="flex-auto max-md:max-w-full">Portfolio Stablecoin Ratio</div>
              </div>
              <div className="flex gap-5 justify-between mt-8 text-xl tracking-tight leading-8 text-right text-gray-300 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto text-start">$6.821M (8.64%)</div>
                <div className="flex-auto text-end">$72.087M (91.35%)</div>
              </div>
              <div className="flex gap-0 justify-between mt-2 max-md:flex-wrap max-md:max-w-full">
                <div className="h-6 bg-green-200 rounded-s-sm rounded-e-none w-1/4" />
                <div className="max-w-full h-6 bg-violet-300 rounded-s-none rounded-e-sm w-3/4" />
              </div>
              <div className="flex gap-5 justify-between mt-2 text-xl tracking-tight leading-8 text-right whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="text-green-200 text-start">Stable</div>
                <div className="text-violet-300 text-end">Tokens</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow p-6 w-full rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-zinc-900 bg-opacity-50 border-[color:var(--Stroke,rgba(255,255,255,0.10))] max-md:px-5 max-md:mt-4 max-md:max-w-full">
              <div className="flex gap-4 justify-between text-xl font-semibold tracking-tight leading-8 text-gray-300 max-md:flex-wrap max-md:max-w-full">
                <BuyVolumnIcon />
                <div className="flex-auto max-md:max-w-full">
                  {' '}
                  Buy and Sell Volume in the past 24h
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-8 text-xl tracking-tight leading-8 text-right text-gray-300 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto text-start">$5.8M (39.56%)</div>
                <div className="flex-auto text-end">$8.9M (60.43%)</div>
              </div>
              <div className="flex gap-0 justify-between mt-2 max-md:flex-wrap max-md:max-w-full">
                <div className="h-6 rounded-s-sm rounded-e-none bg-stone-400 w-1/3" />
                <div className="max-w-full h-6 bg-red-400 rounded-s-none rounded-e-sm w-2/3" />
              </div>
              <div className="flex gap-5 justify-between mt-2 text-xl tracking-tight leading-8 text-right whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="text-stone-400 text-start">Buy</div>
                <div className="text-red-400 text-end">Sell</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* top coin */}
      <TopCoin className="mx-10 mt-4" />
      {/* table */}
      <div className="m-10">
        <WrapTable title="Smart Money's Top Performing Tokens" childHeader={<DateGroup />}>
          <div className="mt-8">
            {dataPerformanceToken ? (
              <DataTable
                className="text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap bg-neutral-07/50"
                columns={columnsPerformanceToken}
                data={dataPerformanceToken}
                noneBorder
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
        <WrapTable title="Smart Money's Activity" childHeader={<TypeActivityGroup />}>
          <div className="mt-8">
            {dataActivity ? (
              <DataTable
                className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-zinc-800 bg-neutral-07/50"
                columns={columnsActivity}
                data={dataActivity}
                noneBorder
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
