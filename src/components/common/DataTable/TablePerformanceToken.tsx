import { ImageToken } from '@/components/common/Image/ImageToken'
import { TooltipCustom } from '@/components/common/Tooltip'
import Info from '@/components/shared/icons/Info'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { SortIcon } from '@/components/shared/icons/SortIcon'
import { cn } from '@/lib/utils'
import { TopTokenProfit } from '@/types/topTokenProfit'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'
import { DataTable } from '.'
import { renderPrice } from '@/lib/utils/renderPrice'
import numeral from 'numeral'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'

interface TablePerformanceTokenProps {
  data: any[]
  isFetching: boolean
  setSortBy: (value: string) => void
  duration: string
  chain: string
}

export const TablePerformanceToken = ({
  data,
  isFetching,
  setSortBy,
  duration,
  chain,
}: TablePerformanceTokenProps) => {
  const columns: ColumnDef<TopTokenProfit>[] = useMemo(() => {
    return [
      {
        accessorKey: 'symbol',
        header: () => 'Tokens',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row.original.address}?chain=${chain}`}
                    className="flex gap-3 items-center justify-between text-right"
                  >
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="underline">{row?.original?.symbol}</div>
                  </Link>
                ) : (
                  <div className="flex gap-3 cursor-not-allowed items-center justify-between text-right">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div>{row?.original?.symbol}</div>
                  </div>
                )}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'pnl',
        header: () => (
          <div
            onClick={() => setSortBy('pnl')}
            className="cursor-pointer whitespace-nowrap"
            role="button"
          >
            PnL
          </div>
        ),
        cell: ({ row }) => {
          const { pnl } = row.original
          return pnl === 0 ? (
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
        accessorKey: 'avg_roi',

        header: () => (
          <div
            onClick={() => setSortBy('avg_roi')}
            className="cursor-pointer whitespace-nowrap"
            role="button"
          >
            Avg ROI
          </div>
        ),
        cell: ({ row }) => {
          const { avg_roi } = row.original
          return (
            <div className="justify-end">
              {avg_roi ? `${avg_roi.toFixed(2)}%` : '-'}
            </div>
          )
        },
      },
      {
        accessorKey: 'realized_percentage',
        header: () => (
          <div
            className="flex items-center justify-center gap-2"
            onClick={() => setSortBy('realized_percent')}
            role="button"
          >
            <div className="text-center">Realized %</div>
            <TooltipCustom
              className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
              content="The percentage of tokens sold after purchase."
            >
              <Info />
            </TooltipCustom>
          </div>
        ),
        cell: ({ row }) => {
          const { realized } = row.original
          return (
            <div className="flex w-full justify-start">
              {realized.toFixed(2)}%
            </div>
          )
        },
      },
      {
        accessorKey: 'avg_cost',
        header: () => (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div>Avg Price</div>
            <TooltipCustom
              className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
              content="The average purchase price of the token by Smart Money."
            >
              <Info />
            </TooltipCustom>
          </div>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { avg_cost } = row.original
          return <div>{renderPrice(avg_cost)}</div>
        },
      },
      {
        accessorKey: 'current_price',
        header: () => <div className="whitespace-nowrap">Current Price</div>,
        enableSorting: false,
        cell: ({ row }) => {
          const { current_price } = row.original
          return <div>{renderPrice(current_price)}</div>
        },
      },
      {
        accessorKey: 'price',
        enableSorting: false,
        header: () => (
          <div
            onClick={() => setSortBy('price_change')}
            className="cursor-pointer flex items-center gap-2 whitespace-nowrap"
            role="button"
          >
            <div>Price (%)</div>
            <div className="flex justify-center items-center w-4 h-4">
              <SortIcon />
            </div>
          </div>
        ),
        cell: ({ row }) => {
          const { price_change_24h } = row.original
          return price_change_24h ? (
            <div
              className={cn(
                'flex items-center justify-start leading-[140%]',
                price_change_24h > 0 ? 'text-success-500' : 'text-error-500',
                price_change_24h === 0 && 'text-neutral-07',
              )}
            >
              {price_change_24h !== 0 && price_change_24h > 0 ? (
                <PercentUpIcon />
              ) : (
                <PercentDownIcon />
              )}
              {price_change_24h > 0 ? '+' : ''}
              {price_change_24h.toFixed(2)}%
            </div>
          ) : (
            <div>-</div>
          )
        },
      },
      {
        accessorKey: 'liquidity',
        header: () => (
          <div
            className="text-center w-full font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSortBy('liquidity')}
            role="button"
          >
            Liquidity
          </div>
        ),
        cell: ({ row }) => {
          const { liquidity } = row.original
          return <>{liquidity ? nFormatter(liquidity) : '-'}</>
        },
        align: 'center',
      },
      {
        accessorKey: 'number_of_buys',
        header: () => (
          <div
            className="text-neutral-07 text-end text-sm not-italic leading-5"
            onClick={() => setSortBy('number_of_smart_money')}
            role="button"
          >
            # of SM
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { number_of_smart_money, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_smart_money as number}
              address={address}
              type="profit"
              duration={duration}
            />
          )
        },
      },
    ]
  }, [chain, duration, setSortBy])
  return (
    <DataTable
      className="text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap bg-neutral-07/50"
      columns={columns}
      data={data}
      isFetching={isFetching}
      noneBorder
      noneBgHeader
      emptyData="No results."
    />
  )
}
