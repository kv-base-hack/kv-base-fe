'use client'

import { chainAtom } from '@/atom/chain'
import { DataTable } from '@/components/common/DataTable'
import { columnsListToken } from '@/components/common/DataTable/columnsListToken'
import { WrapTableTab } from '@/components/common/DataTable/WrapTableTab'
import { DialogSelectToken } from '@/components/common/Dialog/DialogSelectToken'
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
    <div className="w-full h-full pt-2">
      {/* header */}
      <GroupHeader
        className="mt-4 mx-10"
        title="Token Explorer"
        desc="Enter a token name, contract address and explore in-depth dashboards with relevant price data, exchange inflow and outflow, holder analysis interactive graph, top transactions, top balance changes, and more!"
      ></GroupHeader>
      <DialogSelectToken />
      {/* table */}
      <div className="mx-10 mt-4 pb-10">
        <WrapTableTab>
          <div className="mt-8">
            <DataTable
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
              columns={columnsListToken(page, perPage)}
              data={dataToken || []}
              isFetching={trendingTokenQuery.isFetching}
              emptyData="No results."
            />
          </div>
          <PaginationTable
            className="mt-8"
            currentPage={page}
            updatePage={() => null}
            pageSize={perPage}
            total={10}
            setPage={setPage}
          />
        </WrapTableTab>
      </div>
    </div>
  )
}
