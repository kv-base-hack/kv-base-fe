'use client'

import { categoryAtom } from '@/atom/category'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { TokenSymbol } from '@/components/common/TokenSymbol'
import { IconTarget } from '@/components/shared/icons/leaderboard/IconTarget'
import { SmartMoneyNewListingBuyText } from '@/constant/message'
import { NewListingBuy } from '@/types/newListingBuy'
import { nFormatter } from '@/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { ColumnDef } from '@tanstack/react-table'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useMemo } from 'react'

export interface NewListingBuyProps {
  data: {
    smart_money_new_listing_buy: NewListingBuy[]
    total: number
  }
}

export const SmartMoneyNewListingBuy: React.FC<NewListingBuyProps> = ({
  data,
}) => {
  const page = 1
  const perPage = 10
  const [, setActiveTab] = useAtom(categoryAtom)

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
          const { users } = row.original
          return <div>{users?.length}</div>
        },
        align: 'center',
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
      <div className="p-6 font-semibold rounded-lg border border-solid bg-neutral-01 border-[#EFEFEF] leading-[160%] max-md:px-5 flex flex-col gap-5">
        <TitleCard
          iconFirst={<IconTarget />}
          title="SM New Listing Buy"
          content="List of tokens created less than 14 days ago, bought by Smartmoney, ranked by default according to PnL."
        >
          <Link
            href="/find-gems"
            onClick={() => setActiveTab('SM New Listing Buys')}
            className="bg-neutral-07 px-5 py-2 rounded-full text-[#FCFCFC] text-[15px] leading-6"
          >
            See Detail in Find Gems
          </Link>
        </TitleCard>
        <DataTable
          data={data.smart_money_new_listing_buy}
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
