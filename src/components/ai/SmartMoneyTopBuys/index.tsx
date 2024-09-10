'use client'

import { categoryAtom } from '@/atom/category'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { TokenSymbol } from '@/components/common/TokenSymbol'
import { IconShoppingCart } from '@/components/shared/icons/leaderboard/IconShoppingCart'
import { SmartMoneyNewListingBuyText } from '@/constant/message'
import { cn } from '@/lib/utils'
import { TopTokenBuy, TopTokenBuyResponse } from '@/types/topTokenBuy'
import { nFormatter } from '@/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { ColumnDef } from '@tanstack/react-table'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useMemo } from 'react'

export const SmartMoneyTopBuys: React.FC<TopTokenBuyResponse> = ({ data }) => {
  const [, setActiveTab] = useAtom(categoryAtom)
  const page = 1
  const perPage = 10

  const columns: ColumnDef<TopTokenBuy>[] = useMemo(() => {
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
                    <div className="text-normal underline">
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
      {
        accessorKey: 'number_of_sm',
        header: '# of ST',
        cell: ({ row }) => {
          const { number_of_smart_money, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_smart_money}
              address={address}
              type="trade"
              duration="24h"
            />
          )
        },
        align: 'center',
        enableSorting: false,
      },
      {
        accessorKey: 'value',
        header: 'Value',
        cell: ({ row }) => {
          const { volume } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              ${nFormatter(volume)}
            </div>
          )
        },
        align: 'center',
        enableSorting: false,
      },
      {
        accessorKey: 'avg_price',
        header: 'Avg price',
        cell: ({ row }) => {
          const { avg_price } = row.original
          return (
            <div className="text-semantic-success-1">
              {avg_price ? renderPrice(avg_price) : '-'}
            </div>
          )
        },
        align: 'center',
        enableSorting: false,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-semantic-success-1">
              {current_price ? renderPrice(current_price) : '-'}
            </div>
          )
        },
        align: 'end',
        enableSorting: false,
      },
      {
        accessorKey: '24h',
        header: '24h',
        cell: ({ row }) => {
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h === 0 ? (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-sm not-italic leading-5 text-neutral-07',
                price_percent_change_24h > 0
                  ? 'text-success-500'
                  : 'text-error-500',
              )}
            >
              {price_percent_change_24h > 0 ? '+' : ''}
              {price_percent_change_24h.toFixed(2)}%
            </div>
          )
        },
        align: 'end',
        enableSorting: false,
      },
      {
        accessorKey: 'liquidity',
        enableSorting: false,
        header: 'Liquidity',
        cell: ({ row }) => {
          const { liquidity_usd } = row.original
          return <div>${liquidity_usd ? nFormatter(liquidity_usd) : '-'}</div>
        },
        align: 'end',
      },
      {
        accessorKey: 'fdv',
        header: 'FDV',
        enableSorting: false,
        align: 'center',
        cell: ({ row }) => {
          const { fdv } = row.original
          return (
            <div className="text-neutral-07">{fdv ? nFormatter(fdv) : '-'}</div>
          )
        },
      },
    ]
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-5 rounded-lg border border-solid border-[#EFEFEF] bg-neutral-01 p-6 font-semibold leading-[160%] max-md:px-5">
        <TitleCard
          iconFirst={<IconShoppingCart />}
          title="ST Top Buys"
          content="Top purchases made by Smart Trader ranked by Volume Buy."
        >
          <Link
            href="/find-gems"
            onClick={() => setActiveTab('ST Top Buys')}
            className="rounded-full bg-neutral-07 px-5 py-2 text-[15px] leading-6 text-[#FCFCFC]"
          >
            See Detail in Find Gems
          </Link>
        </TitleCard>
        <DataTable
          data={data.top_buy_by_smart_money}
          columns={columns}
          emptyData="No result"
          noneBorder
          noneBgHeader
        />
      </div>
      <SmartMoneyNewListingBuyText />
    </div>
  )
}
