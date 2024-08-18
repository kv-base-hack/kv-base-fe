'use client'

import { chainAtom } from '@/atom/chain'
import { DataTable } from '@/components/common/DataTable'
import { columnsListToken } from '@/components/common/DataTable/columnsListToken'
import { WrapTableTab } from '@/components/common/DataTable/WrapTableTab'

import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useTrendingTokenQuery } from '@/query/wallet-explorer/getTrendingToken'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

export default function TokenExplorer() {
  const CHAIN = useAtomValue(chainAtom)

  const trendingTokenQuery = useTrendingTokenQuery({
    chain: CHAIN,
  })
  const dataToken = trendingTokenQuery.data?.data?.trending_tokens || []
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)

  return (
    <div className="h-full w-full pt-2">
      {/* header */}
      <GroupHeader
        className="mx-10 mt-4"
        title="Token Explorer"
        desc="Enter a token name, contract address and explore in-depth dashboards with relevant price data, exchange inflow and outflow, holder analysis interactive graph, top transactions, top balance changes, and more!"
      ></GroupHeader>
      {/* table */}
      <div className="mx-10 mt-4 pb-10">
        <WrapTableTab>
          <div className="mt-8">
            <DataTable
              className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
              columns={columnsListToken(page, perPage)}
              data={dataToken || []}
              isFetching={trendingTokenQuery.isFetching}
              emptyData="No results."
            />
          </div>
          <PaginationTable
            className="mt-8"
            currentPage={page}
            pageSize={perPage}
            total={10}
            setPage={setPage}
          />
        </WrapTableTab>
      </div>
    </div>
  )
}
