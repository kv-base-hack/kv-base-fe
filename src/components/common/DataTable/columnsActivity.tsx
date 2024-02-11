import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'

export type Activity = {
  id: string
  time: string
  smart_money: string
  symbol: string
  movements: string
  value: {
    total: number
    amount: number
    symbol: string
  }
  avg_cost: number
  realized_pnl: {
    percent: number
    amount: number
  }
  unrealized_pnl: {
    percent: number
    amount: number
  }
}

export const columnsActivity: ColumnDef<Activity>[] = [
  {
    accessorKey: 'time',
    header: () => 'Time',
    enableSorting: false,
    cell: ({ row }) => {
      const { time } = row.original
      return <div className="text-neutral-04">{time}</div>
    },
  },
  {
    accessorKey: 'smart_money',
    header: () => 'Smart Money',
    enableSorting: false,
    cell: ({ row }) => {
      const { smart_money } = row.original
      return <div className="underline">{smart_money}</div>
    },
  },
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol } = row.original
      return (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{symbol}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'movements',
    header: () => 'Movements',
    enableSorting: false,
    cell: ({ row }) => {
      const { movements } = row.original
      return (
        <div className="justify-center self-stretch px-2 py-0.5 my-auto text-center text-red-300 whitespace-nowrap rounded-md bg-amber-200 bg-opacity-10">
          {movements}
        </div>
      )
    },
  },
  {
    accessorKey: 'value',
    header: () => 'Value',
    enableSorting: false,
    cell: ({ row }) => {
      const { value } = row.original
      return (
        <div>
          {nFormatter(value.amount, 2)} {value.symbol} (${nFormatter(value.total, 2)})
        </div>
      )
    },
  },
  {
    accessorKey: 'avg_cost',
    header: () => 'Avg Cost',
    enableSorting: false,
    cell: ({ row }) => {
      const { avg_cost } = row.original
      return <div>{numeral(avg_cost).format('$0,0.[000000]')}</div>
    },
  },
  {
    accessorKey: 'realized_pnl',
    header: () => 'Realized PnL',
    enableSorting: false,
    cell: ({ row }) => {
      const { realized_pnl } = row.original
      return (
        <div
          className={cn(
            realized_pnl.amount > 0 ? 'text-primary-2' : 'text-red-400',
            'flex items-center justify-center'
          )}>
          {nFormatter(realized_pnl.amount, 2)} (${nFormatter(realized_pnl.percent, 2)})
        </div>
      )
    },
  },
  {
    accessorKey: 'unrealized_pnl',
    header: () => 'Unrealized PnL',
    enableSorting: false,
    cell: ({ row }) => {
      const { unrealized_pnl } = row.original
      return (
        <div
          className={cn(
            unrealized_pnl.amount > 0 ? 'text-primary-2' : 'text-red-400',
            'flex items-center justify-center'
          )}>
          {nFormatter(unrealized_pnl.amount, 2)} (${nFormatter(unrealized_pnl.percent, 2)})
        </div>
      )
    },
  },
]
