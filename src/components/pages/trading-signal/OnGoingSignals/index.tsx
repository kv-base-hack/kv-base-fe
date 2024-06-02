import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { columnsOngoingSignal } from '@/components/common/DataTable/columnsOnGoingSignal'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useGetOnGoingSignalQuery } from '@/query/trading-signal/getOngoingSignal'
import { useState } from 'react'

export const OngoingSignals = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)

  const dataSignalQuery: any = useGetOnGoingSignalQuery({ id, page, perPage })
  const total = dataSignalQuery?.data?.data?.metadata?.total || 0
  const dataOngoingSignal = dataSignalQuery.isFetching
    ? [...Array(10).keys()]
    : dataSignalQuery?.data?.data?.data

  return (
    <WrapTable title="">
      <DataTable
        className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
        columns={columnsOngoingSignal}
        data={dataOngoingSignal || []}
        isFetching={dataSignalQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
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
