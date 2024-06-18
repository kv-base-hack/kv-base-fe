import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { cn } from '@/lib/utils'
import { TopActivity } from '@/types/topActivity'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { renderPrice } from '@/lib/utils/renderPrice'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'

export type Activity = {
  id: string
  time: string
  smart_money: string
  symbol: string
  movements: string
  value: {
    total: number
    amount: number
    symbol: string
  }
  avg_cost: number
  realized_pnl: {
    percent: number
    amount: number
  }
  unrealized_pnl: {
    percent: number
    amount: number
  }
}

export const columnsBigTradeActivity = (chain: string) => {
  const columns: ColumnDef<TopActivity>[] = [
    {
      accessorKey: 'time',
      header: () => 'Time',
      enableSorting: false,
      cell: ({ row }) => {
        const { time } = row.original
        return (
          <div className="text-neutral-04">
            {moment(time).format('MMM DD, HH:mm')}
          </div>
        )
      },
    },
    {
      accessorKey: 'symbol',
      header: () => 'Tokens',
      enableSorting: false,
      cell: ({ row }) => {
        const { symbol, token_address } = row.original
        return (
          <Link
            href={`/smartmoney-onchain/token-explorer/${token_address}$chain=${chain}`}
            className="flex gap-3 items-center justify-between text-right"
          >
            <ImageToken
              imgUrl={row?.original?.token_image_url}
              symbol={symbol}
            />
            <div className="underline">{symbol}</div>
          </Link>
        )
      },
    },
    {
      accessorKey: 'movements',
      header: () => 'Movements',
      enableSorting: false,
      cell: ({ row }) => {
        const { movement } = row.original
        return (
          <div
            className={cn(
              'flex items-center gap-2.5 justify-center self-stretch px-2 py-0.5 my-auto text-center whitespace-nowrap rounded-md bg-opacity-10',
              movement === 'deposit'
                ? 'bg-secondary-1/10 text-secondary-1'
                : movement === 'withdraw'
                ? 'bg-secondary-4/10 text-secondary-4'
                : movement === 'buying'
                ? 'bg-success-500/10 text-success-500'
                : movement === 'selling'
                ? 'bg-error-500/10 text-error-500'
                : movement === 'new_listing_buy'
                ? 'bg-[#89D36F]/10 text-[#89D36F]'
                : movement === 'new_listing_sell'
                ? 'bg-[#DC6803]/10 text-[#DC6803]'
                : 'bg-success-500/10 text-success-500',
            )}
          >
            {renderMovementIcon(movement)}
            {renderMovementName(movement)}
          </div>
        )
      },
    },
    {
      accessorKey: 'value',
      header: () => 'Value',
      enableSorting: false,
      size: 220,
      cell: ({ row }) => {
        const { value_in_usdt, symbol, value_in_token } = row.original
        return value_in_token ? (
          <div className="flex items-center gap-2">
            <div>{renderTradingValue(value_in_usdt)}</div>
            <div className="font-medium">
              <span className="text-success-500">
                (${nFormatter(value_in_usdt)}){' '}
              </span>
              {nFormatter(value_in_token)} {symbol}
            </div>
          </div>
        ) : (
          '-'
        )
      },
    },
    {
      accessorKey: 'avg_price',
      header: () => 'Avg Price',
      enableSorting: false,
      cell: ({ row }) => {
        const { avg_price } = row.original
        return (
          <div className={cn('flex items-center justify-center')}>
            {renderPrice(avg_price)}
          </div>
        )
      },
    },
    {
      accessorKey: 'current_price',
      header: () => 'Current Price',
      enableSorting: false,
      cell: ({ row }) => {
        const { price } = row.original
        return (
          <div className={cn('flex items-center justify-center')}>
            {renderPrice(price)}
          </div>
        )
      },
    },
    {
      accessorKey: '24h',
      header: () => <div className="text-sm not-italic leading-5">24h %</div>,
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
          <div className="text-left w-full">-</div>
        )
      },
    },
    {
      accessorKey: 'link_scan',
      header: () => 'Scan',
      size: 50,
      enableSorting: false,
      cell: ({ row }) => {
        const { scan_link } = row.original
        return (
          <a href={scan_link} target="_blank">
            <ExternalLink className="w-4 h-4 text-neutral-07" />
          </a>
        )
      },
    },
  ]
  return columns
}
