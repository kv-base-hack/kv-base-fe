import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { columnsSignalTriggered } from '@/components/common/DataTable/columnsSignalTriggered'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useGetSignalTriggeredQuery } from '@/query/trading-signal/getSignalTriggered'
import { useState } from 'react'

export const SignalTriggered = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const dataSignalQuery: any = useGetSignalTriggeredQuery({ id, page, perPage })

  const dataSignalTriggered = dataSignalQuery.isFetching
    ? [...Array(10).keys()]
    : dataSignalQuery?.data?.data?.data

  const total = dataSignalQuery?.data?.data?.metadata?.total || 0

  return (
    <WrapTable title="">
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsSignalTriggered}
        data={dataSignalTriggered || []}
        isFetching={dataSignalQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
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
