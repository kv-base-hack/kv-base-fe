import { DataTable } from '@/components/common/DataTable'
import { columnsActivity } from '@/components/common/DataTable/columnsActivity'
import { columnsPerformanceToken } from '@/components/common/DataTable/columnsPerformanceToken'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { DateGroup } from '@/components/common/DateGroup'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectChain } from '@/components/common/SelectChain'
import { TopCoin } from '@/components/common/TopCoin'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { cn } from '@/lib/utils'
import { useTopActivityQuery } from '@/query/onchain-signal/getTopActivity'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState } from 'react'
import SmartMoneyTopPerformingIcon from '@/components/shared/icons/dashboard/SmartMoneyTopPerformingIcon'
import SmartMoneyActivityIcon from '@/components/shared/icons/dashboard/SmartMoneyActivityIcon'
import { SelectSmartMoney } from '@/components/common/SelectSmartMoney'

export const Route = createFileRoute('/smartmoney-onchain/onchain-signals')({
  component: OnchainSignals,
})

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
function OnchainSignals() {
  const [tab, setTabs] = useState('smart_money')
  const CHAIN = useAtomValue(chainAtom)

  const [pageActivity, setPageActivity] = useState(1)
  const [pageTopProfit, setPageTopProfit] = useState(1)
  const [filterDate, setFilterDate] = useState('24h')
  const [filterActivity, setFilterActivity] = useState('all')

  const activityQuery = useTopActivityQuery({
    action: filterActivity,
    limit: 10,
    start: pageActivity,
    chain: CHAIN,
  })
  const dataActivity = activityQuery.data?.data.activities || []
  const totalActivity = activityQuery.data?.data.total || 1
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
          tab === 'smart_money' ? 'Smartmoney Onchain Dashboard' : 'InsiderTrade Onchain Dashboard'
        }
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
        <SelectChain />
      </GroupHeader>
      {/* top coin */}
      <Suspense fallback={<div>Loading...</div>}>
        {tab === 'smart_money' ? <TopCoin className="mx-10 mt-4" /> : null}
      </Suspense>
      {/* table */}
      {tab === 'smart_money' ? (
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
                isFetching={topTokenProfitQuery.isFetching}
                noneBorder
                noneBgHeader
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
      ) : (
        <div className="m-10">
          <WrapTable
            icon={<SmartMoneyTopPerformingIcon />}
            title="Insider Trade’s Activity"
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
                columns={columnsActivity}
                data={dataActivity}
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
        </div>
      )}
      {tab === 'smart_money' ? (
        <div className="m-10">
          <WrapTable
            icon={<SmartMoneyActivityIcon />}
            title={
              tab === 'smart_money' ? (
                <div className="flex items-center gap-4">
                  <div>Smart Money’s Activity</div>
                  <SelectSmartMoney value="All Smart Money" setValue={() => null} />
                </div>
              ) : (
                'Insider Trade’s Activity'
              )
            }
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
                columns={columnsActivity}
                data={dataActivity}
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
        </div>
      ) : (
        <div className="m-10">
          <WrapTable
            icon={<SmartMoneyActivityIcon />}
            title="Insider Trade's Top Performing Tokens"
            childHeader={
              <DateGroup dataSource={DATA_DATE} active={filterDate} handleActive={setFilterDate} />
            }>
            <div className="mt-8">
              <DataTable
                className="text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap bg-neutral-07/50"
                columns={columnsPerformanceToken}
                data={dataTopTokenProfit}
                isFetching={topTokenProfitQuery.isFetching}
                noneBorder
                noneBgHeader
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
      )}
    </div>
  )
}
