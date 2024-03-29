import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'

export type Portfolio = {
  id: string
  symbol: string
  amount: number
  address: string
}

export const columnsPortfolio: ColumnDef<Portfolio>[] = [
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol } = row.original
      return (
        <Link
          disabled={!row?.original?.address}
          to="/onchain-discovery/token-explorer/$token/deep"
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
      )
    },
  },
  {
    accessorKey: 'amount',
    header: () => 'Amount',
    enableSorting: false,
    cell: ({ row }) => {
      const { amount } = row.original
      return <div>{numeral(amount).format('0,0.[00000000]')}</div>
    },
  },
]
