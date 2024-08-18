import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { cn } from '@/lib/utils'
import { Activity } from '@/types/activitySmartMoneyOfToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { renderPrice } from '@/lib/utils/renderPrice'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'
import { ExternalLink } from 'lucide-react'
import { TagMovement } from '../Tags/Movement'
import { TokenSymbol } from '../TokenSymbol'

export const columnsActivitySmartMoneyOfToken = (chain: string) => {
  const columns: ColumnDef<Activity>[] = [
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
      accessorKey: 'smart_money',
      header: () => (
        <div className="flex items-center gap-2">
          <div>Smart Money</div>
          <SortMultipleIcon className="h-4 w-4" />
        </div>
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { sender } = row.original
        return (
          <Link
            className="max-w-32 truncate underline"
            href={`/smartmoney-onchain/wallet-explorer/${sender}?chain=${chain}`}
          >
            {sender}
          </Link>
        )
      },
    },
    {
      accessorKey: 'symbol',
      header: () => 'Tokens',
      enableSorting: false,
      cell: ({ row }) => {
        const { symbol } = row.original
        return row?.original?.token_address ? (
          <Link
            href={`/smartmoney-onchain/token-explorer/${row.original.token_address}?chain=${chain}`}
            className="flex items-center justify-between gap-3 text-right"
          >
            <ImageToken
              imgUrl={row?.original?.token_image_url}
              symbol={symbol}
            />
            <TokenSymbol>{symbol}</TokenSymbol>
          </Link>
        ) : (
          <div className="flex cursor-not-allowed items-center justify-between gap-3 text-right">
            <ImageToken
              imgUrl={row?.original?.token_image_url}
              symbol={symbol}
            />
            <TokenSymbol>{symbol}</TokenSymbol>
          </div>
        )
      },
    },
    {
      accessorKey: 'movements',
      header: () => {
        return <div>Movements</div>
      },
      enableSorting: false,
      cell: ({ row }) => {
        const { movement } = row.original
        return <TagMovement movement={movement} />
      },
    },
    {
      accessorKey: 'value',
      header: () => 'Value',
      enableSorting: false,
      size: 220,
      cell: ({ row }) => {
        const { value_in_usdt, symbol, value_in_token } = row.original
        return (
          <div className="flex items-center gap-2">
            <div>{renderTradingValue(value_in_usdt)}</div>
            <div className="font-medium">
              <span className="text-success-500">
                (${nFormatter(value_in_usdt)}){' '}
              </span>
              {nFormatter(value_in_token)} {symbol}
            </div>
          </div>
        )
      },
    },
    // {
    //   accessorKey: 'avg_price',
    //   header: () => 'Avg Price',
    //   enableSorting: false,
    //   cell: ({ row }) => {
    //     const { avg_price } = row.original
    //     return (
    //       <div className={cn('flex items-center justify-center')}>
    //         {renderPrice(avg_price)}
    //       </div>
    //     )
    //   },
    // },
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
      accessorKey: 'link_scan',
      header: () => 'Scan',
      size: 50,
      enableSorting: false,
      cell: ({ row }) => {
        const { scan_link } = row.original
        return (
          <a href={scan_link} target="_blank">
            <ExternalLink className="h-4 w-4 text-neutral-03" />
          </a>
        )
      },
    },
  ]
  return columns
}
