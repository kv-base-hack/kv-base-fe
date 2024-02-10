import { DataTable } from '@/components/common/DataTable'
import { columnsListToken, ListToken } from '@/components/common/DataTable/columnsListToken'
import { WrapTableTab } from '@/components/common/DataTable/WrapTableTab'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import { listTokenQueryOptions } from '@/query/wallet-explorer/getListToken'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/onchain-discovery/token-explorer')({
  loader: async ({ context: { queryClient } }: any) =>
    queryClient.ensureQueryData(listTokenQueryOptions),
  component: TokenExplorer,
})

function TokenExplorer() {
  const listTokenQuery = useSuspenseQuery(listTokenQueryOptions)
  const dataToken = listTokenQuery.data as ListToken[]
  const [page, setPage] = useState(1)

  return (
    <div className="w-full h-full">
      {/* header */}
      <GroupHeader
        className="mt-4 mx-10"
        title="Token Explorer"
        desc="Enter a token name, contract address and explore in-depth dashboards with relevant price data, exchange inflow and outflow, holder analysis interactive graph, top transactions, top balance changes, and more!"></GroupHeader>
      <div className="flex flex-col mx-10 my-4 justify-center py-2 text-base font-semibold tracking-normal leading-6 text-gray-500 rounded-xl border border-solid shadow-2xl backdrop-blur-lg bg-gray-300 bg-opacity-10 border-white/10 max-w-[360px]">
        <div className="flex gap-3 justify-between px-2">
          <SearchIcon />
          <div className="flex-auto">Search address</div>
        </div>
      </div>
      {/* table */}
      <div className="mx-10 mt-4 mb-10">
        <WrapTableTab>
          <div className="mt-8">
            {dataToken ? (
              <DataTable
                className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-zinc-800 bg-neutral-07/50"
                columns={columnsListToken}
                data={dataToken}
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
        </WrapTableTab>
      </div>
    </div>
  )
}
