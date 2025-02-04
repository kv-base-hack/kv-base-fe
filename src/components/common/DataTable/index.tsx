import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React from 'react'

import SkeletonCell from '@/components/common/Skeleton/SkeletonCell'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { SortIcon } from '@/components/shared/icons/SortIcon'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isFetching?: boolean
  className?: string
  rowClassName?: string
  noneBgHeader?: boolean
  noneBorder?: boolean
  emptyData: string | React.ReactNode
  contentClassName?: string
  tableClassName?: string
  classNameHeader?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isFetching,
  rowClassName,
  noneBorder,
  noneBgHeader,
  emptyData,
  contentClassName,
  tableClassName,
  classNameHeader,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <Table className={tableClassName}>
      <TableHeader
        className={cn(noneBgHeader ? '' : 'bg-neutral-06', classNameHeader)}
        style={{
          backgroundColor: noneBgHeader
            ? ''
            : 'hidden linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 48.44%, rgba(255, 255, 255, 0.02) 100%)',
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { id, isPlaceholder, column, getContext } = header
              const align = (column.columnDef as any).align ?? 'left'
              return (
                <TableHead
                  style={{ width: column.columnDef.size }}
                  key={id}
                  className={cn(
                    'h-10 px-1.5 first-of-type:pl-4 last-of-type:pr-4',
                    noneBorder
                      ? ''
                      : 'border-b-[0.5px] border-t-[0.5px] border-white/20',
                    contentClassName,
                  )}
                >
                  {!isPlaceholder && (
                    <div
                      className={cn(
                        'flex items-center gap-1 text-[15px] text-sm font-normal text-[#6F767E]',
                        align === 'end'
                          ? 'justify-end'
                          : align === 'center'
                            ? 'justify-center'
                            : 'justify-start',
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(column.columnDef.header, getContext())}
                        {column.getCanSort() && <SortIcon />}
                      </div>
                    </div>
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index: number) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className={cn(
                rowClassName,
                index % 2 === 0 ? 'bg-neutral-06/30' : 'bg-transparent',
                isFetching ? null : 'cursor-pointer hover:bg-neutral-06/10',
              )}
            >
              {row.getVisibleCells().map((cell) => {
                const align = (cell.column.columnDef as any).align ?? 'left'
                return (
                  <TableCell
                    key={cell.id}
                    className="px-1.5 py-4 font-normal first-of-type:pl-4 last-of-type:pr-4"
                  >
                    {isFetching ? (
                      <div
                        className={cn(
                          'flex items-center',
                          align === 'end'
                            ? 'justify-end'
                            : align === 'center'
                              ? 'justify-center'
                              : 'justify-start',
                        )}
                      >
                        <SkeletonCell />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'flex w-full items-center',
                          contentClassName,
                          align === 'end'
                            ? 'justify-end'
                            : align === 'center'
                              ? 'justify-center'
                              : 'justify-start',
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {emptyData}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
