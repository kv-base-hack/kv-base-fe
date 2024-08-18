import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopUnusualCex } from '@/types/find-gems/unusual-cex'
import Link from 'next/link'
import { ImageToken } from '../Image/ImageToken'

export const columnsFindGemsUnusualCex: ColumnDef<TopUnusualCex>[] = [
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
      const { current_price } = row.original
      return (
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          ${current_price}
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
    accessorKey: 'oi_24h',
    header: () => (
      <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
        OI (24h%)
      </div>
    ),
    cell: ({ row }) => {
      const { oi_24h } = row.original
      return oi_24h === 0 ? (
        <div>-</div>
      ) : (
        <div
          className={cn(
            oi_24h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1',
          )}
        >
          {oi_24h > 0 ? '+' : ''}
          {oi_24h.toFixed(2)}%
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
    accessorKey: 'action',
    enableSorting: false,
    header: () => (
      <div className="flex w-full items-center justify-center gap-1">
        <div className="text-right text-sm font-bold not-italic leading-5 text-neutral-07">
          Action
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { action } = row.original
      return (
        <div
          className={cn(
            'flex w-[100px] flex-col items-center justify-center gap-2.5 rounded-md px-2 py-0.5 text-center text-xs font-bold uppercase not-italic leading-4 tracking-[-0.12px]',
            action === 'deposit'
              ? 'bg-secondary-1/10 text-secondary-1'
              : action === 'withdraw'
                ? 'bg-secondary-4/10 text-secondary-4'
                : '',
          )}
        >
          {action}
        </div>
      )
    },
  },
  {
    accessorKey: 'unusual',
    enableSorting: false,
    header: () => (
      <div className="w-full whitespace-nowrap text-center text-sm font-bold not-italic leading-5 text-neutral-07">
        Unusual
      </div>
    ),
    cell: ({ row }) => {
      const { unusual_percent } = row.original
      return (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          {unusual_percent.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'net_flow',
    enableSorting: false,
    header: () => (
      <div className="flex w-full items-center justify-center gap-1 whitespace-nowrap">
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          Net Flow
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { net_flow } = row.original
      return (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          ${nFormatter(net_flow)}
        </div>
      )
    },
  },
  {
    accessorKey: '24h_vol',
    enableSorting: false,
    header: () => (
      <div className="flex w-full items-center justify-center gap-1 whitespace-nowrap">
        <div className="text-sm font-bold not-italic leading-5 text-neutral-07">
          24h Vol
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { volume_24h } = row.original
      return volume_24h === 0 ? (
        <div className="w-full text-center text-neutral-07">-</div>
      ) : (
        <div className="w-full text-center text-sm font-bold not-italic leading-5 text-neutral-07">
          ${nFormatter(volume_24h)}
        </div>
      )
    },
  },
]
