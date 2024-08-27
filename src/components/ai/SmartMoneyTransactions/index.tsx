'use client'

import { DataTable } from '@/components/common/DataTable'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import { TagMovement } from '@/components/common/Tags/Movement'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { nFormatter } from '@/lib/utils/nFormatter'
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
            <div className="text-base text-[#6F767E]">
              {moment(time).fromNow()}
            </div>
          )
        },
      },
      {
        accessorKey: 'sm',
        header: () => (
          <div className="flex items-center gap-2">
            <div>Smart Traders</div>
            <SortMultipleIcon className="h-4 w-4" />
          </div>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { sender } = row.original
          return (
            <Link
              className="max-w-32 text-xs underline"
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
            <div className="flex items-center gap-2">
              <div>Movements</div>
              <SortMultipleIcon className="h-4 w-4" />
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
            <div className="flex items-center gap-2">
              <div>Value</div>
              <SortMultipleIcon className="h-4 w-4" />
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
          return <div className="flex items-center gap-2">Price</div>
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
    <div className="mt-4 rounded-lg border border-solid border-white/10 bg-neutral-01 bg-opacity-50 p-6 font-semibold leading-[160%] shadow-2xl backdrop-blur-lg max-md:px-5">
      <div className="w-fit rounded-[20px] border border-white/10 bg-[#EFEFEF] px-4 py-2">
        <div className="flex items-center gap-2">
          <p className="relative mt-1 grow font-medium">ST Transaction</p>
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
