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
import { TokenSymbol } from '../TokenSymbol'

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
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row.original.address}?chain=${chain}`}
                    className="flex items-center justify-between gap-3 text-right"
                  >
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <TokenSymbol>{row?.original?.symbol}</TokenSymbol>
                  </Link>
                ) : (
                  <div className="flex cursor-not-allowed items-center justify-between gap-3 text-right">
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
              className="z-999 w-[320px] border-white/10 bg-neutral-06 text-neutral-02 shadow-sm"
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
              className="z-999 w-[320px] border-white/10 bg-neutral-06 text-neutral-02 shadow-sm"
              content="The average purchase price of the token by Smart Money."
            >
              <Info className="h-5 w-5" />
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
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap"
            role="button"
          >
            <div>Price (%)</div>
            <div className="flex h-4 w-4 items-center justify-center">
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
            className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px]"
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
            className="flex items-center"
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
      className="whitespace-nowrap bg-neutral-07/50 text-base font-semibold leading-6 tracking-normal text-gray-300"
      columns={columns}
      data={data}
      isFetching={isFetching}
      noneBorder
      noneBgHeader
      emptyData="No results."
    />
  )
}
