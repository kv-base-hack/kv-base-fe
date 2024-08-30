import { ImageToken } from '@/components/common/Image/ImageToken'
import { Leaderboard } from '@/types/leaderboard'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import numeral from 'numeral'
import Image from 'next/image'
import { ImageRanking } from '../Image/image-ranking'
import { TooltipWallet } from '../Tooltip/tooltip-wallet'
import { useMemo } from 'react'

export const ColumnsLeaderboard = (
  page: number,
  perPage: number,
  setSortBy: (key: string) => void,
) => {
  const columns: ColumnDef<Leaderboard>[] = useMemo(() => {
    return [
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
          <div className="flex items-center gap-2">
            <div>Smart Traders</div>
          </div>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { user_address, ranking } = row.original
          return (
            <TooltipWallet data={row.original}>
              <div className="flex items-center gap-1">
                <ImageRanking ranking={ranking} size={16} />
                <Link
                  className="max-w-32 truncate text-neutral-300 underline"
                  href={`/smartmoney-onchain/wallet-explorer/${user_address}`}
                >
                  {user_address}
                </Link>
              </div>
            </TooltipWallet>
          )
        },
      },
      {
        accessorKey: 'badges',
        header: () => {
          return <div>Badges</div>
        },
        enableSorting: false,
        cell: ({ row }) => {
          const { badges } = row.original
          return (
            <div className="flex gap-1">
              {badges?.map((badge, index) => {
                return (
                  <Image
                    key={index}
                    src={`/images/badges/${badge}.png`}
                    alt={badge}
                    width={16}
                    height={16}
                  />
                )
              })}
            </div>
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
            <div className="text-green">{roi ? `${roi.toFixed(2)}%` : '-'}</div>
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
            Total Profit
          </div>
        ),
        cell: ({ row }) => {
          const { net_profit } = row.original
          return (
            <div className="text-green">
              {net_profit ? `$${nFormatter(net_profit)}` : '-'}
            </div>
          )
        },
      },
      {
        accessorKey: 'win_rate',
        header: () => (
          <div
            onClick={() => setSortBy('win_rate')}
            className="whitespace-nowrap"
            role="button"
          >
            Winrate
          </div>
        ),
        cell: ({ row }) => {
          const { win_rate_percent } = row.original
          return (
            <div>{numeral(win_rate_percent).format('0,0.[00]') || '-'}%</div>
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
            Balance
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
        header: () => {
          return (
            <div className="flex items-center gap-0.5">Most Profitable</div>
          )
        },
        enableSorting: false,
        cell: ({ row }) => {
          const { most_profit_token } = row.original
          return most_profit_token?.symbol ? (
            most_profit_token?.token_address ? (
              <Link
                href={`/smartmoney-onchain/token-explorer/${most_profit_token?.token_address}`}
                className="flex items-center justify-between gap-3 text-right"
              >
                <ImageToken
                  imgUrl={most_profit_token?.image_url}
                  symbol={most_profit_token?.symbol}
                />
                <div>{most_profit_token.symbol}</div>
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-3 text-right">
                <ImageToken
                  imgUrl={most_profit_token?.image_url}
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
        header: () => <div className="w-full text-center">Largest Hold</div>,
        enableSorting: false,
        cell: ({ row }) => {
          const { current_largest_position } = row.original
          return current_largest_position ? (
            current_largest_position?.token_address ? (
              <Link
                href={`/smartmoney-onchain/token-explorer/${current_largest_position?.token_address}`}
                className="flex items-center justify-between gap-3 text-right"
              >
                <ImageToken
                  imgUrl={current_largest_position?.image_url}
                  symbol={current_largest_position?.symbol}
                />
                <div>{current_largest_position.symbol}</div>
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-3 text-right">
                <ImageToken
                  imgUrl={current_largest_position?.image_url}
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
        header: () => 'Top Buy 24h',
        enableSorting: false,
        cell: ({ row }) => {
          const { most_token_buy } = row.original
          return [...Array(1).keys()].map((_, index) => {
            return most_token_buy?.token_address ? (
              <Link
                href={`/smartmoney-onchain/token-explorer/${most_token_buy?.token_address}`}
                className="flex items-center justify-between gap-3 text-right"
              >
                <ImageToken
                  imgUrl={most_token_buy?.image_url}
                  symbol={most_token_buy?.symbol}
                />
                <div>{most_token_buy.symbol}</div>
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-3 text-right">
                <ImageToken
                  imgUrl={most_token_buy?.image_url}
                  symbol={most_token_buy?.symbol}
                />
                <div>{most_token_buy.symbol}</div>
              </div>
            )
          })
        },
      },
      {
        accessorKey: 'most_gain_token_24h',
        header: () => 'Most Gain 24h',
        enableSorting: false,
        cell: ({ row }) => {
          const { most_profit_token_24h } = row.original
          return most_profit_token_24h ? (
            most_profit_token_24h?.token_address ? (
              <Link
                href={`/smartmoney-onchain/token-explorer/${most_profit_token_24h?.token_address}`}
                className="flex items-center justify-between gap-3 text-right"
              >
                <ImageToken
                  imgUrl={most_profit_token_24h?.image_url}
                  symbol={most_profit_token_24h?.symbol}
                />
                <div>{most_profit_token_24h.symbol}</div>
              </Link>
            ) : (
              <div className="flex items-center justify-between gap-3 text-right">
                <ImageToken
                  imgUrl={most_profit_token_24h?.image_url}
                  symbol={most_profit_token_24h?.symbol}
                />
                <div>{most_profit_token_24h.symbol}</div>
              </div>
            )
          ) : null
        },
      },
      {
        accessorKey: 'token_hold',
        header: () => 'Tokens Hold',
        enableSorting: false,
        cell: ({ row }) => {
          const { token_holds } = row.original
          return token_holds?.map((token, index) => {
            return token?.token_address ? (
              <Link
                key={index}
                href={`/smartmoney-onchain/token-explorer/${token?.token_address}`}
                className="flex items-center justify-between gap-3 text-right"
              >
                <ImageToken imgUrl={token?.image_url} symbol={token?.symbol} />
              </Link>
            ) : (
              <div
                key={index}
                className="flex items-center justify-between gap-3 text-right"
              >
                <ImageToken imgUrl={token?.image_url} symbol={token?.symbol} />
              </div>
            )
          })
        },
      },
      {
        accessorKey: 'number_of_trades',
        header: () => <div className=""># of Trades</div>,
        enableSorting: false,
        cell: ({ row }) => {
          const { total_trade } = row.original
          return <div>{total_trade}</div>
        },
        align: 'center',
      },
    ]
  }, [page, perPage, setSortBy])
  return columns
}
