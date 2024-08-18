'use client'

import { chainAtom } from '@/atom/chain'
import { SMMoneyOverview } from '@/components/Dashboard/SMOverView'
import { DataTable } from '@/components/common/DataTable'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { TokenList } from '@/types/tokenList'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { Leaderboard } from '@/types/leaderboard'
import Link from 'next/link'
import { nFormatter } from '@/utils/nFormatter'
import { ImageToken } from '@/components/common/Image/ImageToken'
import moment from 'moment'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { TooltipTokenInfo } from '@/components/common/Tooltip/TooltipTokenInfo'

export default function LeaderboardPage() {
  const CHAIN = useAtomValue(chainAtom)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [sortBy, setSortBy] = useState('')
  const [listToken, setListToken] = useState<TokenList[]>([])

  const dataLeaderboardQuery = useQuery(
    useLeaderboardQuery({
      chain: CHAIN,
      limit: 10,
      start: page,
      sortBy,
      token_addresses:
        listToken?.map((item) => item.tokenAddress)?.toString() || '',
    }),
  )

  const dataLeaderboard = dataLeaderboardQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : dataLeaderboardQuery.data?.leaderboard?.slice(0, 10) || []
  const totalLeaderboard = dataLeaderboardQuery.data?.total || 1

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
  }

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
        <div className="flex items-center gap-2">
          <div>Smart Money</div>
          <SortMultipleIcon className="h-4 w-4" />
        </div>
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { user_address } = row.original
        return (
          <Link
            className="w-32 truncate"
            href={`/smartmoney-onchain/wallet-explorer/${
              user_address || '1'
            }?chain=${CHAIN}`}
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
          <div className="text-semantic-success-1">
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
          <div className="text-semantic-success-1">
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
            <TooltipTokenInfo token={most_profit_token} chain={CHAIN} />
          ) : (
            <div className="flex items-center justify-between gap-3 text-right">
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

        return current_largest_position?.symbol ? (
          current_largest_position?.tokenAddress ? (
            <TooltipTokenInfo token={current_largest_position} chain={CHAIN} />
          ) : (
            <div className="flex items-center justify-between gap-3 text-right">
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
        return most_token_buy?.symbol ? (
          most_token_buy?.tokenAddress ? (
            <TooltipTokenInfo token={most_token_buy} chain={CHAIN} />
          ) : (
            <div className="flex items-center justify-between gap-3 text-right">
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
        return most_token_sell?.symbol ? (
          most_token_sell?.tokenAddress ? (
            <TooltipTokenInfo token={most_token_sell} chain={CHAIN} />
          ) : (
            <div className="flex items-center justify-between gap-3 text-right">
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
          <div className="flex justify-end text-right text-neutral-04">
            {moment(last_trade).fromNow()}
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#EFEFEF] bg-neutral-01 pb-6">
      <SMMoneyOverview className="!border-none" />
      <div className="px-6">
        <DataTable
          className="text-xs font-bold leading-4 tracking-normal"
          columns={columns}
          data={dataLeaderboard}
          isFetching={dataLeaderboardQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
      </div>
      <PaginationTable
        className="mt-2"
        currentPage={page}
        pageSize={perPage}
        total={totalLeaderboard}
        setPage={setPage}
      />
    </div>
  )
}
