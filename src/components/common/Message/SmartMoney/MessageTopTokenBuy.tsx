import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { useState } from 'react'
import SmartMoneyTopBuyIcon from '@/components/shared/icons/dashboard/SmartMoneyTopBuyIcon'
import { TableTopTokenBuy } from '@/components/common/DataTable/TableTopTokenBuy'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { TopTokenBuy } from '@/types/top-token'

export const MessageTopTokenBuy = ({
  data,
  total,
}: {
  data: TopTokenBuy[]
  total: number
}) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)

  return (
    <WrapTable
      title="Smart Traders Top Buys"
      info=""
      icon={<SmartMoneyTopBuyIcon />}
    >
      <div className="mt-8 h-full">
        <TableTopTokenBuy
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
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </WrapTable>
  )
}
