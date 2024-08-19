import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'
import { useState } from 'react'
import { columnsTradeStatisticToken } from '../Statistic/columns-trade-statistic-token'

type PortfolioProps = {
  address: string
  chain: string
  hideSmallAsset: boolean
}

export const PortfolioComp: React.FC<PortfolioProps> = ({
  address,
  chain,
  hideSmallAsset,
}) => {
  const [sort, setSort] = useState('')
  // pagination portfolio in FE
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  // get user balance
  const userBalanceQuery = useGetUserBalanceQuery({
    address,
    chain,
    page: currentPage,
    perPage: itemsPerPage,
  })
  const userBalance = userBalanceQuery?.data?.data

  const totalPages = userBalance?.tokens?.length || 0

  const getVisibleItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return userBalance?.tokens?.slice(startIndex, endIndex)
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
        currentPage={currentPage}
        pageSize={itemsPerPage}
        total={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  )
}
