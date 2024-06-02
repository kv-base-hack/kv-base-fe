import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { useState } from 'react'
import SmartMoneyTopSellIcon from '@/components/shared/icons/dashboard/SmartMoneyTopSellIcon'
import { TableTopTokenSell } from '@/components/common/DataTable/TableTopTokenSell'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { TopTokenSell } from '@/types/top-token'
import { PaginationTable } from '../../Pagination/PaginationTable'

export const MessageTopTokenSell = ({
  data,
  total,
}: {
  data: TopTokenSell[]
  total: number
}) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)

  return (
    <WrapTable
      title="Smart Money Top Sells"
      info=""
      icon={<SmartMoneyTopSellIcon />}
    >
      <div className="mt-8 h-full">
        <TableTopTokenSell
          page={page}
          perPage={perPage}
          data={data}
          duration=""
          setSortBy={() => {}}
        />
      </div>
      <PaginationTable
        className="mt-8"
        currentPage={page}
        updatePage={(page: number) => setPage(page)}
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </WrapTable>
  )
}
