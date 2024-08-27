import { cn } from '@/lib/utils'
import { Activity } from '@/types/tokenInspectActivity'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import numeral from 'numeral'
import { ImageToken } from '../Image/ImageToken'
import { TagMovement } from '../Tags/Movement'

export const columnsTokenInspectActivity: ColumnDef<Activity>[] = [
  {
    accessorKey: 'time',
    header: () => 'Time',
    enableSorting: false,
    cell: ({ row }) => {
      const { time } = row.original
      return (
        <div className="text-neutral-04">
          {moment(time).format('MMM DD, hh:mm')}
        </div>
      )
    },
  },
  {
    accessorKey: 'smart_money',
    header: () => 'Smart Traders',
    enableSorting: false,
    cell: ({ row }) => {
      const { sender } = row.original
      return <div className="max-w-32 truncate underline">{sender}</div>
    },
  },
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol } = row.original
      return row?.original?.token_address ? (
        <Link
          href={`/smartmoney-onchain/token-explorer/${row.original.token_address}`}
          className="flex items-center justify-between gap-3 text-right"
        >
          <ImageToken
            symbol={symbol}
            imgUrl={row?.original?.token_image_url}
            className="aspect-square w-6 fill-blue-950"
          />
          <div>{symbol}</div>
        </Link>
      ) : (
        <div className="flex cursor-not-allowed items-center justify-between gap-3 text-right">
          <ImageToken
            symbol={symbol}
            imgUrl={row?.original?.token_image_url}
            className="aspect-square w-6 fill-blue-950"
          />
          <div>{symbol}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'movements',
    header: () => 'Movements',
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
        <div>
          {nFormatter(value_in_token)} {symbol} (${nFormatter(value_in_usdt)})
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
          {numeral(price).format('$0,0.[0000000000]')}
        </div>
      )
    },
  },
]
