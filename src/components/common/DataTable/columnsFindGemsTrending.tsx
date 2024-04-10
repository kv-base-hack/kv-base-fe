import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { DATA_TOKEN } from '@/constant/token'
import { TrendingToken } from '@/types/find-gems/trending'

export const columnsFindGemsTrending: ColumnDef<TrendingToken>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">#</div>
    ),
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
    size: 50,
  },
  {
    accessorKey: 'symbol',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5 whitespace-nowrap">
        Token Name
      </div>
    ),
    size: 250,
    cell: ({ row }) => {
      return row?.original?.address ? (
        <Link
          to="/smartmoney-onchain/token-explorer/$token/deep"
          className="flex items-center gap-2"
          params={{
            token: row?.original?.address,
          }}>
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div className="flex flex-col gap-1.5 w-full items-start justify-start">
            <div className="truncate">{row?.original?.name}</div>
            <div className="text-normal text-neutral-dark-05">{row?.original?.symbol}</div>
          </div>
        </Link>
      ) : (
        <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{row?.original?.name}</div>
          <div className="text-normal text-neutral-dark-05">{row?.original?.symbol}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">Price</div>
    ),
    cell: ({ row }) => {
      const { price } = row.original
      return (
        <div className="text-neutral-dark-03 text-sm not-italic font-bold leading-5">${price}</div>
      )
    },
  },
  {
    accessorKey: 'price_24h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">
        Price (24h%)
      </div>
    ),
    cell: ({ row }) => {
      const { price_change_percentage_24h } = row.original
      return price_change_percentage_24h === 0 ? (
        <div className="text-neutral-dark-03 text-sm not-italic font-bold leading-5">-</div>
      ) : (
        <div
          className={cn(
            'text-neutral-dark-03 text-sm not-italic font-bold leading-5',
            price_change_percentage_24h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1'
          )}>
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
      <div className="flex items-center justify-center w-full gap-1">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Marketcap
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { market_cap } = row.original
      const format = market_cap?.split('$')?.[1]?.split(',')?.join('')
      return (
        <div className="w-full text-center text-neutral-dark-03 text-sm not-italic font-bold leading-5">
          ${nFormatter(parseFloat(format))}
        </div>
      )
    },
  },
  {
    accessorKey: 'total_volume',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Total Volume
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { total_volume } = row.original
      const format = total_volume?.split('$')?.[1]?.split(',')?.join('')
      return (
        <div className="w-full text-center text-neutral-dark-03 text-sm not-italic font-bold leading-5">
          ${nFormatter(parseFloat(format))}
        </div>
      )
    },
  },
]
