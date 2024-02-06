import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'

export type PerformingToken = {
  id: string
  symbol: string
  gains: number
  net_flow: number
  avg_cost: number
  current_price: number
  realized_percentage: number
  avg_roi: number
}

export const columnsPerformanceToken: ColumnDef<PerformingToken>[] = [
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
    cell: ({ row }) => {
      const { symbol } = row.original
      return (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/memeai.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{symbol}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'gains',
    header: () => 'Gains',
    cell: ({ row }) => {
      const { gains } = row.original
      return <div className="text-primary-2">{numeral(gains).format('$0,0.00')}</div>
    },
  },
  {
    accessorKey: 'net_flow',
    header: () => 'Net Flow',
    cell: ({ row }) => {
      const { net_flow } = row.original
      return <div>${nFormatter(net_flow, 3)}</div>
    },
  },
  {
    accessorKey: 'avg_cost',
    header: () => 'Avg Cost',
    cell: ({ row }) => {
      const { avg_cost } = row.original
      return <div>{numeral(avg_cost).format('$0,0.[000000]')}</div>
    },
  },
  {
    accessorKey: 'current_price',
    header: () => 'Current Price',
    cell: ({ row }) => {
      const { current_price } = row.original
      return <div>{numeral(current_price).format('$0,0.[000000]')}</div>
    },
  },
  {
    accessorKey: 'realized_percentage',
    header: () => <div className="text-center">Realized Percentage</div>,
    cell: ({ row }) => {
      const { realized_percentage } = row.original
      return <div className="flex w-full justify-center">{realized_percentage}%</div>
    },
  },
  {
    accessorKey: 'avg_roi',
    header: () => <div className="flex w-full justify-end">Avg ROI</div>,
    cell: ({ row }) => {
      const { avg_roi } = row.original
      return <div className="flex w-full justify-end">{avg_roi}%</div>
    },
  },
]
