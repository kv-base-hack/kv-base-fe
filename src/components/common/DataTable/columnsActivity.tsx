import { DATA_TOKEN } from '@/constant/token'
import { cn } from '@/lib/utils'
import { TopActivity } from '@/types/topActivity'
import { nFormatter } from '@/utils/nFormatter'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import numeral from 'numeral'

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

export const columnsActivity: ColumnDef<TopActivity>[] = [
  {
    accessorKey: 'time',
    header: () => 'Time',
    enableSorting: false,
    cell: ({ row }) => {
      const { time } = row.original
      return <div className="text-neutral-04">{moment(time).format('MMM DD, hh:mm')}</div>
    },
  },
  {
    accessorKey: 'smart_money',
    header: () => 'Smart Money',
    enableSorting: false,
    cell: ({ row }) => {
      const { sender } = row.original
      return <div className="underline max-w-32 truncate">{sender}</div>
    },
  },
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
    enableSorting: false,
    cell: ({ row }) => {
      const { symbol } = row.original
      return (
        <Link
          disabled={!row?.original?.token_address}
          to="/onchain-discovery/token-explorer/$token/deep"
          params={{
            token: row.original.token_address,
          }}
          className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src={
              row?.original?.token_image_url
                ? row?.original?.token_image_url
                : DATA_TOKEN?.find((item) => item.token === symbol)?.image_url
            }
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{symbol}</div>
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
            'uppercase justify-center self-stretch px-2 py-0.5 my-auto text-center whitespace-nowrap rounded-md bg-opacity-10',
            movement === 'deposit'
              ? 'bg-secondary-1/10 text-secondary-1'
              : movement === 'withdraw'
                ? 'bg-secondary-4/10 text-secondary-4'
                : movement === 'buying'
                  ? 'bg-primary-2/10 text-primary-2'
                  : movement === 'selling'
                    ? 'bg-primary-3/10 text-primary-3'
                    : 'bg-primary-2/10 text-primary-2'
          )}>
          {movement}
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
        <div>
          {nFormatter(value_in_token, 2)} {symbol} (${nFormatter(value_in_usdt, 2)})
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
          {numeral(price).format('$0,0.[0000]')}
        </div>
      )
    },
  },
]
