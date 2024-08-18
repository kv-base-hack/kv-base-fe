import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'
import { TopCexWithdraw } from '@/types/find-gems/withdraw'
import Link from 'next/link'
import { ImageToken } from '../Image/ImageToken'

export const columnsFindGemsWithdraw: ColumnDef<TopCexWithdraw>[] = [
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
            <div className="truncate">{row?.original?.network}</div>
            <div className="font-normal text-neutral-04">
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
          <div>{row?.original?.network}</div>
          <div className="font-normal text-neutral-04">
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
      const { current_price } = row.original
      return (
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          {numeral(current_price).format('$0,0.[00000000]')}
        </div>
      )
    },
  },
  {
    accessorKey: 'price_24h',
    header: () => (
      <div className="whitespace-nowrap text-sm font-bold not-italic leading-5 text-neutral-07">
        Price (24h%)
      </div>
    ),
    cell: ({ row }) => {
      const { price_percent_change_24h } = row.original
      return price_percent_change_24h === 0 ? (
        <div>-</div>
      ) : (
        <div
          className={cn(
            price_percent_change_24h > 0
              ? 'text-semantic-success-1'
              : 'text-semantic-error-1',
          )}
        >
          {price_percent_change_24h > 0 ? '+' : ''}
          {price_percent_change_24h.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'oi_1h',
    header: () => (
      <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
        OI (1h%)
      </div>
    ),
    cell: ({ row }) => {
      const { oi_1h } = row.original
      return oi_1h === 0 ? (
        <div>-</div>
      ) : (
        <div
          className={cn(
            oi_1h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1',
          )}
        >
          {oi_1h > 0 ? '+' : ''}
          {oi_1h.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'oi_4h',
    header: () => (
      <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
        OI (4h%)
      </div>
    ),
    cell: ({ row }) => {
      const { oi_4h } = row.original
      return oi_4h === 0 ? (
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          -
        </div>
      ) : (
        <div
          className={cn(
            'text-sm font-bold not-italic leading-5 text-neutral-07',
            oi_4h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1',
          )}
        >
          {oi_4h > 0 ? '+' : ''}
          {oi_4h.toFixed(2)}%
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
      return (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          ${nFormatter(market_cap)}
        </div>
      )
    },
  },
  {
    accessorKey: 'withdrawals',
    enableSorting: false,
    header: () => (
      <div className="whitespace-nowrap">
        <div className="text-right text-sm font-bold not-italic leading-5 text-neutral-07">
          # of withdrawals
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { number_of_withdraw } = row.original
      return (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          ${nFormatter(number_of_withdraw)}
        </div>
      )
    },
  },
  {
    accessorKey: 'net_flow_24h',
    enableSorting: false,
    header: () => (
      <div className="flex w-full items-center justify-center gap-1 whitespace-nowrap">
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          24h CEX Netflow
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { net_flow_24h } = row.original
      return net_flow_24h === 0 ? (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          -
        </div>
      ) : (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          ${nFormatter(net_flow_24h)}
        </div>
      )
    },
  },
]
