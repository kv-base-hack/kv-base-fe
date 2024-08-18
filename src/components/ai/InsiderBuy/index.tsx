'use client'

import { categoryAtom } from '@/atom/category'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { TokenSymbol } from '@/components/common/TokenSymbol'
import { IconTarget } from '@/components/shared/icons/leaderboard/IconTarget'
import { SmartMoneyNewListingBuyText } from '@/constant/message'
import { UnusualBuy } from '@/types/unusualBuy'
import { nFormatter } from '@/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { ColumnDef } from '@tanstack/react-table'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useMemo } from 'react'

export interface InsiderBuyProps {
  data: {
    unusual_token_buy: UnusualBuy[]
    total: number
  }
}

export const InsiderBuy: React.FC<InsiderBuyProps> = ({ data }) => {
  const page = 1
  const perPage = 10
  const [, setActiveTab] = useAtom(categoryAtom)

  const columns: ColumnDef<UnusualBuy>[] = useMemo(() => {
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
        header: '# of SM',
        cell: ({ row }) => {
          const { number_of_users, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_users}
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
          const { usdt_value } = row.original
          return <div>${nFormatter(usdt_value)}</div>
        },
        align: 'center',
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
      },
      {
        accessorKey: '24h',
        header: '24h',
        cell: ({ row }) => {
          const { price_change_24h } = row.original
          return (
            <div
              className={`${
                price_change_24h > 0
                  ? 'text-semantic-success-1'
                  : price_change_24h < 0
                    ? 'text-semantic-error-1'
                    : ''
              }`}
            >
              {price_change_24h ? `${price_change_24h}%` : '-'}
            </div>
          )
        },
        align: 'end',
      },
      {
        accessorKey: 'liquidity',
        header: 'Liquidity',
        cell: ({ row }) => {
          const { liquidity } = row.original
          return <div>${nFormatter(liquidity)}</div>
        },
        align: 'end',
      },
      {
        accessorKey: 'market_cap',
        header: 'Marketcap',
        cell: ({ row }) => {
          const { market_cap } = row.original
          return <div>${market_cap ? nFormatter(market_cap) : '-'}</div>
        },
        align: 'center',
      },
      // {
      //   accessorKey: '24h_vol',
      //   header: '24h Vol',
      //   cell: ({ row }) => {
      //     const { price } = row.original
      //     return <div>${nFormatter(price)}</div>
      //   },
      // }
    ]
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-lg border border-solid border-[#EFEFEF] bg-neutral-01 p-6 font-semibold leading-[160%] max-md:px-5">
        <TitleCard
          iconFirst={<IconTarget />}
          title="Insider Buy"
          content="List of tokens with insider buying actions identified by Kaivest's AI. Insider Buys may indicate insider trading and should be monitored closely."
        >
          <Link
            href="/find-gems"
            onClick={() => setActiveTab('Unusual Buying')}
            className="rounded-full bg-neutral-07 px-5 py-2 text-[15px] leading-6 text-[#FCFCFC]"
          >
            See Detail in Find Gems
          </Link>
        </TitleCard>
        <DataTable
          data={data.unusual_token_buy}
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
