'use client'

import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopCexWithdraw } from '@/types/cexWithdraw'
import { cn } from '@/lib/utils'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { useMemo } from 'react'
import { DataTable } from '.'
import { TableProps } from '@/types'
import { TokenSymbol } from '../TokenSymbol'

export const TableCexWithdraw = ({
  page,
  perPage,
  data,
  isFetching,
}: TableProps) => {
  const columns: ColumnDef<TopCexWithdraw>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: () => (
          <div className="font-normal leading-6 tracking-[-0.14px]">#</div>
        ),
        cell: ({ row }) => {
          return <div>{row.index + 1 + (page - 1) * perPage}</div>
        },
        size: 50,
        enableSorting: false,
      },
      {
        accessorKey: 'symbol',
        header: () => (
          <div className="font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            Tokens
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex gap-1.5 w-full items-center justify-start">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <TokenSymbol>{row?.original?.symbol}</TokenSymbol>
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <TokenSymbol>{row?.original?.symbol}</TokenSymbol>
                  </div>
                )}
              </div>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'withdraw_value',
        header: () => (
          <div className="text-center w-full font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            Withdraw Value
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { value } = row.original
          return (
            <div className="w-full text-center text-neutral-07">
              ${nFormatter(value)}
            </div>
          )
        },
      },
      {
        accessorKey: 'cex_netflow',
        header: () => (
          <div className="text-center w-full font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            CEX Netflow
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { net_flow } = row.original
          return (
            <div className="text-neutral-07 text-center w-full">
              ${nFormatter(net_flow)}
            </div>
          )
        },
      },
      {
        accessorKey: 'oi',
        header: () => (
          <div className="text-sm w-full not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            OI (%)
          </div>
        ),
        align: 'end',
        cell: ({ row }) => {
          const { oi } = row.original
          return oi ? (
            <div
              className={cn(
                oi > 0 ? 'text-success-500' : 'text-error-500',
                oi === 0 && 'text-neutral-07',
              )}
            >
              {oi > 0 ? '+' : ''}
              {oi.toFixed(2)}%
            </div>
          ) : (
            <div>-</div>
          )
        },
        enableSorting: false,
      },
    ]
  }, [page, perPage])
  return (
    <DataTable
      className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
      columns={columns}
      data={data || []}
      isFetching={isFetching}
      noneBorder
      noneBgHeader
      emptyData="No results."
    />
  )
}
