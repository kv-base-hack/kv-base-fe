import { ImageToken } from '@/components/common/Image/ImageToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'
import Link from 'next/link'
import moment from 'moment'
import { TokenStat } from '@/types/tradeStatisticTokens'
import { cn } from '@/lib/utils'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'

export const columnsTradeStatisticToken = (setSort: (v: string) => void) => {
  const columns: ColumnDef<TokenStat>[] = [
    {
      accessorKey: 'symbol',
      header: () => <div className="whitespace-nowrap">Tokens/Last Active</div>,
      enableSorting: true,
      cell: ({ row }) => {
        const { symbol, time } = row.original
        return (
          <Link
            href={`/smartmoney-onchain/token-explorer/${row.original.tokenAddress}`}
            className="flex items-center justify-between gap-3 text-right font-medium"
          >
            <ImageToken imgUrl={row?.original?.imageUrl} symbol={symbol} />
            <div className="flex flex-col text-start text-neutral-300">
              <div className="text-sm font-medium hover:underline">
                {symbol}
              </div>
              <div className="text-xs">
                {moment(time).format('MMM DD, HH:mm')}
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
        const { realized_percent_30d } = row.original
        return (
          <div className="flex flex-col text-start text-green">
            <div className="text-sm font-medium">?</div>
            <div
              className={cn(
                'text-xs',
                realized_percent_30d > 0 ? 'text-green' : 'text-red',
              )}
            >
              {realized_percent_30d > 0 ? '+' : '-'}
              {realized_percent_30d?.toFixed(2)}%
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
        const { unrealized_percent_30d } = row.original
        return (
          <div className="flex flex-col text-start text-green">
            <div className="text-sm font-medium">?</div>
            <div
              className={cn(
                'text-xs',
                unrealized_percent_30d > 0 ? 'text-green' : 'text-red',
              )}
            >
              {unrealized_percent_30d > 0 ? '+' : '-'}
              {unrealized_percent_30d?.toFixed(2)}%
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
        const { total_profit_30d, pnl } = row.original
        return (
          <div className="flex flex-col text-start text-green">
            <div className="text-sm font-medium">{formatPriceNumber(pnl)}</div>
            <div
              className={cn(
                'text-xs',
                total_profit_30d > 0 ? 'text-green' : 'text-red',
              )}
            >
              {total_profit_30d > 0 ? '+' : '-'}
              {total_profit_30d?.toFixed(2)}%
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
        const { balance = 0, volume } = row.original
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">
              {formatPriceNumber(balance)}
            </div>
            <div className="text-xs">{formatPriceNumber(volume)}</div>
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
        const { avg_price, volume } = row.original
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">
              {formatPriceNumber(avg_price)}
            </div>
            <div className="text-xs">{formatPriceNumber(volume)}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'avg_entry_sell_vol',
      header: () => 'Avg Price Sell/Vol',
      enableSorting: true,
      cell: ({ row }) => {
        const { entry_price_sell, volume } = row.original
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">
              {formatPriceNumber(entry_price_sell)}
            </div>
            <div className="text-xs">{formatPriceNumber(volume)}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'txs',
      header: () => <div>TXs</div>,
      enableSorting: true,
      cell: ({ row }) => {
        return (
          <div className="flex flex-col text-start text-neutral-300">
            <div className="text-sm font-medium">0/0</div>
          </div>
        )
      },
    },
  ]

  return columns
}
