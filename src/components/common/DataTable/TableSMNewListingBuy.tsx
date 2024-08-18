'use client'

import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { useMemo } from 'react'
import { DataTable } from '.'
import { TableProps } from '@/types'
import { NewListingBuy } from '@/types/newListingBuy'
import numeral from 'numeral'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'
import { TokenSymbol } from '../TokenSymbol'

export const TableSMNewListingBuy = ({
  page,
  perPage,
  data,
  isFetching,
  duration,
  setSortBy,
}: TableProps) => {
  const columns: ColumnDef<NewListingBuy>[] = useMemo(() => {
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
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-1.5">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <TokenSymbol>{row?.original?.symbol}</TokenSymbol>
                    </div>
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
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
        accessorKey: 'token_age',
        header: () => (
          <div
            className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('token_age')}
            role="button"
          >
            Token Age
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { token_age } = row.original
          return (
            <div className="w-full text-center text-neutral-07">
              {token_age}
            </div>
          )
        },
      },
      {
        accessorKey: 'total-spent',
        header: () => (
          <div
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px] text-neutral-04"
            onClick={() => setSortBy('total_spent')}
            role="button"
          >
            Total Spent
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { total_spent } = row.original
          return (
            <div className="w-full items-center justify-center text-center text-neutral-07">
              ${nFormatter(total_spent)}
            </div>
          )
        },
      },
      {
        accessorKey: 'pnl',
        header: () => (
          <div
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('pnl')}
            role="button"
          >
            PnL
          </div>
        ),
        cell: ({ row }) => {
          const { pnl } = row.original
          return !pnl || pnl === 0 ? (
            '-'
          ) : (
            <div className={pnl < 0 ? 'text-error-500' : 'text-success-500'}>
              {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                ? numeral(pnl).format('0,0.[000000]')
                : nFormatter(pnl)}
              $
            </div>
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
      },
      {
        accessorKey: 'price',
        header: () => (
          <div
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('price_change')}
            role="button"
          >
            Price %
          </div>
        ),
        cell: ({ row }) => {
          const { price_change_24h } = row.original
          return price_change_24h ? (
            <div
              className={cn(
                'flex items-center leading-[140%]',
                price_change_24h > 0 ? 'text-success-500' : 'text-error-500',
                price_change_24h === 0 && 'text-neutral-03',
              )}
            >
              {price_change_24h > 0 ? '+' : ''}
              {price_change_24h.toFixed(2)}%
            </div>
          ) : (
            <div className="w-full text-center">-</div>
          )
        },
      },
      {
        accessorKey: 'buyer_count',
        header: () => (
          <div className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px]">
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
              type="new_listing_buy"
              duration={duration as string}
            />
          )
        },
        enableSorting: false,
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
