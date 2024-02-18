import { DataTable } from '@/components/common/DataTable'
import {
  columnsSmartMoneyRanking,
  SmartMoneyRanking,
} from '@/components/common/DataTable/columnsSmartMoneyRanking'
import { WrapTableNoTitle } from '@/components/common/DataTable/WrapTableNoTitle'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import { smartMoneyRankingQueryOptions } from '@/query/wallet-explorer/getSmartMoneyRanking'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/onchain-discovery/wallet-explorer')({
  loader: async ({ context: { queryClient } }: any) =>
    queryClient.ensureQueryData(smartMoneyRankingQueryOptions),
  component: WalletExplorer,
})

function WalletExplorer() {
  const smartMoneyRankingQuery = useSuspenseQuery(smartMoneyRankingQueryOptions)
  const dataSmartMoneyRanking = smartMoneyRankingQuery.data as SmartMoneyRanking[]
  const [page, setPage] = useState(1)

  return (
    <div className="w-full h-full">
      {/* header */}
      <GroupHeader
        className="mt-4 mx-10"
        title="Wallet Explorer"
        desc="Enter any address, ENS  and track, analyze and discover the address portfolio, latest activity, entity analysis, address entity graph, AML risk score and more!"></GroupHeader>
      <div className="flex flex-col mx-10 my-4 justify-center py-2 text-base font-semibold tracking-normal leading-6 text-gray-500 rounded-xl border border-solid shadow-2xl backdrop-blur-lg bg-gray-300 bg-opacity-10 border-white/10 max-w-[360px]">
        <div className="flex gap-3 justify-between px-2">
          <SearchIcon />
          <input
            className="flex-auto bg-transparent outline-none text-neutral-01"
            placeholder="Search address"
          />
        </div>
      </div>
      {/* table */}
      <div className="mx-10 mb-10 mt-4">
        <WrapTableNoTitle>
          <div className="mt-8">
            {dataSmartMoneyRanking ? (
              <DataTable
                className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
                columns={columnsSmartMoneyRanking}
                data={dataSmartMoneyRanking}
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
        </WrapTableNoTitle>
      </div>
    </div>
  )
}
