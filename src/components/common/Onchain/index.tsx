import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { columnsSmartMoneyRanking } from '@/components/common/DataTable/columnsSmartMoneyRanking'
import { columnsTokenInspectActivity } from '@/components/common/DataTable/columnsTokenInspectActivity'
import { DateGroup } from '@/components/common/DateGroup'
import { PaginationCustom } from '@/components/common/Pagination'
import Calendar from '@/components/shared/icons/Calendar'
import Info from '@/components/shared/icons/Info'
import SwapDate from '@/components/shared/icons/SwapDate'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useTopUserProfitQuery } from '@/query/onchain-signal/getTopUserProfit'
import { useTokenInspectActivityQuery } from '@/query/token-explorer/getTokenInspectActivity'
import { useTokenInspectBuySellQuery } from '@/query/token-explorer/getTokenInspectBuySell'
import { useTokenInspectDepositWithdrawQuery } from '@/query/token-explorer/getTokenInspectDepositWithdraw'
import { TokenInfo } from '@/types/tokenInfo'
import { nFormatter } from '@/utils/nFormatter'
import numeral from 'numeral'
import { useState } from 'react'
import { ChartCompare } from '@/components/common/Onchain/ChartCompare'
import { useRouter } from 'next/router'
import { ImageToken } from '../Image/ImageToken'

const DATA_ACTIVITY = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'deposit',
    label: 'Deposit',
  },
  {
    value: 'withdraw',
    label: 'Withdraw',
  },
  {
    value: 'buying',
    label: 'Buying',
  },
  {
    value: 'selling',
    label: 'Selling',
  },
]

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

