import CopyIcon from '@/components/shared/icons/token-explorer/CopyIcon'
import { SmartMoneyForToken } from '@/types/smartMoneyForToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'
import Link from 'next/link'
import numeral from 'numeral'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { cn } from '@/lib/utils'

const RenderTokenWithTitle = ({
  title,
  tokenNode,
}: {
  title: string
  tokenNode: ReactNode
}) => {
  return (
    <span className="relative">
      <div className="absolute left-0 top-0.5">{tokenNode}</div>
      <span className="pl-5">{title}</span>
    </span>
  )
}

export const columnsSmartMoneyRanking = (
  page: number,
  perPage: number,
  tokenNode: ReactNode,
) => {
  const columns: ColumnDef<SmartMoneyForToken>[] = [
    {
      accessorKey: 'id',
      header: () => '#',
      enableSorting: false,
      cell: ({ row }) => {
        return <div>{row.index + 1 + (page - 1) * perPage}</div>
      },
      size: 50,
    },
    {
      accessorKey: 'smart_money',
      header: 'Smart Traders',
      enableSorting: false,
      cell: ({ row }) => {
        const { user_address } = row.original
        return (
          <div className="flex w-32 items-center gap-2 truncate text-neutral-300">
            <Link
              className="underline"
              href={`/smartmoney-onchain/wallet-explorer/${
                user_address || '1'
              }`}
            >
              {user_address}
            </Link>
            <CopyIcon />
          </div>
        )
      },
    },
    {
      accessorKey: '3d_realized_profit',
      header: () => (
        <RenderTokenWithTitle
          title="3D Realized Profit"
          tokenNode={tokenNode}
        />
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { roi_3d_token = 0 } = row.original
        return (
          <div className={roi_3d_token < 0 ? 'text-error-500' : 'text-green'}>
            {numeral(roi_3d_token).format('0,0.[00]')}%
          </div>
        )
      },
    },
    {
      accessorKey: '3d_unrealized_profit',
      header: () => (
        <RenderTokenWithTitle
          title="3D Unrealized Profit"
          tokenNode={tokenNode}
        />
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { unrealized_profit } = row.original
        return (
          <div
            className={unrealized_profit < 0 ? 'text-error-500' : 'text-green'}
          >
            {unrealized_profit ? `$${nFormatter(unrealized_profit)}` : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: '3d_total_profit',
      header: () => (
        <RenderTokenWithTitle title="3D Total Profit" tokenNode={tokenNode} />
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { total_profit } = row.original
        return (
          <div className={total_profit < 0 ? 'text-error-500' : 'text-green'}>
            {total_profit ? formatPriceNumber(total_profit) : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'balance_of',
      header: () => (
        <div className="flex items-center gap-1">Balance of {tokenNode}</div>
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { balance_of_token } = row.original
        return (
          <div className="text-neutral-300">
            {balance_of_token ? formatPriceNumber(balance_of_token) : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'realized',
      header: 'Realized %',
      enableSorting: false,
      cell: ({ row }) => {
        const { realized_percent } = row.original
        return (
          <div className={cn(realized_percent < 0 ? 'text-red' : 'text-core')}>
            {realized_percent
              ? `${numeral(realized_percent).format('0,0.[00]')}%`
              : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'avg_entry_vol',
      header: 'Avg Entry/Vol',
      enableSorting: false,
      cell: ({ row }) => {
        const { avg_entry } = row.original
        return (
          <div className="text-neutral-300">
            {avg_entry ? formatPriceNumber(avg_entry) : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'avg_price_sell_vol',
      header: 'Avg Price Sell/Vol',
      enableSorting: false,
      cell: ({ row }) => {
        const { avg_entry } = row.original
        return (
          <div className="text-neutral-300">
            {avg_entry ? formatPriceNumber(avg_entry) : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'number_of_token_trade',
      enableSorting: false,
      header: () => (
        <div className="flex items-center gap-1">TXs of {tokenNode}</div>
      ),
      cell: ({ row }) => {
        const { number_of_token_trade } = row.original
        return (
          <div className="text-start text-neutral-300">
            {number_of_token_trade}
          </div>
        )
      },
    },
  ]
  return columns
}
