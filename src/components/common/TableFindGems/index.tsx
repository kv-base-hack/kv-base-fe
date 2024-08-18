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
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={dataTable || []}
          isFetching={isFetching}
          emptyData="No results."
          noneBorder
          noneBgHeader
        />
      </div>
      <PaginationTable
        className="mt-4"
        currentPage={page}
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </div>
  )
}
