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
import TimeAgoIcon from '@/components/shared/icons/TimeAgo'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { ActivityWalletExplorer } from '@/types/wallet-explorer'

export const columnsActivityWalletDetail: ColumnDef<ActivityWalletExplorer>[] = [
  {
    accessorKey: 'time',
    header: () => 'Time',
    cell: ({ row }) => {
      const { tx, scan_link } = row.original
      return (
        <div className="flex items-center gap-1 text-neutral-04">
          {moment(tx.time).fromNow()}
          <Link href={scan_link} legacyBehavior passHref>
            <a target="_blank">
              <TimeAgoIcon />
            </a>
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: 'symbol',
    header: () => 'Tokens',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol, tx } = row.original
      return tx?.token_address ? (
        <Link
          href={`/smartmoney-onchain/token-explorer/${tx?.token_address}`}
          className="flex items-center justify-between gap-3 text-right font-medium text-neutral-300"
        >
          <ImageToken imgUrl={row?.original?.token_image_url} symbol={symbol} />
          <div>{symbol}</div>
        </Link>
      ) : (
        <div className="flex cursor-not-allowed items-center justify-between gap-3 text-right">
          <ImageToken imgUrl={row?.original?.token_image_url} symbol={symbol} />
          <div className="font-medium text-neutral-300">{symbol}</div>
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
      const { tx } = row.original
      return (
        <div
          className={cn(
            'my-auto flex items-center justify-center gap-2.5 self-stretch whitespace-nowrap rounded-md bg-opacity-10 px-2 py-1.5 text-center text-xs',
            tx.movement === 'deposit'
              ? 'bg-secondary-1/10 text-secondary-1'
              : tx.movement === 'withdraw'
                ? 'bg-secondary-4/10 text-secondary-4'
                : tx.movement === 'buying'
                  ? 'bg-success-500/10 text-green'
                  : tx.movement === 'selling'
                    ? 'bg-error-500/10 text-error-500'
                    : tx.movement === 'new_listing_buy'
                      ? 'bg-[#89D36F]/10 text-[#89D36F]'
                      : tx.movement === 'new_listing_sell'
                        ? 'bg-[#DC6803]/10 text-[#DC6803]'
                        : 'bg-success-500/10 text-green',
          )}
        >
          {renderMovementIcon(tx.movement)}
          {renderMovementName(tx.movement)}
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
      const { tx, symbol } = row.original
      return (
        <div className="flex items-center gap-2 text-neutral-300">
          <div>{renderTradingValue(tx.value_in_usdt)}</div>
          <div className="font-medium">
            <span className="text-green">(${nFormatter(tx.value_in_usdt)}) </span>
            {nFormatter(tx.value_in_token)} {symbol}
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
      const { tx } = row.original
      return (
        <div
          className={cn('flex items-center justify-center text-neutral-300')}
        >
          {renderPrice(tx?.avg_price)}
        </div>
      )
    },
  },
  {
    accessorKey: '30D_TXs',
    header: () => '30D TXs',
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div
          className={cn('flex items-center justify-center text-neutral-300')}
        >
          _
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'link_scan',
  //   header: () => 'Scan',
  //   size: 50,
  //   enableSorting: false,
  //   cell: ({ row }) => {
  //     const { scan_link } = row.original
  //     return (
  //       <a href={scan_link} target="_blank">
  //         <ExternalLink className="w-4 h-4 text-neutral-300" />
  //       </a>
  //     )
  //   },
  // },
]
