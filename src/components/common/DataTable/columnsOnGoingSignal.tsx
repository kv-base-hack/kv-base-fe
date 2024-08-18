import ReachedIcon from '@/components/shared/icons/trading-signal/ReachedIcon'
import { cn } from '@/lib/utils'
import { OnGoingSignal } from '@/types/trading-signal/OngoingSignal'
import { ColumnDef } from '@tanstack/react-table'
import upperFirst from 'lodash.upperfirst'
import moment from 'moment'
import numeral from 'numeral'

export const columnsOngoingSignal: ColumnDef<OnGoingSignal>[] = [
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
            'my-auto flex items-center justify-center gap-2.5 self-stretch whitespace-nowrap rounded-md bg-opacity-10 px-2 py-0.5 text-center',
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
      const { entry } = row.original
      return (
        <div className="whitespace-nowrap">
          {entry?.[0]} - {entry?.[1]}
        </div>
      )
    },
  },
  {
    accessorKey: 'tp1',
    header: () => 'TP 1',
    enableSorting: false,
    cell: ({ row }) => {
      const { targets } = row.original
      return (
        <div className="flex w-24 items-center justify-center gap-2">
          <div className="h-6 w-6">
            {targets?.[0]?.reached ? (
              <ReachedIcon />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-solid border-white/10"></div>
            )}
          </div>
          {targets?.[0]?.price ? (
            <div>{numeral(targets?.[0]?.price).format('0,0.[0000]')}</div>
          ) : (
            '-'
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'tp2',
    header: () => 'TP 2',
    enableSorting: false,
    cell: ({ row }) => {
      const { targets } = row.original
      return (
        <div className="flex w-24 items-center justify-center gap-2">
          <div className="h-6 w-6">
            {targets?.[1]?.reached ? (
              <ReachedIcon />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-solid border-white/10"></div>
            )}
          </div>
          {targets?.[1]?.price ? (
            <div>{numeral(targets?.[1]?.price).format('0,0.[0000]')}</div>
          ) : (
            '-'
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'tp3',
    header: () => 'TP 3',
    enableSorting: false,
    cell: ({ row }) => {
      const { targets } = row.original
      return (
        <div className="flex w-24 items-center justify-center gap-2">
          <div className="h-6 w-6">
            {targets?.[2]?.reached ? (
              <ReachedIcon />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-solid border-white/10"></div>
            )}
          </div>
          {targets?.[2]?.price ? (
            <div>{numeral(targets?.[2]?.price).format('0,0.[0000]')}</div>
          ) : (
            '-'
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'tp4',
    header: () => 'TP 4',
    enableSorting: false,
    cell: ({ row }) => {
      const { targets } = row.original
      return (
        <div className="flex w-24 items-center justify-center gap-2">
          <div className="h-6 w-6">
            {targets?.[3]?.reached ? (
              <ReachedIcon />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-solid border-white/10"></div>
            )}
          </div>
          {targets?.[3]?.price ? (
            <div>{numeral(targets?.[3]?.price).format('0,0.[0000]')}</div>
          ) : (
            '-'
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'stoploss',
    header: () => 'Stoploss',
    enableSorting: false,
    cell: ({ row }) => {
      const { stopLoss } = row.original
      return stopLoss?.price ? (
        <div>{numeral(stopLoss?.price).format('0,0.[0000]')}</div>
      ) : (
        '-'
      )
    },
  },
  {
    accessorKey: 'floating_roi',
    header: () => 'Floating ROI',
    enableSorting: false,
    cell: ({ row }) => {
      const { floatingROI } = row.original
      return (
        <div
          className={cn(
            floatingROI > 0 ? 'text-success-500' : 'text-error-500',
          )}
        >
          {floatingROI?.toFixed(2)}
        </div>
      )
    },
  },
]
