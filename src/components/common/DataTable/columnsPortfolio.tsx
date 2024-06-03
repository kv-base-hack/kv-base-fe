import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import numeral from 'numeral'

export type Portfolio = {
  id: string
  symbol: string
  amount: number
  address: string
  image_url: string
  price: number
  price_24h_change: number
  token_amount: number
  usdt_amount: number
}

export const columnsPortfolio: ColumnDef<Portfolio>[] = [
  {
    accessorKey: 'token',
    header: () => 'Token',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol, image_url } = row.original
      return (
        <Link
          href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
          className="flex gap-3 items-center justify-between text-right"
        >
          <Image
            loading="lazy"
            alt="token"
            src={image_url}
            className="w-6 aspect-square fill-blue-950 rounded-full"
            width={24}
            height={24}
          />
          <div>{symbol}</div>
        </Link>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => 'Current Price',
    enableSorting: false,
    cell: ({ row }) => {
      const { price } = row.original
      return <>{renderPrice(price)}</>
    },
  },
  {
    accessorKey: 'price_change',
    header: () => 'Price 24%',
    enableSorting: false,
    cell: ({ row }) => {
      const { price_24h_change } = row.original
      return (
        <div
          className={cn(
            price_24h_change > 0
              ? 'text-semantic-success-1'
              : price_24h_change < 0
              ? 'text-semantic-error-1'
              : 'text-neutral-07',
          )}
        >
          {price_24h_change > 0 ? '+' : ''}
          {price_24h_change.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'balance',
    header: () => 'Balance',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol, token_amount, usdt_amount } = row.original
      return (
        <div className="flex items-center gap-1">
          <p className="text-semantic-success-1">
            (${nFormatter(usdt_amount)})
          </p>
          <div className="flex items-center gap-1">
            <p>{nFormatter(token_amount)}</p>
            <p>{symbol}</p>
          </div>
        </div>
      )
    },
  },
]
