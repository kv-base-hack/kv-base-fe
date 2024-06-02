import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import {
  Portfolio,
  columnsPortfolio,
} from '@/components/common/DataTable/columnsPortfolio'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import AssetsIcon from '@/components/shared/icons/wallet-explorer/AssetsIcon'
import { usePortfolioQuery } from '@/query/wallet-explorer/getPortfolio'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'
import { useState } from 'react'

type PortfolioProps = {
  address: string
  chain: string
}

export const PortfolioComp: React.FC<PortfolioProps> = ({ address, chain }) => {
  // get data portfolio
  const portfolioQuery = usePortfolioQuery(address)
  const portfolio = (portfolioQuery.data as Portfolio[]) || []
  // get user balance
  const userBalanceQuery = useGetUserBalanceQuery({
    address,
    chain,
  })
  const userBalance = userBalanceQuery?.data?.data

  // pagination portfolio in FE
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  const totalPages = userBalance?.tokens?.length || 0

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const getVisibleItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return userBalance?.tokens?.slice(startIndex, endIndex)
  }

  const dataSource = userBalanceQuery?.isFetching
    ? [...(Array(6).keys() as any)]
    : getVisibleItems() || []

  return (
    <WrapTable className="justify-start" icon={<AssetsIcon />} title="Assets">
      <div className="mt-8">
        {portfolio ? (
          <DataTable
            className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
            columns={columnsPortfolio}
            data={dataSource}
            noneBorder
            noneBgHeader
            emptyData="No results."
            isFetching={userBalanceQuery.isFetching}
          />
        ) : null}
        <PaginationTable
          className="mt-8"
          currentPage={currentPage}
          updatePage={(page: number) => handlePageChange(page)}
          pageSize={itemsPerPage}
          total={totalPages}
          setPage={setCurrentPage}
        />
      </div>
    </WrapTable>
  )
}
