import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'
import { Link } from '@tanstack/react-router'
import { DATA_TOKEN } from '@/constant/token'
import { TopCexWithdraw } from '@/types/find-gems/withdraw'

export const columnsFindGemsWithdraw: ColumnDef<TopCexWithdraw>[] = [
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
            <div className="text-normal text-neutral-dark-03">{row?.original?.symbol}</div>
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
          <div className="text-normal text-neutral-dark-03">{row?.original?.symbol}</div>
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
        <div className="text-neutral-dark-03 text-sm not-italic font-bold leading-5">
          {numeral(current_price).format('$0,0.[00000000]')}
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
    accessorKey: 'oi_1h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">OI (1h%)</div>
    ),
    cell: ({ row }) => {
      const { oi_1h } = row.original
      return oi_1h === 0 ? (
        <div>-</div>
      ) : (
        <div className={cn(oi_1h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1')}>
          {oi_1h > 0 ? '+' : ''}
          {oi_1h.toFixed(2)}%
        </div>
      )
    },
  },
  {
    accessorKey: 'oi_4h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">OI (4h%)</div>
    ),
    cell: ({ row }) => {
      const { oi_4h } = row.original
      return oi_4h === 0 ? (
        <div className="text-neutral-dark-03 text-sm not-italic font-bold leading-5">-</div>
      ) : (
        <div
          className={cn(
            'text-neutral-dark-03 text-sm not-italic font-bold leading-5',
            oi_4h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1'
          )}>
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
      <div className="flex items-center justify-center w-full gap-1">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Marketcap
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { market_cap } = row.original
      return (
        <div className="w-full text-center text-neutral-dark-03 text-sm not-italic font-bold leading-5">
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
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          # of withdrawals
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { number_of_withdraw } = row.original
      return (
        <div className="w-full text-center text-neutral-dark-03 text-sm not-italic font-bold leading-5">
          ${nFormatter(number_of_withdraw)}
        </div>
      )
    },
  },
  {
    accessorKey: 'net_flow_24h',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1 whitespace-nowrap">
        <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          24h CEX Netflow
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { net_flow_24h } = row.original
      return net_flow_24h === 0 ? (
        <div className="w-full text-center text-neutral-dark-03 text-sm not-italic font-bold leading-5">
          -
        </div>
      ) : (
        <div className="w-full text-center text-neutral-dark-03 text-sm not-italic font-bold leading-5">
          ${nFormatter(net_flow_24h)}
        </div>
      )
    },
  },
]
