import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '../Pagination/PaginationTable'

export const RenderTableFindGemsByTab = ({
  tab,
  page,
  setPage,
  perPage,
  dataTable,
  total,
  isFetching,
  columns,
}: {
  tab: string
  page: number
  perPage: number
  setPage: (page: number) => void
  dataTable: any
  total: number
  isFetching: boolean
  columns: any
}) => {
  return (
    <div>
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columns}
        data={dataTable || []}
        isFetching={isFetching}
        emptyData="No results."
        noneBorder
        noneBgHeader
      />
      <PaginationTable
        className="mt-2"
        currentPage={page}
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </div>
  )
}
