'use client'

import { DataTable } from '@/components/common/DataTable'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import { TagMovement } from '@/components/common/Tags/Movement'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'
import { renderPrice } from '@/lib/utils/renderPrice'
import { SmartMoneyTransaction } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import React, { useMemo } from 'react'

interface SmartMoneyTransactionsProps {
  data: {
    smart_money_tx: SmartMoneyTransaction[]
    total: number
  }
}

export const SmartMoneyTransactions: React.FC<SmartMoneyTransactionsProps> = ({
  data,
}) => {
  const columns: ColumnDef<SmartMoneyTransaction>[] = useMemo(() => {
    return [
      {
        accessorKey: 'time',
        header: () => 'Time',
        enableSorting: false,
        cell: ({ row }) => {
          const time = row.original.block_timestamp
          return (
            <div className="text-[#6F767E] text-base">
              {moment(time).fromNow()}
            </div>
          )
        },
      },
      {
        accessorKey: 'sm',
        header: () => (
          <div className="flex gap-2 items-center">
            <div>Smart Money</div>
            <SortMultipleIcon className="w-4 h-4" />
          </div>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { sender } = row.original
          return (
            <Link
              className="underline max-w-32 text-xs"
              href={`/smartmoney-onchain/wallet-explorer/${sender}`}
            >
              {sender.substring(0, 6)}...
              {sender.substring(sender.length - 4, sender.length)}
            </Link>
          )
        },
      },
      {
        accessorKey: 'movements',
        header: () => {
          return (
            <div className="flex gap-2 items-center">
              <div>Movements</div>
              <SortMultipleIcon className="w-4 h-4" />
            </div>
          )
        },
        enableSorting: false,
        cell: ({ row }) => {
          const { movement } = row.original
          return <TagMovement movement={movement} />
        },
      },
      {
        accessorKey: 'value',
        header: () => {
          return (
            <div className="flex gap-2 items-center">
              <div>Value</div>
              <SortMultipleIcon className="w-4 h-4" />
            </div>
          )
        },
        enableSorting: false,
        cell: ({ row }) => {
          const { value_in_usdt, symbol, value_in_token } = row.original
          return value_in_token ? (
            <div className="flex items-center gap-2 text-xs">
              <div>{renderTradingValue(value_in_usdt)}</div>
              <div className="font-medium">
                <span className="text-success-500">
                  ${nFormatter(value_in_usdt)}
                </span>
              </div>
            </div>
          ) : (
            '-'
          )
        },
      },
      {
        accessorKey: 'price',
        header: () => {
          return <div className="flex gap-2 items-center">Price</div>
        },
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="text-xs font-bold">
              {renderPrice(row.original.price)}
            </div>
          )
        },
      },
    ]
  }, [])

  return (
    <div className="p-6 font-semibold rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-01 bg-opacity-50 border-white/10 leading-[160%] max-md:px-5 mt-4">
      <div className="border border-white/10 rounded-[20px] bg-[#EFEFEF] w-fit py-2 px-4">
        <div className="flex items-center gap-2">
          <p className="grow font-medium relative mt-1">SM Transaction</p>
          <InfoIcon />
        </div>
      </div>
      <DataTable
        data={data.smart_money_tx}
        columns={columns}
        emptyData="No result"
        noneBorder
        noneBgHeader
      />
      {/* <PaginationTable
        className="mt-8"
        currentPage={1}
        pageSize={5}
        total={data.total}
        setPage={() => {}}
      /> */}
    </div>
  )
}
