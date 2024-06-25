'use client'

import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import { TagMovement } from '@/components/common/Tags/Movement'
import InfoIcon from '@/components/shared/icons/dashboard/InfoIcon'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'
import { renderPrice } from '@/lib/utils/renderPrice'
import { ActivitySmartMoneyOfTokenProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import React, { useMemo } from 'react'

interface ActivityOfTopSmartMoneyTradingProps {
  data: {
    total: number
    activities: ActivitySmartMoneyOfTokenProps[]
  }
}

export const ActivityOfTopSmartMoneyTrading: React.FC<
  ActivityOfTopSmartMoneyTradingProps
> = ({ data }) => {
  const columns: ColumnDef<ActivitySmartMoneyOfTokenProps>[] = useMemo(() => {
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
        header: () => <div>Smart Money</div>,
        enableSorting: false,
        cell: ({ row }) => {
          const { sender } = row.original
          return (
            <Link
              className="underline max-w-32 text-xs text-neutral-07"
              href={`/smartmoney-onchain/wallet-explorer/${sender}`}
            >
              {sender.substring(0, 6)}...
              {sender.substring(sender.length - 4, sender.length)}
            </Link>
          )
        },
      },
      {
        accessorKey: 'token',
        header: () => <div>Token</div>,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.token_address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.token_address}`}
                  >
                    <div className="flex gap-1.5 w-full items-center justify-start">
                      <ImageToken
                        imgUrl={row?.original?.token_image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div className="text-normal underline text-neutral-04">
                        {row?.original?.symbol}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
                    <ImageToken
                      imgUrl={row?.original?.token_image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal underline text-neutral-04">
                      {row?.original?.symbol}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'movements',
        header: () => {
          return <div>Movements</div>
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
          return <div>Value</div>
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
        accessorKey: 'current_price',
        header: () => {
          return <div className="flex gap-2 items-center">Price</div>
        },
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="text-neutral-07 text-xs font-bold">
              {renderPrice(row.original.price)}
            </div>
          )
        },
      },
    ]
  }, [])
  return (
    <div className="p-6 font-semibold rounded-lg border border-solid backdrop-blur-lg bg-neutral-01 border-[#EFEFEF] shadow-chat-ai leading-[160%] max-md:px-5">
      <div className="border border-white/10 rounded-[20px] bg-[#EFEFEF] w-fit py-2 px-4">
        <div className="flex items-center gap-2">
          <p>Activity of Top SM</p>
        </div>
      </div>
      <DataTable
        data={data.activities}
        columns={columns}
        emptyData="No result"
        noneBorder
        noneBgHeader
      />
      {/* <PaginationTable
        className="mt-8"
        currentPage={1}
        updatePage={() => {}}
        pageSize={5}
        total={data.total}
        setPage={() => {}}
      /> */}
    </div>
  )
}
