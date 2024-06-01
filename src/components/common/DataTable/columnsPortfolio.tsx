import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
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
          href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
          className="flex gap-3 items-center justify-between text-right">
          <Image
            loading="lazy"
            alt="token"
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
