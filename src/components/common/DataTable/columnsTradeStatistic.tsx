import { nFormatter } from '@/utils/nFormatter'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'

export type TradeStatistic = {
  id: string
  symbol: string
  address: string
  pnl: number
  total_spent: number
  realized_gains: number
  unrealized_gains: number
  avg_roi: number
}

export const columnsTradeStatistic: ColumnDef<TradeStatistic>[] = [
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol } = row.original
      return row?.original?.address ? (
        <Link
          to="/smartmoney-onchain/token-explorer/$token/deep"
          params={{
            token: row.original.address,
          }}
          className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{symbol}</div>
        </Link>
      ) : (
        <div className="flex gap-3 cursor-not-allowed items-center justify-between text-right">
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
    accessorKey: 'pnl',
    header: () => 'PnL',
    enableSorting: false,
    cell: ({ row }) => {
      const { pnl } = row.original
      return <div>{nFormatter(pnl, 2)}</div>
    },
  },
  {
    accessorKey: 'total_spent',
    header: () => 'Total Spent',
    enableSorting: false,
    cell: ({ row }) => {
      const { total_spent } = row.original
      return <div>{nFormatter(total_spent, 2)}</div>
    },
  },
  {
    accessorKey: 'realized_gains',
    header: () => 'Realized Gains',
    enableSorting: false,
    cell: ({ row }) => {
      const { realized_gains } = row.original
      return <div>{numeral(realized_gains).format('$0,0.[000000]')}</div>
    },
  },
  {
    accessorKey: 'unrealized_gains',
    header: () => 'Unrealized Gains',
    enableSorting: false,
    cell: ({ row }) => {
      const { unrealized_gains } = row.original
      return <div>{unrealized_gains}%</div>
    },
  },
  {
    accessorKey: 'avg_roi',
    header: () => 'Avg ROI',
    enableSorting: false,
    cell: ({ row }) => {
      const { avg_roi } = row.original
      return <div>{avg_roi}%</div>
    },
  },
]
