import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'

export type Portfolio = {
  id: string
  symbol: string
  amount: number
}

export const columnsPortfolio: ColumnDef<Portfolio>[] = [
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
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
    accessorKey: 'amount',
    header: () => 'Amount',
    cell: ({ row }) => {
      const { amount } = row.original
      return <div>{numeral(amount).format('0,0.[00]')}</div>
    },
  },
]
