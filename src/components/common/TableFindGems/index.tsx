import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '../Pagination/PaginationTable'
import { WrapTable } from '../DataTable/WrapTable'
import SmartMoneyActivityIcon from '@/components/shared/icons/dashboard/SmartMoneyActivityIcon'
import { SelectDuration } from '../Select/SelectDuration'
import { useState } from 'react'
import {
  DialogFilterSpecificToken,
  FilterValue,
} from '../Dialog/DialogFilterSpecificToken'
import { useAtom } from 'jotai'
import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'

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
  const [duration, setDuration] = useAtom(gemDurationAtom)
  const [filter, setFilter] = useAtom(gemFilterAtom)

  const handleOk = (filter: FilterValue) => {
    setFilter(filter)
  }

  return (
    <WrapTable
      title={tab}
      icon={<SmartMoneyActivityIcon />}
      childHeader={
        <div className="flex items-center gap-4">
          <DialogFilterSpecificToken filterVal={filter} handleOk={handleOk}>
            <div className="flex items-center h-10 w-auto cursor-pointer px-4 my-auto text-base font-medium tracking-normal leading-6 text-gray-300 whitespace-nowrap border border-solid backdrop-blur-[50px] bg-neutral-07/50 border-white/10 rounded-[360px]">
              Add Filter
            </div>
          </DialogFilterSpecificToken>
          <SelectDuration duration={duration} setDuration={setDuration} />
        </div>
      }
      className="mx-10 mt-8"
    >
      <div className="mt-8">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columns}
          data={dataTable || []}
          isFetching={isFetching}
          emptyData="No results."
          noneBorder
          noneBgHeader
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
