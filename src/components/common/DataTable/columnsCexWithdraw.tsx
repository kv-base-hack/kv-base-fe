import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopCexOut } from '@/types/cexOut'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ImageToken } from '../Image/ImageToken'

export const columnsCexWithdraw: ColumnDef<TopCexOut>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="font-normal leading-6 tracking-[-0.14px]">#</div>
    ),
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'symbol',
    header: () => (
      <div className="whitespace-nowrap font-normal leading-6 tracking-[-0.14px]">
        Symbol
      </div>
    ),
    cell: ({ row }) => {
      return row?.original?.address ? (
        <Link
          href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
        >
          <div className="flex w-full items-center justify-start gap-1.5">
            <ImageToken
              symbol={row?.original?.symbol}
              className="aspect-square w-6 fill-blue-950"
            />
            <div className="text-normal text-neutral-07 underline">
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
          <div className="text-normal text-neutral-07 underline">
            {row?.original?.symbol}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'withdraw_value',
    header: () => (
      <div className="whitespace-nowrap font-normal leading-6 tracking-[-0.14px]">
        Withdraw Value
      </div>
    ),
    cell: ({ row }) => {
      const { value } = row.original
      return (
        <div className="w-full text-center text-neutral-07">
          ${nFormatter(value)}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'cex_netflow',
    header: () => (
      <div className="whitespace-nowrap font-normal leading-6 tracking-[-0.14px]">
        CEX Netflow
      </div>
    ),
    cell: ({ row }) => {
      const { net_flow } = row.original
      return (
        <div className="w-full text-center text-neutral-07">
          ${nFormatter(net_flow)}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'oi',
    header: () => (
      <div className="w-full whitespace-nowrap text-right text-sm font-normal not-italic leading-6 tracking-[-0.14px]">
        OI (%)
      </div>
    ),
    cell: ({ row }) => {
      const { oi } = row.original
      return oi ? (
        <div
          className={cn(
            'w-full text-right',
            oi > 0 ? 'text-primary-2' : 'text-primary-3',
            oi === 0 && 'text-neutral-07',
          )}
        >
          {oi > 0 ? '+' : ''}
          {oi.toFixed(2)}%
        </div>
      ) : (
        <div className="w-full text-right">-</div>
      )
    },
    enableSorting: false,
  },
]