export const Onchain = ({ dataTokenInfo }: { dataTokenInfo?: TokenInfo }) => {
  const router = useRouter()
  const { token } = router.query

  const [pageActivity, setPageActivity] = useState(1)
  const [pageUserProfit, setPageUserProfit] = useState(1)
  const [filterActivity, setFilterActivity] = useState('all')
  const [durationWithDrawDeposit, setDurationWithDrawDeposit] = useState('24h')
  const [durationSellBuy, setDurationSellBuy] = useState('24h')

  const CHAIN = useAtomValue(chainAtom)
  //
  const topUserProfitQuery = useTopUserProfitQuery({
    limit: 10,
    start: pageUserProfit,
    chain: CHAIN,
    duration: '24h',
  })
  const dataTopUserProfit = topUserProfitQuery.data?.data.topUserProfit
  const totalUserProfit = topUserProfitQuery.data?.data.total || 1
  //
  const activityQuery = useTokenInspectActivityQuery({
    action: filterActivity,
    limit: 10,
    start: pageActivity,
    chain: CHAIN,
    address: token?.toString() || '',
  })
  const dataActivity = activityQuery.data?.data.activities || []
  const totalActivity = activityQuery.data?.data?.total || 1
  //
  const tokenInspectDepositWithdraw = useTokenInspectDepositWithdrawQuery({
    address: token?.toString() || '',
    duration: durationWithDrawDeposit,
    chain: CHAIN,
  })
  const dataTokenInspectDW = tokenInspectDepositWithdraw.data?.data

  const totalWithdrawDeposit =
    (dataTokenInspectDW?.cex_in_flow || 0) + (dataTokenInspectDW?.cex_out_flow || 0)

  const percentWithdraw = (
    ((dataTokenInspectDW?.cex_out_flow || 0) / (totalWithdrawDeposit || 1)) *
    100
  ).toFixed(2)

  const percentDeposit = (
    ((dataTokenInspectDW?.cex_in_flow || 0) / (totalWithdrawDeposit || 1)) *
    100
  ).toFixed(2)
  //
  const tokenInspectBuySell = useTokenInspectBuySellQuery({
    address: token?.toString() || '',
    duration: durationSellBuy,
    chain: CHAIN,
  })
  const dataTokenInspectBS = tokenInspectBuySell.data?.data

  const totalBuySell =
    (dataTokenInspectBS?.in_flow_in_token || 0) + (dataTokenInspectBS?.out_flow_in_token || 0)

  const percentBuy = (
    ((dataTokenInspectBS?.in_flow_in_token || 0) / (totalBuySell || 1)) *
    100
  ).toFixed(2)

  const percentSell = (
    ((dataTokenInspectBS?.out_flow_in_token || 0) / (totalBuySell || 1)) *
    100
  ).toFixed(2)

  return (
    <div>
      <div className="flex my-4 items-center gap-4 self-stretch font-semibold whitespace-nowrap leading-[160%] max-md:flex-wrap">
        <div className="flex gap-2 my-auto text-xl tracking-tight">
          <div className="flex gap-2 justify-between text-gray-300">
            <div>{dataTokenInfo?.symbol}</div>
            <ImageToken
              symbol={dataTokenInfo?.symbol}
              className="object-center w-6 aspect-square"
            />
          </div>
          <div className="grow text-gray-300">Onchain Signal</div>
        </div>
      </div>
      <WrapTable title="Smart Money Ranking">
        <div className="mt-8">
          <DataTable
            className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
            columns={columnsSmartMoneyRanking}
            data={dataTopUserProfit || []}
            isFetching={topUserProfitQuery.isFetching}
            noneBorder
            noneBgHeader
            emptyData="No results."
          />
        </div>
        <PaginationCustom
          className="mt-8"
          currentPage={pageUserProfit}
          updatePage={(page: number) => setPageUserProfit(page)}
          pageSize={10}
          total={totalUserProfit}
          setPage={setPageUserProfit}
        />
      </WrapTable>
      <WrapTable
        className="mt-4"
        title="Activity"
        childHeader={
          <DateGroup
            dataSource={DATA_ACTIVITY}
            active={filterActivity}
            handleActive={setFilterActivity}
          />
        }>
        <div className="mt-8">
          <DataTable
            className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
            columns={columnsTokenInspectActivity}
            data={dataActivity?.slice(0, 10) || []}
            isFetching={activityQuery.isFetching}
            noneBorder
            noneBgHeader
            emptyData="No results."
          />
        </div>
        <PaginationCustom
          className="mt-8"
          currentPage={pageActivity}
          updatePage={(page: number) => setPageActivity(page)}
          pageSize={10}
          total={totalActivity}
          setPage={setPageActivity}
        />
      </WrapTable>
      {/* */}
      <div className="flex flex-col mt-4">
        <div className="w-full text-xl font-semibold tracking-tight leading-8 text-white uppercase max-md:max-w-full">
          Market Movement
        </div>
        <div className="flex flex-col px-5 py-4 mt-4 w-full rounded-md border border-solid shadow-2xl backdrop-blur-lg bg-zinc-900 bg-opacity-30 border-white/10 max-md:max-w-full">
          <div className="flex gap-5 justify-between pb-2.5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-2.5 items-center justify-between pr-2.5 text-xl font-semibold tracking-tight leading-8 text-white max-md:flex-wrap max-md:max-w-full">
              <div className="grow max-md:max-w-full">
                Price relation with Deposits & Withdrawals
              </div>
              <Info />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 text-sm tracking-normal leading-6 text-gray-300 whitespace-nowrap rounded-md shadow-2xl backdrop-blur-lg bg-gray-300 bg-opacity-10">
              <div className="grow">2020-11-02</div>
              <SwapDate />
              <div className="flex-auto">2020-11-02</div>
              <Calendar />
            </div>
          </div>
          <div className="flex gap-20 justify-start pr-20 w-full text-sm tracking-normal leading-6 text-white whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between">
              <div className="my-auto w-2 h-2 bg-emerald-400 rounded" />
              <div>Deposit</div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="my-auto w-2 h-2 bg-red-400 rounded" />
              <div>Withdrawals</div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="my-auto h-px bg-blue-500 w-[30px]" />
              <div>Price</div>
            </div>
          </div>
          <ChartCompare />
        </div>
      </div>
      {/* */}
      <div className="self-stretch mt-4">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow self-stretch px-6 py-4 w-full whitespace-nowrap rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 max-md:px-5 max-md:mt-6 max-md:max-w-full">
              <div className="flex gap-4 justify-between pb-2 max-md:flex-wrap max-md:max-w-full">
                <div className="grow text-xl font-semibold tracking-tight leading-8 text-gray-300">
                  Withdraw vs Deposit
                </div>
                <DateGroup
                  dataSource={DATA_DATE}
                  active={durationWithDrawDeposit}
                  handleActive={setDurationWithDrawDeposit}
                />
              </div>
              <div className="flex gap-5 justify-between py-4 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-between text-lg tracking-tight leading-8 text-white basis-0">
                  <div>{percentWithdraw}%</div>
                  <div className="mt-56 max-md:mt-10">{percentDeposit}%</div>
                </div>
                <div className="h-full w-[30px]">
                  <div
                    style={{
                      height: `${percentWithdraw}%`,
                    }}
                    className="bg-semantic-error-1"></div>
                  <div
                    style={{
                      height: `${percentDeposit}%`,
                    }}
                    className="bg-primary-2"></div>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 w-full rounded-lg border border-solid border-secondary-1 max-md:pr-5">
                    <div className="text-2xl leading-9 text-red-400">Withdraw</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <ImageToken
                        symbol={dataTokenInfo?.symbol}
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>{numeral(dataTokenInspectDW?.cex_out_flow || 0).format('0,0.00')}</div>
                        <div>${nFormatter(dataTokenInspectDW?.cex_out_flow_in_usdt || 0)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 mt-14 w-full rounded-lg border border-solid border-secondary-4 max-md:pr-5 max-md:mt-10">
                    <div className="text-2xl leading-9 text-stone-400">Deposit</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <ImageToken
                        symbol={dataTokenInfo?.symbol}
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>{numeral(dataTokenInspectDW?.cex_in_flow || 0).format('0,0.00')}</div>
                        <div>${nFormatter(dataTokenInspectDW?.cex_in_flow_in_usdt || 0)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow self-stretch px-6 py-4 w-full rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 max-md:px-5 max-md:mt-6 max-md:max-w-full">
              <div className="flex gap-5 justify-between pb-2 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto text-xl font-semibold tracking-tight leading-8 text-gray-300">
                  Sell vs Buy
                </div>
                <DateGroup
                  dataSource={DATA_DATE}
                  active={durationSellBuy}
                  handleActive={setDurationSellBuy}
                />
              </div>
              <div className="flex gap-5 justify-between py-4 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-between text-lg tracking-tight leading-8 text-white basis-0">
                  <div>{percentSell}%</div>
                  <div className="mt-56 max-md:mt-10">{percentBuy}%</div>
                </div>
                <div className="h-full w-[30px]">
                  <div style={{ height: `${percentSell}%` }} className="bg-semantic-error-1"></div>
                  <div style={{ height: `${percentBuy}%` }} className="bg-primary-2"></div>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 w-full rounded-lg border border-solid border-secondary-1 max-md:pr-5">
                    <div className="text-2xl leading-9 text-red-400">Sell</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <ImageToken
                        symbol={dataTokenInfo?.symbol}
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>
                          {numeral(dataTokenInspectBS?.out_flow_in_token || 0).format('0,0.00')}
                        </div>
                        <div>${nFormatter(dataTokenInspectBS?.out_flow_in_usdt || 0)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start py-2 pr-20 pl-4 mt-14 w-full rounded-lg border border-solid border-secondary-4 max-md:pr-5 max-md:mt-10">
                    <div className="text-2xl leading-9 text-stone-400">Buy</div>
                    <div className="flex gap-2 text-lg tracking-tight leading-8 text-gray-300">
                      <ImageToken
                        symbol={dataTokenInfo?.symbol}
                        className="my-auto w-10 aspect-square"
                      />
                      <div className="flex flex-col flex-1 justify-center">
                        <div>
                          {numeral(dataTokenInspectBS?.in_flow_in_token || 0).format('0,0.00')}
                        </div>
                        <div>${nFormatter(dataTokenInspectBS?.in_flow_in_usdt || 0)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
