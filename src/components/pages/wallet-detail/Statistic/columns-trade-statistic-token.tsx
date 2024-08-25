import { ImageToken } from '@/components/common/Image/ImageToken'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { Balances } from '@/types/userBalance'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import { StTx } from '../../find-gems/tables/cols/st-tx'

export const columnsTradeStatisticToken = (setSort: (v: string) => void) => {
  const columns: ColumnDef<Balances>[] = [
    {
      accessorKey: 'symbol',
      header: () => <div className="whitespace-nowrap">Tokens/Last Active</div>,
      enableSorting: true,
      cell: ({ row }) => {
        const { symbol, time, token_address, image_url } = row.original
        return (
          <Link
            href={`/smartmoney-onchain/token-explorer/${token_address}`}
            className="flex items-center justify-between gap-3 text-right font-medium"
          >
            <ImageToken imgUrl={image_url} symbol={symbol} />
            <div className="flex flex-col text-start text-neutral-300">
              <div className="text-sm font-medium hover:underline">
                {symbol}
              </div>
              <div className="text-xs">
                {time ? moment(time).format('MMM DD, HH:mm') : '-'}
              </div>
            </div>
          </Link>
        )
      },
    },
    {
      accessorKey: '30_days_realized_profit',
      header: () => (
        <div className="whitespace-nowrap">30D Realized Profit</div>
      ),
      enableSorting: true,
      cell: ({ row }) => {
        const { realized_profit, realized_percent } = row.original
        return (
          <div className="flex flex-col text-start">
            <div
              className={cn(
                'text-sm font-medium',
                realized_profit > 0
                  ? 'text-green'
                  : realized_profit < 0
                    ? 'text-red'
                    : '',
              )}
            >
              {realized_profit > 0 ? '+' : realized_profit < 0 ? '-' : ''}
              {realized_profit ? `$${nFormatter(realized_profit)}` : '-'}
            </div>
            <div
              className={cn(
                'text-xs',
                realized_percent > 0
                  ? 'text-green'
                  : realized_percent < 0
                    ? 'text-red'
                    : '',
              )}
            >
              {realized_percent > 0 ? '+' : realized_percent < 0 ? '-' : ''}
              {realized_percent ? `${realized_percent?.toFixed(2)}%` : '-'}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: '30_days_unrealized_profit',
      header: () => (
        <div className="whitespace-nowrap">30D Unrealized Profit</div>
      ),
      enableSorting: true,
      cell: ({ row }) => {
        const { unrealized_profit, unrealized_percent } = row.original
        return (
          <div className="flex flex-col text-start">
            <div
              className={cn(
                'text-sm font-medium',
                unrealized_profit > 0
                  ? 'text-green'
                  : unrealized_profit < 0
                    ? 'text-red'
                    : '',
              )}
            >
              {unrealized_profit > 0 ? '+' : unrealized_profit < 0 ? '-' : ''}
              {unrealized_profit ? `$${nFormatter(unrealized_profit)}` : '-'}
            </div>
            <div
              className={cn(
                'text-xs',
                unrealized_percent > 0
                  ? 'text-green'
                  : unrealized_percent < 0
                    ? 'text-red'
                    : '',
              )}
            >
              {unrealized_percent > 0 ? '+' : unrealized_percent < 0 ? '-' : ''}
              {unrealized_percent ? `${unrealized_percent?.toFixed(2)}%` : '-'}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: '30_days_total_profit',
      header: () => <div>30D Total Profit</div>,
      enableSorting: true,
      cell: ({ row }) => {
        const { total_profit, pnl } = row.original
        return (
          <div
            className={cn(
              'flex flex-col text-start',
              total_profit > 0
                ? 'text-green'
                : total_profit < 0
                  ? 'text-red'
                  : '',
            )}
          >
            <div className="text-sm font-medium">
              {total_profit > 0 ? '+' : total_profit < 0 ? '-' : ''}
              {total_profit ? `$${nFormatter(total_profit)}` : '-'}
            </div>
            <div className={cn('text-xs', pnl > 0 ? 'text-green' : 'text-red')}>
              {pnl > 0 ? '+' : pnl < 0 ? '-' : ''}
              {pnl ? `$${pnl?.toFixed(2)}%` : '-'}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'balance',
      header: () => 'Balance',
      enableSorting: true,
      cell: ({ row }) => {
        const { hold_in_usdt = 0 } = row.original
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">
              ${nFormatter(hold_in_usdt)}
            </div>
            {/* <div className="text-xs">{formatPriceNumber(volume)}</div> */}
          </div>
        )
      },
    },
    {
      accessorKey: 'realized',
      header: () => 'Realized %',
      enableSorting: true,
      cell: ({ row }) => {
        const { realized_percent = 0 } = row.original
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">
              {realized_percent?.toFixed(2)}%
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'avg_entry_vol',
      header: () => 'Avg Entry/Vol',
      enableSorting: true,
      cell: ({ row }) => {
        const { avg_entry, buy_volume } = row.original
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">{renderPrice(avg_entry)}</div>
            <div className="text-xs">
              {buy_volume ? `$${nFormatter(buy_volume)}` : '-'}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'avg_entry_sell_vol',
      header: () => 'Avg Price Sell/Vol',
      enableSorting: true,
      cell: ({ row }) => {
        const { avg_sell, sell_volume } = row.original
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">{renderPrice(avg_sell)}</div>
            <div className="text-xs">
              {sell_volume ? `$${nFormatter(sell_volume)}` : '-'}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'txs',
      header: () => <div>TXs</div>,
      enableSorting: true,
      cell: ({ row }) => {
        const { tx_buy, tx_sell } = row.original

        return <StTx tx_buy={tx_buy} tx_sell={tx_sell} />
      },
    },
  ]

  return columns
}
