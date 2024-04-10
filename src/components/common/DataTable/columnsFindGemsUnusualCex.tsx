import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { DATA_TOKEN } from '@/constant/token'
import { TopUnusualCex } from '@/types/find-gems/unusual-cex'

export const columnsFindGemsUnusualCex: ColumnDef<TopUnusualCex>[] = [
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
            <div className="truncate">{row?.original?.network}</div>
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
          <div>{row?.original?.network}</div>
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
      const { current_price } = row.original
      return (
        <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          ${current_price}
        </div>
      )
    },
  },
  {
    accessorKey: 'price_24h',
    header: () => (
      <div className="text-neutral-dark-05 whitespace-nowrap text-sm not-italic font-bold leading-5">
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
            price_percent_change_24h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1'
          )}>
          {price_percent_change_24h > 0 ? '+' : ''}
          {price_percent_change_24h.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'oi_24h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">OI (24h%)</div>
    ),
    cell: ({ row }) => {
      const { oi_24h } = row.original
      return oi_24h === 0 ? (
        <div>-</div>
      ) : (
        <div className={cn(oi_24h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1')}>
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
      <div className="flex items-center justify-center w-full gap-1">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Marketcap
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { market_cap } = row.original
      return (
        <div className="w-full text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          ${nFormatter(market_cap)}
        </div>
      )
    },
  },
  {
    accessorKey: 'action',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Action
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { action } = row.original
      return (
        <div
          className={cn(
            'flex w-[100px] flex-col rounded-md uppercase justify-center items-center gap-2.5 px-2 py-0.5 text-center text-xs not-italic font-bold leading-4 tracking-[-0.12px]',
            action === 'deposit'
              ? 'text-secondary-1 bg-secondary-1/10'
              : action === 'withdraw'
                ? 'text-secondary-4 bg-secondary-4/10'
                : ''
          )}>
          {action}
        </div>
      )
    },
  },
  {
    accessorKey: 'unusual',
    enableSorting: false,
    header: () => (
      <div className="w-full whitespace-nowrap text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
        Unusual
      </div>
    ),
    cell: ({ row }) => {
      const { unusual_percent } = row.original
      return (
        <div className="w-full text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          {unusual_percent.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'net_flow',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1 whitespace-nowrap">
        <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">Net Flow</div>
      </div>
    ),
    cell: ({ row }) => {
      const { net_flow } = row.original
      return (
        <div className="w-full text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          ${nFormatter(net_flow)}
        </div>
      )
    },
  },
  {
    accessorKey: '24h_vol',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1 whitespace-nowrap">
        <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">24h Vol</div>
      </div>
    ),
    cell: ({ row }) => {
      const { volume_24h } = row.original
      return volume_24h === 0 ? (
        <div>-</div>
      ) : (
        <div className="w-full text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          ${nFormatter(volume_24h)}
        </div>
      )
    },
  },
]
