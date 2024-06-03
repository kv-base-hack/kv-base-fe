'use client'

import { DataTable } from '@/components/common/DataTable'
import { WrapTableNoTitle } from '@/components/common/DataTable/WrapTableNoTitle'
import { columnsLeaderboard } from '@/components/common/DataTable/columnLeaderboard'
import { GroupHeader } from '@/components/common/GroupHeader'
import SearchIcon from '@/components/shared/icons/SearchIcon'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'

import { useState } from 'react'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useQuery } from '@tanstack/react-query'

export default function WalletExplorer() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('')
  const [perPage] = useState(10)
  const CHAIN = useAtomValue(chainAtom)
  //
  const dataLeaderboardQuery = useQuery(
    useLeaderboardQuery({
      chain: 'solana',
      limit: 10,
      start: page,
      sortBy,
      token_addresses: '',
    }),
  )

  const dataLeaderboard = dataLeaderboardQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : dataLeaderboardQuery.data?.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = dataLeaderboardQuery.data?.total || 1
  //

  return (
    <div className="w-full h-full pt-2">
      {/* header */}
      <GroupHeader
        className="mt-4 mx-10"
        title="Wallet Explorer"
        desc="Enter any address, ENS  and track, analyze and discover the address portfolio, latest activity, entity analysis, address entity graph, AML risk score and more!"
      ></GroupHeader>
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
              columns={columnsLeaderboard(page, perPage, setSortBy)}
              data={dataLeaderboard || []}
              isFetching={dataLeaderboardQuery.isFetching}
              noneBorder
              noneBgHeader
              emptyData="No results."
            />
          </div>
          <PaginationTable
            className="mt-8"
            currentPage={page}
            updatePage={(page: number) => setPage(page)}
            pageSize={perPage}
            total={totalLeaderboard}
            setPage={setPage}
          />
        </WrapTableNoTitle>
      </div>
    </div>
  )
}
