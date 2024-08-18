'use client'

import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { TopTokenSell } from '@/types/topTokenSell'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { DataTable } from '.'
import { TableProps } from '@/types'
import { useMemo } from 'react'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'
import { TokenSymbol } from '../TokenSymbol'

export const TableTopTokenSell = ({
  page,
  perPage,
  data,
  isFetching,
  duration,
  setSortBy,
}: TableProps) => {
  const columns: ColumnDef<TopTokenSell>[] = useMemo(() => {
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
          <div className="whitespace-nowrap font-normal leading-6 tracking-[-0.14px]">
            Tokens
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-1.5">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <TokenSymbol className="text-neutral-03">
                        {row?.original?.symbol}
                      </TokenSymbol>
                    </div>
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <TokenSymbol className="text-neutral-03">
                      {row?.original?.symbol}
                    </TokenSymbol>
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
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('volume')}
            role="button"
          >
            Volume
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { volume } = row.original
          return (
            <div className="w-full items-center justify-center text-center text-neutral-07">
              ${nFormatter(volume)}
            </div>
          )
        },
      },
      {
        accessorKey: 'balance_change_percent',
        header: () => (
          <div
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px]"
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
                'flex items-center leading-[140%]',
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
            <div className="w-full text-center">-</div>
          )
        },
      },
      {
        accessorKey: 'avg_price',
        header: () => (
          <div className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px]">
            Avg Price
          </div>
        ),
        cell: ({ row }) => {
          const { avg_price } = row.original
          return <div className="text-neutral-07">{renderPrice(avg_price)}</div>
        },
        enableSorting: false,
        align: 'center',
      },
      // {
      //   accessorKey: 'current_price',
      //   header: () => (
      //     <div className="text-center w-full font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
      //       Current Price
      //     </div>
      //   ),
      //   cell: ({ row }) => {
      //     const { current_price } = row.original
      //     return (
      //       <div className="text-neutral-07">{renderPrice(current_price)}</div>
      //     )
      //   },
      //   enableSorting: false,
      //   align: 'center',
      // },
      {
        accessorKey: 'price',
        header: () => (
          <div
            className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('price_change')}
            role="button"
          >
            Price %
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { price_percent_change } = row.original
          return price_percent_change ? (
            <div
              className={cn(
                'flex w-full items-center justify-center text-right leading-[140%]',
                price_percent_change > 0
                  ? 'text-success-500'
                  : 'text-error-500',
                price_percent_change === 0 && 'text-neutral-07',
              )}
            >
              {price_percent_change > 0 ? '+' : ''}
              {price_percent_change.toFixed(2)}%
            </div>
          ) : (
            <div className="w-full text-center">-</div>
          )
        },
      },
      {
        accessorKey: 'seller_count',
        header: () => (
          <div className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px]">
            # of SM Sell
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_smart_money, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_smart_money}
              address={address}
              type="trade"
              duration={duration as string}
            />
          )
        },
        enableSorting: false,
        align: 'center',
      },
    ]
  }, [duration, page, perPage, setSortBy])
  return (
    <DataTable
      className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
      columns={columns}
      data={data || []}
      isFetching={isFetching}
      noneBorder
      noneBgHeader
      emptyData="No results."
    />
  )
}
