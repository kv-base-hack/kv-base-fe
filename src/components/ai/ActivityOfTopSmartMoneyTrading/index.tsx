'use client'

import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import { TagMovement } from '@/components/common/Tags/Movement'
import { nFormatter } from '@/lib/utils/nFormatter'

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
            <div className="text-base text-[#6F767E]">
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
              className="max-w-32 text-xs text-neutral-07 underline"
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
              <div className="flex w-full items-center justify-start">
                {row?.original?.token_address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.token_address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-1.5">
                      <ImageToken
                        imgUrl={row?.original?.token_image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div className="text-normal text-neutral-04 underline">
                        {row?.original?.symbol}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
                    <ImageToken
                      imgUrl={row?.original?.token_image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal text-neutral-04 underline">
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
          return <div className="flex items-center gap-2">Price</div>
        },
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="text-xs font-bold text-neutral-07">
              {renderPrice(row.original.price)}
            </div>
          )
        },
      },
    ]
  }, [])
  return (
    <div className="rounded-lg border border-solid border-[#EFEFEF] bg-neutral-01 p-6 font-semibold leading-[160%] shadow-chat-ai backdrop-blur-lg max-md:px-5">
      <div className="w-fit rounded-[20px] border border-white/10 bg-[#EFEFEF] px-4 py-2">
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
        pageSize={5}
        total={data.total}
        setPage={() => {}}
      /> */}
    </div>
  )
}
