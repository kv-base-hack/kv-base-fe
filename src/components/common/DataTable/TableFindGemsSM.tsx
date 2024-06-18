import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopTokenBuy } from '@/types/topTokenBuy'
import { cn } from '@/lib/utils'
import { TooltipCustom } from '@/components/common/Tooltip'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { TableFindGemsProps } from '@/types'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { renderPrice } from '@/lib/utils/renderPrice'
import { TooltipTable } from '../Tooltip/TooltipTable'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'

export const TableFindGemsSM = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  setSort,
  chain,
}: TableFindGemsProps) => {
  const columns: ColumnDef<TopTokenBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">#</div>
        ),
        cell: ({ row }) => {
          return <div>{row.index + 1 + (page - 1) * perPage}</div>
        },
        size: 50,
      },
      {
        accessorKey: 'symbol',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5 whitespace-nowrap">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}?chain=${chain}`}
                    className="flex items-center gap-2"
                  >
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="flex flex-col gap-1.5 w-full items-start justify-start">
                      <div>{row?.original?.name}</div>
                      <div className="font-normal text-neutral-04">
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
                    <TooltipCustom
                      className="z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
                      content={row?.original?.name}
                    >
                      <div className="truncate max-w-40">
                        {row?.original?.name}
                      </div>
                    </TooltipCustom>
                    <div className="text-normal text-neutral-07">
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
        accessorKey: 'number_of_buys',
        enableSorting: false,
        header: () => (
          <div className="flex items-center gap-0.5">
            <div className="text-neutral-04 text-end text-sm not-italic leading-5 whitespace-nowrap">
              # of SM
            </div>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        size: 50,
        align: 'center',
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
      },
      {
        accessorKey: 'volume',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Volume
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { volume } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(volume)}
            </div>
          )
        },
      },
      // {
      //   accessorKey: 'balance_24h_change',
      //   header: () => (
      //     <div className="text-neutral-04 text-sm not-italic leading-5">
      //       24h Balance change
      //     </div>
      //   ),
      //   enableSorting: false,
      //   cell: ({ row }) => {
      //     const { balance_24h_change } = row.original
      //     return balance_24h_change ? (
      //       <div
      //         className={cn(
      //           'text-left flex items-center justify-start leading-[140%]',
      //           balance_24h_change > 0 ? 'text-success-500' : 'text-error-500',
      //           balance_24h_change === 0 && 'text-neutral-07',
      //         )}
      //       >
      //         {balance_24h_change !== 0 && balance_24h_change > 0 ? (
      //           <PercentUpIcon />
      //         ) : (
      //           <PercentDownIcon />
      //         )}
      //         {balance_24h_change > 0 ? '+' : ''}
      //         {balance_24h_change.toFixed(2)}%
      //       </div>
      //     ) : (
      //       <div className="text-left w-full">-</div>
      //     )
      //   },
      // },
      {
        accessorKey: 'avg_price',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Avg Price
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { avg_price } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              {renderPrice(avg_price)}
            </div>
          )
        },
      },
      {
        accessorKey: 'price',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Price
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              {renderPrice(current_price)}
            </div>
          )
        },
      },
      {
        accessorKey: '24h',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('price_change')}
            role="button"
          >
            24h
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h === 0 ? (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-neutral-07 text-sm not-italic  leading-5',
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
      },
      {
        accessorKey: 'liquidity',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('liquidity')}
            role="button"
          >
            Liquidity
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { liquidity_usd } = row.original
          return (
            <div className="text-neutral-07">
              {liquidity_usd ? nFormatter(liquidity_usd) : '-'}
            </div>
          )
        },
      },
      {
        accessorKey: 'fdv',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('fdv')}
            role="button"
          >
            FDV
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { fdv } = row.original
          return (
            <div className="text-neutral-07">{fdv ? nFormatter(fdv) : '-'}</div>
          )
        },
      },
      {
        accessorKey: 'volume_24h',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('volume_24h')}
            role="button"
          >
            24h Vol
          </div>
        ),
        align: 'end',
        cell: ({ row }) => {
          const { volume_24h = 0 } = row.original
          return (
            <div className="text-neutral-07">${nFormatter(volume_24h)}</div>
          )
        },
      },
    ]
  }, [chain, page, perPage, setSort])
  return (
    <RenderTableFindGemsByTab
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      dataTable={data}
      total={total}
      isFetching={isFetching}
      columns={columns}
    />
  )
}
