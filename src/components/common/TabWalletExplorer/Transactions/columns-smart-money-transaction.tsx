import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { cn } from '@/lib/utils'
import { SmartMoneyTx } from '@/types/smartMoneyTransaction'
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
import TimeAgoIcon from '@/components/shared/icons/TimeAgo'
import { TooltipTable } from '../../Tooltip/TooltipTable'

export const columnsSmartMoneyTransaction: ColumnDef<SmartMoneyTx>[] = [
  {
    accessorKey: 'time',
    header: () => 'Time',
    enableSorting: false,
    cell: ({ row }) => {
      const { time } = row.original
      return (
        <div className="flex items-center gap-1 text-neutral-04">
          {moment(time).format('MMM DD, HH:mm')}
          <TimeAgoIcon />
        </div>
      )
    },
  },
  {
    accessorKey: 'smart_money',
    header: () => (
      <div className="flex items-center gap-2">
        <div>Smart Traders</div>
        <SortMultipleIcon className="h-4 w-4" />
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const { sender } = row.original
      return (
        <Link
          className="max-w-32 truncate underline"
          href={`/smartmoney-onchain/wallet-explorer/${sender}`}
        >
          {sender}
        </Link>
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
      return (
        <div
          className={cn(
            'my-auto flex items-center justify-center gap-2.5 self-stretch whitespace-nowrap rounded-md bg-opacity-10 px-2 py-0.5 text-center text-xs',
            movement === 'deposit'
              ? 'bg-secondary-1/10 text-secondary-1'
              : movement === 'withdraw'
                ? 'bg-secondary-4/10 text-secondary-4'
                : movement === 'buying'
                  ? 'bg-success-500/10 text-green'
                  : movement === 'selling'
                    ? 'bg-error-500/10 text-error-500'
                    : movement === 'new_listing_buy'
                      ? 'bg-[#89D36F]/10 text-[#89D36F]'
                      : movement === 'new_listing_sell'
                        ? 'bg-[#DC6803]/10 text-[#DC6803]'
                        : 'bg-success-500/10 text-green',
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
      return (
        <div className="flex items-center gap-2">
          <div>{renderTradingValue(value_in_usdt)}</div>
          <div className="font-medium">
            <span className="text-green">(${nFormatter(value_in_usdt)}) </span>
            {nFormatter(value_in_token)} {symbol}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'avg_price',
    header: () => {
      return (
        <div className="flex items-center gap-0.5">
          Avg Price
          <TooltipTable type="avgPrice" />
        </div>
      )
    },
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
