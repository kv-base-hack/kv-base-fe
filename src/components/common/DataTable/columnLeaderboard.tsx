import { ImageToken } from '@/components/common/Image/ImageToken'
import { SortIcon } from '@/components/shared/icons/SortIcon'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { Leaderboard } from '@/types/leaderboard'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'

export const columnsLeaderboard = (
  page: number,
  perPage: number,
  setSortBy: (key: string) => void,
) => {
  const columns: ColumnDef<Leaderboard>[] = [
    {
      accessorKey: 'id',
      header: () => '#',
      enableSorting: false,
      cell: ({ row }) => {
        return <div>{row.index + 1 + (page - 1) * perPage}</div>
      },
      size: 50,
    },
    {
      accessorKey: 'smart_money',
      header: () => (
        <div className="flex gap-2 items-center">
          <div>Smart Money</div>
          <SortMultipleIcon className="w-4 h-4" />
        </div>
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { user_address } = row.original
        return (
          <Link
            className="w-32 truncate"
            href={`/smartmoney-onchain/wallet-explorer/${user_address || '1'}`}
          >
            {user_address}
          </Link>
        )
      },
    },
    {
      accessorKey: 'roi',
      header: () => (
        <div
          onClick={() => setSortBy('roi')}
          className="whitespace-nowrap"
          role="button"
        >
          ROI
        </div>
      ),
      cell: ({ row }) => {
        const { roi } = row.original
        return (
          <div className="text-success-500">
            {roi ? `${roi.toFixed(2)}%` : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'net_profit',
      header: () => (
        <div
          onClick={() => setSortBy('net_profit')}
          className="whitespace-nowrap"
          role="button"
        >
          Net Profit
        </div>
      ),
      cell: ({ row }) => {
        const { net_profit } = row.original
        return (
          <div className="text-success-500">
            {net_profit ? `$${nFormatter(net_profit)}` : '-'}
          </div>
        )
      },
    },
    {
      accessorKey: 'total_balance',
      header: () => (
        <div
          onClick={() => setSortBy('total_balance')}
          className="whitespace-nowrap"
          role="button"
        >
          Total Balance
        </div>
      ),
      cell: ({ row }) => {
        const { total_balance } = row.original
        return (
          <div>{total_balance ? `$${nFormatter(total_balance)}` : '-'}</div>
        )
      },
    },
    {
      accessorKey: 'most_profitable_trade',
      header: () => 'Most Profitable Trade',
      enableSorting: false,
      cell: ({ row }) => {
        const { most_profit_token } = row.original
        return most_profit_token?.symbol ? (
          most_profit_token?.tokenAddress ? (
            <Link
              href={`/smartmoney-onchain/token-explorer/${most_profit_token?.tokenAddress}`}
              className="flex gap-3 items-center justify-between text-right"
            >
              <ImageToken
                imgUrl={most_profit_token?.imageUrl}
                symbol={most_profit_token?.symbol}
              />
              <div>{most_profit_token.symbol}</div>
            </Link>
          ) : (
            <div className="flex gap-3 items-center justify-between text-right">
              <ImageToken
                imgUrl={most_profit_token?.imageUrl}
                symbol={most_profit_token?.symbol}
              />
              <div>{most_profit_token.symbol}</div>
            </div>
          )
        ) : null
      },
    },
    {
      accessorKey: 'current_largest_position',
      header: () => (
        <div className="w-full text-center">Current Largest Position</div>
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { current_largest_position } = row.original
        return current_largest_position ? (
          current_largest_position?.tokenAddress ? (
            <Link
              href={`/smartmoney-onchain/token-explorer/${current_largest_position?.tokenAddress}`}
              className="flex gap-3 items-center justify-between text-right"
            >
              <ImageToken
                imgUrl={current_largest_position?.imageUrl}
                symbol={current_largest_position?.symbol}
              />
              <div>{current_largest_position.symbol}</div>
            </Link>
          ) : (
            <div className="flex gap-3 items-center justify-between text-right">
              <ImageToken
                imgUrl={current_largest_position?.imageUrl}
                symbol={current_largest_position?.symbol}
              />
              <div>{current_largest_position.symbol}</div>
            </div>
          )
        ) : null
      },
    },
    {
      accessorKey: 'most_bought_token_24h',
      header: () => 'Most Bought Token (24h)',
      enableSorting: false,
      cell: ({ row }) => {
        const { most_token_buy } = row.original
        return most_token_buy ? (
          most_token_buy?.tokenAddress ? (
            <Link
              href={`/smartmoney-onchain/token-explorer/${most_token_buy?.tokenAddress}`}
              className="flex gap-3 items-center justify-between text-right"
            >
              <ImageToken
                imgUrl={most_token_buy?.imageUrl}
                symbol={most_token_buy?.symbol}
              />
              <div>{most_token_buy.symbol}</div>
            </Link>
          ) : (
            <div className="flex gap-3 items-center justify-between text-right">
              <ImageToken
                imgUrl={most_token_buy?.imageUrl}
                symbol={most_token_buy?.symbol}
              />
              <div>{most_token_buy.symbol}</div>
            </div>
          )
        ) : null
      },
    },
    {
      accessorKey: 'most_sell_token_24h',
      header: () => 'Most Sell Token (24h)',
      enableSorting: false,
      cell: ({ row }) => {
        const { most_token_sell } = row.original
        return most_token_sell ? (
          most_token_sell?.tokenAddress ? (
            <Link
              href={`/smartmoney-onchain/token-explorer/${most_token_sell?.tokenAddress}`}
              className="flex gap-3 items-center justify-between text-right"
            >
              <ImageToken
                imgUrl={most_token_sell?.imageUrl}
                symbol={most_token_sell?.symbol}
              />
              <div>{most_token_sell.symbol}</div>
            </Link>
          ) : (
            <div className="flex gap-3 items-center justify-between text-right">
              <ImageToken
                imgUrl={most_token_sell?.imageUrl}
                symbol={most_token_sell?.symbol}
              />
              <div>{most_token_sell.symbol}</div>
            </div>
          )
        ) : null
      },
    },
    {
      accessorKey: 'latest_trade',
      header: () => (
        <div
          onClick={() => setSortBy('last_trade')}
          className="whitespace-nowrap"
          role="button"
        >
          Last Trade
        </div>
      ),
      cell: ({ row }) => {
        const { last_trade } = row.original
        return (
          <div className="flex text-right justify-end text-neutral-04">
            {moment(last_trade).fromNow()}
          </div>
        )
      },
    },
  ]
  return columns
}
