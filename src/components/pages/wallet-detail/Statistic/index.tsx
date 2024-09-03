'use client'

import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useTradeStatisticTokensQuery } from '@/query/wallet-explorer/getTradeStatisticTokens'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { columnsTradeStatisticToken } from './columns-trade-statistic-token'

type StatisticProps = {
  address: string
  chain: string
  filterDate: string
  filterListToken: string
}

export const Statistic: React.FC<StatisticProps> = ({
  address,
  chain,
  filterDate,
  filterListToken,
}) => {
  const [sort, setSort] = useState('')

  const tradeStatisticTokensQuery = useQuery(
    useTradeStatisticTokensQuery({
      address,
      chain,
      duration: filterDate,
      token_address: filterListToken,
      sort_by: sort,
    }),
  )
  const tradeStatisticTokens = tradeStatisticTokensQuery?.data

  // pagination portfolio in FE
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  const totalPages = tradeStatisticTokens?.token_stats?.length || 0

  const getVisibleItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return tradeStatisticTokens?.token_stats?.slice(startIndex, endIndex)
  }

  const dataSource = tradeStatisticTokensQuery?.isFetching
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
        isFetching={tradeStatisticTokensQuery?.isFetching}
      />
      <PaginationTable
        className="mt-4"
        currentPage={currentPage}
        pageSize={itemsPerPage}
        total={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  )
}
