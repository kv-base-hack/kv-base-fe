import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TrendingToken } from '@/types/find-gems/trending'
import numeral from 'numeral'
import Link from 'next/link'
import { ImageToken } from '../Image/ImageToken'

export const columnsFindGemsTrending: ColumnDef<TrendingToken>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
        #
      </div>
    ),
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
    size: 50,
  },
  {
    accessorKey: 'symbol',
    header: () => (
      <div className="whitespace-nowrap text-sm font-bold not-italic leading-5 text-neutral-07">
        Token Name
      </div>
    ),
    size: 250,
    cell: ({ row }) => {
      return row?.original?.address ? (
        <Link
          href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
          className="flex items-center gap-2"
        >
          <ImageToken
            symbol={row?.original?.symbol}
            className="aspect-square w-6 fill-blue-950"
          />
          <div className="flex w-full flex-col items-start justify-start gap-1.5">
            <div className="truncate">{row?.original?.name}</div>
            <div className="text-normal text-neutral-07">
              {row?.original?.symbol}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
          <ImageToken
            symbol={row?.original?.symbol}
            className="aspect-square w-6 fill-blue-950"
          />
          <div>{row?.original?.name}</div>
          <div className="text-normal text-neutral-07">
            {row?.original?.symbol}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => (
      <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
        Price
      </div>
    ),
    cell: ({ row }) => {
      const { price } = row.original
      return (
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          {numeral(price).format('$0,0.[00000000]')}
        </div>
      )
    },
  },
  {
    accessorKey: 'price_24h',
    header: () => (
      <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
        Price (24h%)
      </div>
    ),
    cell: ({ row }) => {
      const { price_change_percentage_24h } = row.original
      return price_change_percentage_24h === 0 ? (
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          -
        </div>
      ) : (
        <div
          className={cn(
            'text-sm font-bold not-italic leading-5 text-neutral-07',
            price_change_percentage_24h > 0
              ? 'text-semantic-success-1'
              : 'text-semantic-error-1',
          )}
        >
          {price_change_percentage_24h > 0 ? '+' : ''}
          {price_change_percentage_24h.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'market_cap',
    enableSorting: false,
    header: () => (
      <div className="flex w-full items-center justify-center gap-1">
        <div className="text-right text-sm font-bold not-italic leading-5 text-neutral-07">
          Marketcap
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { market_cap } = row.original
      const format = market_cap?.split('$')?.[1]?.split(',')?.join('')
      return (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          ${nFormatter(parseFloat(format))}
        </div>
      )
    },
  },
  {
    accessorKey: 'total_volume',
    enableSorting: false,
    header: () => (
      <div className="flex w-full items-center justify-center gap-1">
        <div className="text-right text-sm font-bold not-italic leading-5 text-neutral-07">
          Total Volume
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { total_volume } = row.original
      const format = total_volume?.split('$')?.[1]?.split(',')?.join('')
      return (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          ${nFormatter(parseFloat(format))}
        </div>
      )
    },
  },
]
