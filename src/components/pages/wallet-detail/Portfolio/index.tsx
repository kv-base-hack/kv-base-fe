'use client'

import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { CHAIN } from '@/constant/chain'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { columnsTradeStatisticToken } from '../Statistic/columns-trade-statistic-token'

type PortfolioProps = {
  address: string
}

export const PortfolioComp: React.FC<PortfolioProps> = ({ address }) => {
  const [, setSort] = useState('')
  // pagination portfolio in FE
  const [page, setPage] = useState(1)
  const [itemsPerPage] = useState(8)
  // get user balance
  const userBalanceQuery = useQuery(
    useGetUserBalanceQuery({
      address,
      chain: CHAIN,
      page: 1,
      perPage: 10,
    }),
  )
  const userBalance = userBalanceQuery?.data?.balances

  const totalPages = userBalance?.length || 0

  const getVisibleItems = () => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return userBalance?.slice(startIndex, endIndex)
  }

  const dataSource = userBalanceQuery?.isFetching
    ? [...(Array(6).keys() as any)]
    : getVisibleItems() || []

  return (
    <div className="flex h-full flex-col justify-between">
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsTradeStatisticToken(setSort)}
        data={dataSource}
        noneBorder
        noneBgHeader
        emptyData="No results."
        isFetching={userBalanceQuery.isFetching}
      />
      <PaginationTable
        className="mt-4"
        currentPage={page}
        pageSize={itemsPerPage}
        total={totalPages}
        setPage={setPage}
      />
    </div>
  )
}
