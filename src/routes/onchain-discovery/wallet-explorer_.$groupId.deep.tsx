import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { Activity, columnsActivity } from '@/components/common/DataTable/columnsActivity'
import { Portfolio, columnsPortfolio } from '@/components/common/DataTable/columnsPortfolio'
import {
  TradeStatistic,
  columnsTradeStatistic,
} from '@/components/common/DataTable/columnsTradeStatistic'
import { PaginationCustom } from '@/components/common/Pagination'
import AvatarIcon from '@/components/shared/icons/Avatar'
import { activityQueryOptions } from '@/query/wallet-explorer/getActivity'
import { portfolioQueryOptions } from '@/query/wallet-explorer/getPortfolio'
import { tradeStatisticQueryOptions } from '@/query/wallet-explorer/getTradeStatistic'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const TypeActivityGroup = () => {
  return (
    <div className="flex gap-5 justify-between items-center text-base tracking-normal text-gray-500">
      <div className="justify-center self-stretch px-4 py-2 text-gray-300 rounded-lg aspect-[1.6] bg-gray-300 bg-opacity-10">
        All
      </div>
      <div className="self-stretch my-auto">Inflow</div>
      <div className="self-stretch my-auto">Outflow</div>
      <div className="grow self-stretch my-auto">Buying</div>
      <div className="grow self-stretch my-auto">Selling</div>
    </div>
  )
}

export const Route = createFileRoute('/onchain-discovery/wallet-explorer/$groupId/deep')({
  loader: async (opts: any) => {
    await opts.context.queryClient.ensureQueryData(activityQueryOptions(opts.params.groupId))
    await opts.context.queryClient.ensureQueryData(tradeStatisticQueryOptions(opts.params.groupId))
    await opts.context.queryClient.ensureQueryData(portfolioQueryOptions(opts.params.groupId))
  },
  component: WalletExplorerDetail,
})

function WalletExplorerDetail() {
  const params = Route.useParams()
  const tradeStatisticQuery = useSuspenseQuery(tradeStatisticQueryOptions(params.groupId))
  const tradeStatistic = tradeStatisticQuery.data as TradeStatistic[]
  //
  const portfolioQuery = useSuspenseQuery(portfolioQueryOptions(params.groupId))
  const portfolio = portfolioQuery.data as Portfolio[]
  //
  const smartMoneyRankingQuery = useSuspenseQuery(activityQueryOptions(params.groupId))
  const dataActivity = smartMoneyRankingQuery.data as Activity[]
  const [page, setPage] = useState(1)

  return (
    <div className="w-full h-full">
      <div className="flex flex-col mx-10 mt-10 justify-center self-stretch">
        <div className="w-full text-4xl text-gray-300 leading-[60px] max-md:max-w-full">
          Wallet Explorer
        </div>
        <div className="flex gap-5 justify-between mt-4 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-4 justify-between">
            <AvatarIcon className="w-24 aspect-square" />
            <div className="flex flex-col flex-1 justify-end self-start px-5">
              <div className="text-xl font-bold tracking-tight leading-7 text-white text-opacity-90">
                Whale Untag
              </div>
              <div className="flex gap-1 pr-20 mt-2 max-md:pr-5">
                <img
                  loading="lazy"
                  srcSet="/assets/images/ranking/gold.png"
                  className="w-6 aspect-[0.93]"
                />
                <img
                  loading="lazy"
                  srcSet="/assets/images/ranking/platium.png"
                  className="w-6 aspect-[0.93]"
                />
                <img
                  loading="lazy"
                  srcSet="/assets/images/ranking/fire.png"
                  className="w-6 aspect-[0.93]"
                />
              </div>
              <div className="mt-2 text-lg tracking-normal leading-6 text-gray-400">
                0xb587...c5731178d
              </div>
            </div>
          </div>
          <div
            className="rounded-lg backdrop-blur-[50px] w-2/3 px-px"
            style={{
              background: 'linear-gradient(180deg, #7e7244, #1A1D1F)',
            }}>
            <div className="flex gap-5 m-auto mt-px justify-between px-4 py-6 text-base tracking-normal leading-6 w-full h-full rounded-lg backdrop-blur-[5px] bg-neutral-07">
              <div className="flex flex-col flex-1 justify-center">
                <div className="self-center font-semibold text-gray-300">Total Balance</div>
                <div className="self-center mt-1 text-yellow-200">$4.097B</div>
              </div>
              <div className="w-px h-full bg-white/10"></div>
              <div className="flex flex-col flex-1 justify-center">
                <div className="self-center font-semibold text-gray-300">PnL (ROI)</div>
                <div className="self-center mt-1 text-emerald-500">$29.7M (+2500%)</div>
              </div>
              <div className="w-px h-full bg-white/10"></div>
              <div className="flex flex-col flex-1 justify-center">
                <div className="self-center font-semibold text-gray-300">Win rate</div>
                <div className="self-center mt-1 text-stone-400">67%</div>
              </div>
              <div className="w-px h-full bg-white/10"></div>
              <div className="flex flex-col flex-1 justify-center">
                <div className="self-center font-semibold text-gray-300">Active since</div>
                <div className="self-center mt-1 text-gray-300">2023-05-09</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* table */}
      <div className="flex w-auto mx-10 mt-10 gap-4">
        <div className="w-2/3">
          <WrapTable title="Trades Statistics">
            <div className="mt-8">
              {tradeStatistic ? (
                <DataTable
                  className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
                  columns={columnsTradeStatistic}
                  data={tradeStatistic}
                  noneBorder
                  noneBgHeader
                  emptyData="No results."
                />
              ) : null}
            </div>
            <div className="flex items-center justify-between p-4 w-full mt-12">
              <div className="text-left w-full">TOTAL</div>
              <div className="text-left w-full">+$5.493M</div>
              <div className="text-left w-full">$3.507M</div>
              <div className="text-left w-full">$0.524773</div>
              <div className="text-left w-full">0.28%</div>
              <div className="text-left w-full">+156.63%</div>
            </div>
          </WrapTable>
        </div>
        <div className="w-1/3">
          <WrapTable title="Portfolio">
            <div className="mt-8">
              {portfolio ? (
                <DataTable
                  className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
                  columns={columnsPortfolio}
                  data={portfolio}
                  noneBorder
                  noneBgHeader
                  emptyData="No results."
                />
              ) : null}
              <PaginationCustom
                className="mt-8"
                currentPage={page}
                updatePage={() => null}
                pageSize={10}
                total={10}
                setPage={setPage}
              />
            </div>
          </WrapTable>
        </div>
      </div>
      {/* table */}
      <div className="m-10">
        <WrapTable title="Insider Trade’s Activity" childHeader={<TypeActivityGroup />}>
          <div className="mt-8">
            {dataActivity ? (
              <DataTable
                className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
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
    </div>
  )
}
