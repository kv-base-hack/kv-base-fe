import { chainAtom } from '@/atom/chain'
import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { columnsPortfolio } from '@/components/common/DataTable/columnsPortfolio'
import { PaginationCustom } from '@/components/common/Pagination'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import AssetsIcon from '@/components/shared/icons/wallet-explorer/AssetsIcon'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'

type PortfolioProps = {
  address: string
  chain: string
}

export const PortfolioComp: React.FC<PortfolioProps> = ({ address, chain }) => {
  // pagination portfolio in FE
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const CHAIN = useAtomValue(chainAtom)
  // get user balance
  const userBalanceQuery = useQuery(
    useGetUserBalanceQuery({
      address,
      chain,
      page: currentPage,
      perPage: itemsPerPage,
      duration: '24h',
    }),
  )
  const userBalance = userBalanceQuery?.data

  const totalPages = userBalance?.tokens?.length || 0

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const getVisibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return userBalance?.tokens?.slice(startIndex, endIndex)
  }, [currentPage, itemsPerPage, userBalance?.tokens])

  const dataSource = userBalanceQuery?.isFetching
    ? [...(Array(8).keys() as any)]
    : getVisibleItems || []

  return (
    <WrapTable
      className="justify-start h-full"
      icon={<AssetsIcon />}
      title="Assets"
    >
      <div className="mt-4 h-full flex flex-col justify-between">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columnsPortfolio(CHAIN)}
          data={dataSource}
          noneBorder
          noneBgHeader
          emptyData="No results."
          isFetching={userBalanceQuery.isFetching}
        />
        <PaginationCustom
          className="mt-4"
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
