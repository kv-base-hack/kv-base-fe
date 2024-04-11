import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { DATA_TOKEN } from '@/constant/token'
import { TopCexIn } from '@/types/cexIn'
import { cn } from '@/lib/utils'

export const columnsCexDeposit: ColumnDef<TopCexIn>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px]">#</div>
    ),
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'symbol',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap whitespace-nowrap">
        Symbol
      </div>
    ),
    cell: ({ row }) => {
      return row?.original?.address ? (
        <Link
          to="/smartmoney-onchain/token-explorer/$token/deep"
          params={{
            token: row?.original?.address,
          }}>
          <div className="flex gap-1.5 w-full items-center justify-start">
            <img
              loading="lazy"
              src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
              className="w-6 aspect-square fill-blue-950"
            />
            <div className="text-normal underline text-neutral-dark-03">
              {row?.original?.symbol}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div className="text-normal underline text-neutral-dark-03">{row?.original?.symbol}</div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'deposit_value',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        Deposit Value
      </div>
    ),
    cell: ({ row }) => {
      const { value } = row.original
      return <div className="w-full text-center text-neutral-dark-03">${nFormatter(value)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'cex_netflow',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        CEX Netflow
      </div>
    ),
    cell: ({ row }) => {
      const { net_flow } = row.original
      return <div className="text-neutral-dark-03 text-center w-full">${nFormatter(net_flow)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'oi',
    header: () => (
      <div className="text-sm w-full text-right not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        OI (%)
      </div>
    ),
    cell: ({ row }) => {
      const { oi } = row.original
      return oi ? (
        <div
          className={cn(
            'text-right w-full',
            oi > 0 ? 'text-primary-2' : 'text-primary-3',
            oi === 0 && 'text-neutral-dark-03'
          )}>
          {oi > 0 ? '+' : ''}
          {oi.toFixed(2)}%
        </div>
      ) : (
        <div className="text-right w-full">-</div>
      )
    },
    enableSorting: false,
  },
]
