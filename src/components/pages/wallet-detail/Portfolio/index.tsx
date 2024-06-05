import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import {
  Portfolio,
  columnsPortfolio,
} from '@/components/common/DataTable/columnsPortfolio'
import { PaginationCustom } from '@/components/common/Pagination'
import AssetsIcon from '@/components/shared/icons/wallet-explorer/AssetsIcon'
import { usePortfolioQuery } from '@/query/wallet-explorer/getPortfolio'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type PortfolioProps = {
  address: string
  chain: string
}

export const PortfolioComp: React.FC<PortfolioProps> = ({ address, chain }) => {
  // get data portfolio
  const portfolioQuery = usePortfolioQuery(address)
  const portfolio = (portfolioQuery.data as any) || []
  // get user balance
  const userBalanceQuery = useQuery(
    useGetUserBalanceQuery({
      address: address,
      chain,
    }),
  )
  const userBalance = userBalanceQuery?.data

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
    <WrapTable
      className="justify-start h-full"
      icon={<AssetsIcon />}
      title="Assets"
    >
      <div className="mt-4 flex flex-col justify-between h-full">
        {portfolio ? (
          <DataTable
            className="text-xs font-bold tracking-normal leading-4 text-neutral-07"
            columns={columnsPortfolio}
            data={dataSource}
            noneBorder
            noneBgHeader
            emptyData="No results."
            isFetching={userBalanceQuery.isFetching}
          />
        ) : null}
        <PaginationCustom
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
