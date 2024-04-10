import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { DATA_TOKEN } from '@/constant/token'
import { TopCexOut } from '@/types/cexOut'
import { cn } from '@/lib/utils'

export const columnsCexWithdraw: ColumnDef<TopCexOut>[] = [
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
            <div className="text-normal underline text-neutral-dark-05">
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
          <div className="text-normal underline text-neutral-03">{row?.original?.symbol}</div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'withdraw_value',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        Withdraw Value
      </div>
    ),
    cell: ({ row }) => {
      const { value } = row.original
      return <div className="w-full text-center text-neutral-03">${nFormatter(value)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: '24h_cex_netflow',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        24h CEX Netflow
      </div>
    ),
    cell: ({ row }) => {
      const { net_flow_24h } = row.original
      return <div className="text-neutral-03 text-center w-full">${nFormatter(net_flow_24h)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'oi_24h',
    header: () => (
      <div className="text-sm w-full text-right not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        OI (%24h)
      </div>
    ),
    cell: ({ row }) => {
      const { oi_24h } = row.original
      return oi_24h ? (
        <div
          className={cn(
            'text-right w-full',
            oi_24h > 0 ? 'text-primary-2' : 'text-primary-3',
            oi_24h === 0 && 'text-neutral-03'
          )}>
          {oi_24h > 0 ? '+' : ''}
          {oi_24h.toFixed(2)}%
        </div>
      ) : (
        <div className="text-right w-full">-</div>
      )
    },
    enableSorting: false,
  },
]
