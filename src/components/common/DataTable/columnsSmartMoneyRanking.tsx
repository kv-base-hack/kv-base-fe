import CopyIcon from '@/components/shared/icons/token-explorer/CopyIcon'
import { SmartMoneyForToken } from '@/types/smartMoneyForToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import numeral from 'numeral'
import { ReactNode } from 'react'
import Link from 'next/link'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import { cn } from '@/lib/utils'

export const columnsSmartMoneyRanking = (
  page: number,
  perPage: number,
  tokenNode: ReactNode,
  chain: string,
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
      header: 'Smart Money',
      enableSorting: false,
      cell: ({ row }) => {
        const { user_address } = row.original
        return (
          <div className="flex items-center truncate w-32 gap-2">
            <Link
              className="underline"
              href={`/smartmoney-onchain/wallet-explorer/${
                user_address || '1'
              }?chain=${chain}`}
            >
              {user_address}
            </Link>
            <CopyIcon />
          </div>
        )
      },
    },
    {
      accessorKey: 'roi_3d',
      header: () => {
        return (
          <span>
            <span>ROI 3D of</span>
            {tokenNode}
          </span>
        )
      },
      enableSorting: false,
      cell: ({ row }) => {
        const { roi_3d_token = 0 } = row.original
        return (
          <div
            className={roi_3d_token < 0 ? 'text-error-500' : 'text-success-500'}
          >
            {(roi_3d_token < 0.001 && roi_3d_token > 0) ||
            (roi_3d_token > -0.001 && roi_3d_token < 0)
              ? numeral(roi_3d_token).format('0,0.[0000]%')
              : `${roi_3d_token?.toFixed(2)}%`}
          </div>
        )
      },
    },
    {
      accessorKey: 'pnl_3d',
      header: () => {
        return (
          <span>
            <span>PnL 3D of</span>
            {tokenNode}
          </span>
        )
      },
      enableSorting: false,
      cell: ({ row }) => {
        const { pnl_3d_token } = row.original
        return (
          <div
            className={pnl_3d_token < 0 ? 'text-error-500' : 'text-success-500'}
          >
            {pnl_3d_token ? `$${nFormatter(pnl_3d_token)}` : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'total_roi',
      header: () => 'Total ROI',
      enableSorting: false,
      cell: ({ row }) => {
        const { roi } = row.original
        return roi ? (
          <div
            className={cn(
              'flex items-center justify-start leading-[140%]',
              roi > 0 ? 'text-success-500' : 'text-error-500',
              roi === 0 && 'text-neutral-dark-03',
            )}
          >
            {roi !== 0 && roi > 0 ? <PercentUpIcon /> : <PercentDownIcon />}
            {roi.toFixed(2)}%
          </div>
        ) : (
          <div className="text-left w-full">-</div>
        )
      },
    },
    {
      accessorKey: 'total_pnl',
      header: () => 'Total PnL',
      enableSorting: false,
      cell: ({ row }) => {
        const { pnl } = row.original
        return (
          <div className={pnl < 0 ? 'text-error-500' : 'text-success-500'}>
            {pnl ? `$${nFormatter(pnl)}` : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'total_balance',
      header: () => 'Total Balance',
      enableSorting: false,
      cell: ({ row }) => {
        const { total_balance } = row.original
        return <div>{total_balance ? `${nFormatter(total_balance)}` : '-'}</div>
      },
    },
    {
      accessorKey: 'balance_of',
      header: () => <span>Balance of {tokenNode}</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const { balance_of_token } = row.original
        return (
          <div>
            {balance_of_token ? `${nFormatter(balance_of_token)}` : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: '24h_balance_change',
      header: () => <span>24h Balance change of {tokenNode}</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const { balance_change_24h } = row.original
        return balance_change_24h ? (
          <div
            className={cn(
              'flex items-center justify-start leading-[140%]',
              balance_change_24h > 0 ? 'text-success-500' : 'text-error-500',
              balance_change_24h === 0 && 'text-neutral-dark-03',
            )}
          >
            {balance_change_24h !== 0 && balance_change_24h > 0 ? (
              <PercentUpIcon />
            ) : (
              <PercentDownIcon />
            )}
            {balance_change_24h.toFixed(2)}%
          </div>
        ) : (
          <div className="text-left w-full">-</div>
        )
      },
    },
    {
      accessorKey: 'number_of_token_trade',
      enableSorting: false,
      header: () => <span># of trade {tokenNode}</span>,
      cell: ({ row }) => {
        const { number_of_token_trade } = row.original
        return (
          <div className="w-full text-center text-neutral-04">
            {number_of_token_trade}
          </div>
        )
      },
    },
  ]
  return columns
}
