'use client'

import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { TopTokenBuy } from '@/types/topTokenBuy'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { useMemo } from 'react'
import { DataTable } from '.'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'

export const TableTopTokenBuy = ({
  page,
  perPage,
  data,
  isFetching,
  duration,
  setSortBy,
}: {
  page: number
  perPage: number
  data: any[]
  isFetching?: boolean
  duration: string
  setSortBy: (value: string) => void
}) => {
  const columns: ColumnDef<TopTokenBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: () => (
          <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px]">
            #
          </div>
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
          <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
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
                      <div className="text-normal underline text-neutral-03">
                        {row?.original?.symbol}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal underline text-neutral-03">
                      {row?.original?.symbol}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        },
        enableSorting: false,
      },
      // {
      //   accessorKey: 'pnl',
      //   header: () => 'PnL',
      //   enableSorting: false,
      //   cell: ({ row }) => {
      //     const { pnl } = row.original
      //     return !pnl || pnl === 0 ? (
      //       '-'
      //     ) : (
      //       <div className={pnl < 0 ? 'text-error-500' : 'text-success-500'}>
      //         {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
      //           ? numeral(pnl).format('0,0.[000000]')
      //           : nFormatter(pnl)}
      //         $
      //       </div>
      //     )
      //   },
      // },
      {
        accessorKey: 'volume',
        header: () => (
          <div
            className="text-center w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSortBy('volume')}
            role="button"
          >
            Volume
          </div>
        ),
        cell: ({ row }) => {
          const { volume } = row.original
          return <div className="text-neutral-03">${nFormatter(volume)}</div>
        },
      },
      {
        accessorKey: 'balance_change_percent',
        header: () => (
          <div
            className="w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSortBy('balance_change')}
            role="button"
          >
            Balance Change
          </div>
        ),
        cell: ({ row }) => {
          const { balance_change_percent } = row.original
          return balance_change_percent ? (
            <div
              className={cn(
                'leading-[140%] flex items-center',
                balance_change_percent > 0
                  ? 'text-success-500'
                  : 'text-error-500',
                balance_change_percent === 0 && 'text-neutral-03',
              )}
            >
              {balance_change_percent !== 0 && balance_change_percent > 0 ? (
                <PercentUpIcon />
              ) : (
                <PercentDownIcon />
              )}
              {balance_change_percent.toFixed(2)}%
            </div>
          ) : (
            <div className="text-center w-full">-</div>
          )
        },
      },
      {
        accessorKey: 'avg_price',
        header: () => (
          <div className="text-center w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            Avg Price
          </div>
        ),
        cell: ({ row }) => {
          const { avg_price } = row.original
          return <div className="text-neutral-03">{renderPrice(avg_price)}</div>
        },
        enableSorting: false,
      },
      {
        accessorKey: 'price_change',
        header: () => (
          <div
            className="w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSortBy('price_change')}
            role="button"
          >
            Price %
          </div>
        ),
        cell: ({ row }) => {
          const { price_percent_change } = row.original
          return price_percent_change ? (
            <div
              className={cn(
                'leading-[140%] flex items-center',
                price_percent_change > 0
                  ? 'text-success-500'
                  : 'text-error-500',
                price_percent_change === 0 && 'text-neutral-03',
              )}
            >
              {price_percent_change > 0 ? '+' : ''}
              {price_percent_change.toFixed(2)}%
            </div>
          ) : (
            <div className="text-center w-full">-</div>
          )
        },
      },
      {
        accessorKey: 'buyer_count',
        header: () => (
          <div className="text-center w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            # of SM Buy
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { number_of_smart_money, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_smart_money}
              address={address}
              type="trade"
              duration={duration}
            />
          )
        },
        enableSorting: false,
      },
    ]
  }, [duration, page, perPage, setSortBy])
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
