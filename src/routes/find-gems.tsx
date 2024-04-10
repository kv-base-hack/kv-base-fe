import { chainAtom } from '@/atom/chain'
import { DataTable } from '@/components/common/DataTable'
import { columnsFindGemsDeposit } from '@/components/common/DataTable/columnsFindGemsDeposit'
import { columnsFindGemsTrending } from '@/components/common/DataTable/columnsFindGemsTrending'
import { columnsFindGemsUnusualCex } from '@/components/common/DataTable/columnsFindGemsUnusualCex'
import { columnsFindGemsWithdraw } from '@/components/common/DataTable/columnsFindGemsWithdraw'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectChain } from '@/components/common/SelectChain'
import { cn } from '@/lib/utils'
import { useFindGemsDepositQuery } from '@/query/find-gems/getFindGemsDeposit'
import { useFindGemsTrendingQuery } from '@/query/find-gems/getFindGemsTrending'
import { useFindGemsUnusualCexQuery } from '@/query/find-gems/getFindGemsUnusualCex'
import { useFindGemsWithdrawQuery } from '@/query/find-gems/getFindGemsWithdraw'
import { createFileRoute } from '@tanstack/react-router'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

export const Route = createFileRoute('/find-gems')({
  component: FindGems,
})

const DATA_TAB = [
  'Top CEX Withdraw',
  'Top CEX Deposit',
  'Unusual CEX',
  'Top Trending',
  'Insider Trade',
  'SM Top Buys',
  'SM Top Sells',
]

const RenderTableByTab = ({
  page,
  setPage,
  dataTable,
  total,
  isFetching,
  columns,
}: {
  page: number
  setPage: (page: number) => void
  dataTable: any
  total: number
  isFetching: boolean
  columns: any
}) => {
  return (
    <div className="mx-10 mt-4 p-4 mb-10 flex flex-col self-stretch text-base leading-6 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/30 border-white/10">
      <DataTable
        className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
        columns={columns}
        data={dataTable || []}
        isFetching={isFetching}
        emptyData="No results."
      />
      <PaginationCustom
        className="mt-8"
        currentPage={page}
        updatePage={(page: number) => setPage(page)}
        pageSize={10}
        total={total}
        setPage={setPage}
      />
    </div>
  )
}

function FindGems() {
  const CHAIN = useAtomValue(chainAtom)
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState(0)

  // withdraw
  const findGemsWithdrawQuery = useFindGemsWithdrawQuery({
    limit: 10,
    start: page,
    chain: CHAIN,
    enabled: activeTab === 0,
  })
  const dataFindGemsWithdraw = findGemsWithdrawQuery.data?.data.top_cex_withdraw || []
  const totalFindGemWithdraw = findGemsWithdrawQuery.data?.data.total || 1

  // deposit
  const findGemsDepositQuery = useFindGemsDepositQuery({
    limit: 10,
    start: page,
    chain: CHAIN,
    enabled: activeTab === 1,
  })
  const dataFindGemsDeposit = findGemsDepositQuery.data?.data.top_cex_deposit || []
  const totalFindGemDeposit = findGemsDepositQuery.data?.data.total || 1

  // unusual cex
  const findGemsUnusualCexQuery = useFindGemsUnusualCexQuery({
    limit: 10,
    start: page,
    chain: CHAIN,
    enabled: activeTab === 2,
  })
  const dataFindGemsUnusualCex = findGemsUnusualCexQuery.data?.data.top_unusual_cex || []
  const totalFindGemUnusualCex = findGemsUnusualCexQuery.data?.data.total || 1

  // trending
  const findGemsTrendingQuery = useFindGemsTrendingQuery({
    limit: 10,
    start: page,
    chain: CHAIN,
    enabled: activeTab === 3,
  })
  const dataFindGemsTrending = findGemsTrendingQuery.data?.data.trending_tokens || []
  const totalFindGemTrending = findGemsTrendingQuery.data?.data.total || 1

  const handleActiveTab = (index: number) => () => {
    setActiveTab(index)
    setPage(1)
  }

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <RenderTableByTab
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsWithdraw}
            total={totalFindGemWithdraw}
            isFetching={findGemsWithdrawQuery.isFetching}
            columns={columnsFindGemsWithdraw}
          />
        )
      case 1:
        return (
          <RenderTableByTab
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsDeposit}
            total={totalFindGemDeposit}
            isFetching={findGemsDepositQuery.isFetching}
            columns={columnsFindGemsDeposit}
          />
        )
      case 2:
        return (
          <RenderTableByTab
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsUnusualCex}
            total={totalFindGemUnusualCex}
            isFetching={findGemsUnusualCexQuery.isFetching}
            columns={columnsFindGemsUnusualCex}
          />
        )
      case 3:
        return (
          <RenderTableByTab
            page={page}
            setPage={setPage}
            dataTable={dataFindGemsTrending}
            total={totalFindGemTrending}
            isFetching={findGemsTrendingQuery.isFetching}
            columns={columnsFindGemsTrending}
          />
        )
      default:
        return (
          <RenderTableByTab
            page={page}
            setPage={setPage}
            dataTable={[]}
            total={1}
            isFetching={false}
            columns={columnsFindGemsTrending}
          />
        )
    }
  }

  const renderHint = () => {
    switch (activeTab) {
      case 0:
        return 'Here is a list tokens with the highest net withdrawals from exchanges in the last 24 hours'
      case 1:
        return 'Here is a list tokens with the highest net deposits  from exchanges in the last 24 hours'
      case 2:
        return 'Here is a list tokens in Unusual CEX Flows 24H (Tokens having: |CEX Netflow| > 5% of Trading Vol in 24H) Price can be strongly volatile later. Note: CEX Netflow = Deposit Vol - Withdraw Vol.'
      default:
        return 'Here is a list tokens buy by smart money in the last 24h'
    }
  }

  return (
    <div className="w-full h-full pt-2">
      <GroupHeader className="mt-4 mx-10" title="Find Gems">
        <SelectChain />
      </GroupHeader>
      <div className="flex px-10 mt-4 flex-col text-base tracking-normal leading-6">
        <div className="flex bg-[url('/assets/images/bg-tabs.svg')] overflow-hidden relative flex-col justify-center px-4 w-full font-semibold text-neutral-04 rounded-lg min-h-[55px] max-md:max-w-full">
          <div className="flex relative gap-4 justify-between max-md:flex-wrap">
            {DATA_TAB.map((item, index) => (
              <div
                key={index}
                onClick={handleActiveTab(index)}
                className="flex flex-col cursor-pointer justify-between pt-3">
                <div>{item}</div>
                <div
                  className={cn(
                    'shrink-0 mt-4 h-1 rounded-sm',
                    activeTab === index ? 'bg-amber-200' : ''
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-neutral-01 max-md:flex-wrap">
          <div className="my-auto max-md:max-w-full">{renderHint()}</div>
          {activeTab !== 2 ? (
            <div className="justify-center px-4 py-2 font-bold rounded-xl border-2 border-solid bg-neutral-07/30 border-white/10">
              Add Filter
            </div>
          ) : null}
        </div>
      </div>
      {renderTab()}
    </div>
  )
}
