import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
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
import { FilterIcon } from 'lucide-react'
import { SmartTradersCell } from '../../Cell/smart-traders'
import { TooltipTokenMoreInfo } from '../../Tooltip/tool-tip-more-info'
import Image from 'next/image'

export const columnsActivitySmartMoneyOfToken: ColumnDef<Activity>[] = [
  {
    accessorKey: 'time',
    header: () => 'Time',
    cell: ({ row }) => {
      const { time, scan_link } = row.original
      return (
        <div className="flex items-center gap-2 text-neutral-04">
          {moment(time).format('MMM DD, HH:mm')}
          <Link href={scan_link} passHref legacyBehavior>
            <a target="_blank">
              <Image
                src={'/images/logo-scan.svg'}
                alt="base-scan"
                width={20}
                height={20}
              />
            </a>
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: 'smart_money',
    header: () => (
      <div className="flex items-center gap-2">
        <div>Smart Traders</div>
        <FilterIcon className="h-4 w-4" />
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      return <SmartTradersCell data={row.original} />
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
        <div className="flex items-center gap-2 text-neutral-300">
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
    accessorKey: 'current_price',
    header: () => 'Price',
    enableSorting: false,
    cell: ({ row }) => {
      const { price } = row.original
      return (
        <div
          className={cn('flex items-center justify-center text-neutral-300')}
        >
          {renderPrice(price)}
        </div>
      )
    },
  },
  {
    accessorKey: 'avg_entry_buy',
    header: () => 'Avg Entry Buy',
    enableSorting: false,
    cell: ({ row }) => {
      const { avg_price } = row.original
      return (
        <div
          className={cn('flex items-center justify-center text-neutral-300')}
        >
          {renderPrice(avg_price)}
        </div>
      )
    },
  },
  {
    accessorKey: ' ',
    enableSorting: false,
    cell: ({ row }) => {
      return <TooltipTokenMoreInfo data={row.original} />
    },
  },
]
