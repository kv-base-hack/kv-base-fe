'use client'

import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { TopSmartMoneyTradingQuery } from '@/types'
import Link from 'next/link'
import { nFormatter } from '@/lib/utils/nFormatter'
import moment from 'moment'
interface TopSmartMoneyTradingProps {
  data: {
    smart_money_for_token: TopSmartMoneyTradingQuery[]
    total: number
  }
}

export const TopSmartMoneyTrading: React.FC<TopSmartMoneyTradingProps> = ({
  data,
}) => {
  const columns: ColumnDef<TopSmartMoneyTradingQuery>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: () => '#',
        enableSorting: false,
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>
        },
        size: 50,
      },
      {
        accessorKey: 'smart_money',
        header: () => (
          <div className="flex gap-2 items-center">
            <div>Smart Money</div>
            <SortMultipleIcon className="w-4 h-4" />
          </div>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { user_address } = row.original
          return (
            <Link
              className="w-32 truncate"
              href={`/smartmoney-onchain/wallet-explorer/${
                user_address || '1'
              }`}
            >
              {user_address.substring(0, 6)}...
              {user_address.substring(
                user_address.length - 4,
                user_address.length,
              )}
            </Link>
          )
        },
      },
      {
        accessorKey: 'roi_3d',
        enableSorting: false,
        header: () => (
          <div className="whitespace-nowrap">
            <p>ROI 3D</p>
          </div>
        ),
        cell: ({ row }) => {
          const { roi } = row.original
          return (
            <div className={roi > 0 ? 'text-success-500' : 'text-error-500'}>
              {roi ? `${roi.toFixed(2)}%` : '-'}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'roi_3d_total',
        enableSorting: false,
        header: () => (
          <div className="cursor-pointer flex flex-col items-center whitespace-nowrap">
            <div>ROI 3D</div>
            <div className="flex justify-center items-center w-4 h-4">
              Total
            </div>
          </div>
        ),
        cell: ({ row }) => {
          const { roi_3d_token } = row.original
          return (
            <div
              className={
                roi_3d_token > 0 ? 'text-success-500' : 'text-error-500'
              }
            >
              {roi_3d_token ? `${roi_3d_token.toFixed(2)}%` : '-'}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: '3d_pnl',
        enableSorting: false,
        header: () => (
          <div className="cursor-pointer flex items-center gap-2 whitespace-nowrap">
            <div>3D PnL</div>
          </div>
        ),
        cell: ({ row }) => {
          const { pnl_of_3d_trades } = row.original
          return (
            <div>
              {pnl_of_3d_trades ? `$${nFormatter(pnl_of_3d_trades)}` : '-'}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'volume_24h',
        enableSorting: false,
        header: () => (
          <div className="cursor-pointer flex items-center gap-2 whitespace-nowrap">
            Volume 24H
          </div>
        ),
        cell: ({ row }) => {
          const { volume_24h } = row.original
          return <div>{volume_24h ? `$${nFormatter(volume_24h)}` : '-'}</div>
        },
        align: 'center',
      },
      {
        accessorKey: 'total_balance',
        enableSorting: false,
        header: () => (
          <div className="cursor-pointer flex items-center gap-2 whitespace-nowrap">
            Total Balance
          </div>
        ),
        cell: ({ row }) => {
          const { total_balance } = row.original
          return (
            <div>{total_balance ? `$${nFormatter(total_balance)}` : '-'}</div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'number_trades',
        enableSorting: false,
        header: () => (
          <div className="cursor-pointer flex flex-col items-center whitespace-nowrap">
            <p>Number of</p>
            <p>Trades(3d)</p>
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_3d_trades } = row.original
          return <div>{number_of_3d_trades}</div>
        },
        align: 'center',
      },
      {
        accessorKey: 'latest_trade',
        enableSorting: false,
        header: () => (
          <div className="cursor-pointer flex items-center gap-2 whitespace-nowrap">
            Last Trade
          </div>
        ),
        cell: ({ row }) => {
          const { last_trade } = row.original
          return (
            <div className="flex text-right justify-end text-neutral-04 whitespace-nowrap">
              {moment(last_trade).fromNow()}
            </div>
          )
        },
        align: 'end',
      },
    ]
  }, [])

  return (
    <div className="p-6 font-semibold rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 bg-opacity-50 border-white/10 leading-[160%] max-md:px-5">
      <div className="border border-white/10 rounded-[20px] bg-gradient-btn w-fit py-2 px-4">
        <div className="flex items-center gap-2">
          <p className="grow font-medium relative mt-1">Top SM</p>
          <InfoIcon />
        </div>
      </div>
      <DataTable
        data={data.smart_money_for_token}
        columns={columns}
        emptyData="No result"
        noneBorder
        noneBgHeader
      />
    </div>
  )
}
