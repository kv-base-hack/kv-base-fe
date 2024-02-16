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

const TypeActivityGroup = ({ tab }: { tab: string }) => {
  return (
    <div className="flex gap-5 justify-between items-center text-base tracking-normal text-gray-500">
      <div className="justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.6] bg-gray-300 bg-opacity-10">
        All
      </div>{' '}
      {tab === 'smart_money' ? <div className="self-stretch my-auto">Inflow</div> : null}
      {tab === 'smart_money' ? <div className="self-stretch my-auto">Outflow</div> : null}
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
            className="cursor-pointer flex flex-col flex-1 justify-between pt-3 text-zinc-50">
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
        title={tab === 'smart_money' ? 'Smart Money Signals' : 'Insider Trade Signal (Speculation)'}
        desc={
          tab === 'smart_money'
            ? ''
            : 'Insider Trade is an unethical and illegal practice where individuals with access to confidential, material information use it for trading advantage. '
        }
        info={
          tab === 'smart_money'
            ? ''
            : 'We do not encourage people to copy trade these individuals because this Insider Trade is just speculation'
        }>
        <SelectChain name="Ethereum Chain" />
      </GroupHeader>
      {/* top coin */}
      {tab === 'smart_money' ? <TopCoin className="mx-10 mt-4" /> : null}
      {/* table */}
      {tab === 'smart_money' ? (
        <div className="m-10">
          <WrapTable title="Smart Money's Top Performing Tokens" childHeader={<DateGroup />}>
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
      ) : (
        <div className="m-10">
          <WrapTable title="Insider Trade’s Activity" childHeader={<TypeActivityGroup tab={tab} />}>
            <div className="mt-8">
              {dataActivity ? (
                <DataTable
                  className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-zinc-800 bg-neutral-07/50"
                  columns={columnsActivity}
                  data={dataActivity}
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
      )}
      {tab === 'smart_money' ? (
        <div className="m-10">
          <WrapTable
            title={tab === 'smart_money' ? "Smart Money's Activity" : 'Insider Trade’s Activity'}
            childHeader={<TypeActivityGroup tab={tab} />}>
            <div className="mt-8">
              {dataActivity ? (
                <DataTable
                  className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-zinc-800 bg-neutral-07/50"
                  columns={columnsActivity}
                  data={dataActivity}
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
      ) : (
        <div className="m-10">
          <WrapTable title="Insider Trade's Top Performing Tokens" childHeader={<DateGroup />}>
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
      )}
    </div>
  )
}
