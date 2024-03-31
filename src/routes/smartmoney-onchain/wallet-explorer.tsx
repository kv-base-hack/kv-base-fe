import { DataTable } from '@/components/common/DataTable'
import { WrapTableNoTitle } from '@/components/common/DataTable/WrapTableNoTitle'
import { columnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'
import { GroupHeader } from '@/components/common/GroupHeader'
import { PaginationCustom } from '@/components/common/Pagination'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/smartmoney-onchain/wallet-explorer')({
  component: WalletExplorer,
})

function WalletExplorer() {
  const [page, setPage] = useState(1)
  const CHAIN = useAtomValue(chainAtom)
  //
  const leaderboardQuery = useLeaderboardQuery({
    start: page,
    limit: 10,
    chain: CHAIN,
  })
  const dataLeaderboard = leaderboardQuery.data?.data.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = leaderboardQuery.data?.data.total || 1
  //

  return (
    <div className="w-full h-full pt-2">
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
            <DataTable
              className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
              columns={columnsLeaderboard}
              data={dataLeaderboard || []}
              isFetching={leaderboardQuery.isFetching}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          </div>
          <PaginationCustom
            className="mt-8"
            currentPage={page}
            updatePage={(page: number) => setPage(page)}
            pageSize={10}
            total={totalLeaderboard}
            setPage={setPage}
          />
        </WrapTableNoTitle>
      </div>
    </div>
  )
}
