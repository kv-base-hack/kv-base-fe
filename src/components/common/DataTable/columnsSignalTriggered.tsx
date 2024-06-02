import { cn } from '@/lib/utils'
import { SignalTriggered } from '@/types/trading-signal/SignalTriggered'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { ColumnDef } from '@tanstack/react-table'
import upperFirst from 'lodash.upperfirst'
import moment from 'moment'
import numeral from 'numeral'

export const columnsSignalTriggered: ColumnDef<SignalTriggered>[] = [
  {
    accessorKey: 'time',
    header: () => 'Time',
    cell: ({ row }) => {
      const { createdAt } = row.original
      return (
        <div className="text-neutral-04">
          {moment(createdAt).format('MMM DD, HH:mm')}
        </div>
      )
    },
  },
  {
    accessorKey: 'pair',
    header: () => 'Pair',
    enableSorting: false,
    cell: ({ row }) => {
      const { pair } = row.original
      return <div>{pair}</div>
    },
  },
  {
    accessorKey: 'direct',
    header: () => 'Direct',
    enableSorting: false,
    cell: ({ row }) => {
      const { direction } = row.original
      return (
        <div
          className={cn(
            'flex items-center gap-2.5 justify-center self-stretch px-2 py-0.5 my-auto text-center whitespace-nowrap rounded-md bg-opacity-10',
            direction === 'short'
              ? 'bg-secondary-1/10 text-secondary-1'
              : 'bg-primary-2/10 text-success-500',
          )}
        >
          {upperFirst(direction)}
        </div>
      )
    },
  },
  {
    accessorKey: 'entry_price',
    header: () => 'Entry Price',
    enableSorting: false,
    cell: ({ row }) => {
      const { entryPrice } = row.original
      return entryPrice ? (
        <div>{formatPriceNumber(entryPrice)}</div>
      ) : (
        <div>-</div>
      )
    },
  },
  {
    accessorKey: 'close_price',
    header: () => 'Close Price',
    enableSorting: false,
    cell: ({ row }) => {
      const { closePrice } = row.original
      return closePrice ? (
        <div>{formatPriceNumber(closePrice)}</div>
      ) : (
        <div>-</div>
      )
    },
  },
  {
    accessorKey: 'realized_roi',
    header: () => 'Realized ROI',
    enableSorting: false,
    cell: ({ row }) => {
      const { realizedROI } = row.original
      return realizedROI ? (
        <div>
          {(realizedROI < 0.001 && realizedROI > 0) ||
          (realizedROI > -0.001 && realizedROI < 0)
            ? numeral(realizedROI).format('0,0.[0000]%')
            : `${realizedROI?.toFixed(2)}%`}
        </div>
      ) : (
        <div>-</div>
      )
    },
  },
]
