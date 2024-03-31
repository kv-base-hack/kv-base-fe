import { DataTable } from '@/components/common/DataTable'
import { columnsFindGems } from '@/components/common/DataTable/columnsFindGems'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectChain } from '@/components/common/SelectChain'
import { useTrendingTokenQuery } from '@/query/wallet-explorer/getTrendingToken'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/find-gems')({
  component: FindGems,
})

function FindGems() {
  const trendingTokenQuery = useTrendingTokenQuery()
  const dataToken = trendingTokenQuery.data?.data?.trending_tokens || []
  const [page, setPage] = useState(1)

  return (
    <div className="w-full h-full pt-2">
      <GroupHeader className="mt-4 mx-10" title="Find Gems">
        <SelectChain />
      </GroupHeader>
      <div className="flex px-10 mt-4 flex-col text-base tracking-normal leading-6">
        <div className="flex bg-[url('/assets/images/bg-tabs.svg')] overflow-hidden relative flex-col justify-center px-4 w-full font-semibold text-neutral-04 rounded-lg min-h-[55px] max-md:max-w-full">
          <div className="flex relative gap-4 justify-between max-md:flex-wrap">
            <div className="flex flex-col justify-between pt-3 text-white">
              <div>Top CEX Withdraw</div>
              <div className="shrink-0 mt-4 h-1 bg-amber-200 rounded-sm" />
            </div>
            <div className="flex flex-col justify-between pt-3">
              <div>Top CEX Deposit</div>
              <div className="shrink-0 mt-4 h-1 rounded-sm bg-primary-2 bg-opacity-0" />
            </div>
            <div className="flex flex-col justify-between pt-3">
              <div>Unusual CEX</div>
              <div className="shrink-0 mt-4 h-1 rounded-sm bg-primary-2 bg-opacity-0" />
            </div>
            <div className="flex flex-col justify-between pt-3">
              <div>Top Trending</div>
              <div className="shrink-0 mt-4 h-1 rounded-sm bg-primary-2 bg-opacity-0" />
            </div>
            <div className="flex flex-col justify-between pt-3">
              <div>Insider Trade</div>
              <div className="shrink-0 mt-4 h-1 rounded-sm bg-primary-2 bg-opacity-0" />
            </div>
            <div className="flex flex-col justify-between pt-3">
              <div>SM Top Buys</div>
              <div className="shrink-0 mt-4 h-1 rounded-sm bg-primary-2 bg-opacity-0" />
            </div>
            <div className="flex flex-col justify-between pt-3">
              <div>SM Top Sells</div>
              <div className="shrink-0 mt-4 h-1 rounded-sm bg-primary-2 bg-opacity-0" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-5 mt-4 text-neutral-01 max-md:flex-wrap">
          <div className="my-auto max-md:max-w-full">
            Here is a list tokens with the highest net withdrawals from exchanges in the last 24
            hours
          </div>
          <div className="justify-center px-4 py-2 font-bold rounded-xl border-2 border-solid bg-neutral-07/30 border-white/10">
            Add Filter
          </div>
        </div>
      </div>
      <div className="mx-10 mt-4 p-4 mb-10 flex flex-col self-stretch text-base leading-6 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/30 border-white/10">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columnsFindGems}
          data={dataToken || []}
          isFetching={trendingTokenQuery.isFetching}
          emptyData="No results."
        />
        <PaginationCustom
          className="mt-8"
          currentPage={page}
          updatePage={() => null}
          pageSize={10}
          total={10}
          setPage={setPage}
        />
      </div>
    </div>
  )
}
