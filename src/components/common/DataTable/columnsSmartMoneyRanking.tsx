import { TopUserProfit } from '@/types/topUserProfit'
import { nFormatter } from '@/utils/nFormatter'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export const columnsSmartMoneyRanking: ColumnDef<TopUserProfit>[] = [
  {
    accessorKey: 'id',
    header: () => '#',
    enableSorting: false,
    cell: ({ row }) => {
      const { id } = row.original
      return <div>{id}</div>
    },
    size: 50,
  },
  {
    accessorKey: 'smart_money',
    header: () => 'Smart Money',
    enableSorting: false,
    cell: ({ row }) => {
      const { smart_money } = row.original
      return (
        <Link
          className="underline"
          to="/smartmoney-onchain/wallet-explorer/$groupId/deep"
          params={{
            groupId: '1',
          }}>
          {smart_money}
        </Link>
      )
    },
  },
  {
    accessorKey: 'badge',
    header: () => 'Badge',
    enableSorting: false,
    cell: ({ row }) => {
      const { badge } = row.original
      console.log({ badge })
      return (
        <div className="flex gap-1 self-stretch pr-5">
          <img
            loading="lazy"
            srcSet="/assets/images/ranking/gold.png"
            className="w-6 aspect-[0.93]"
          />
          <img
            loading="lazy"
            srcSet="/assets/images/ranking/platium.png"
            className="w-6 aspect-[0.93]"
          />
          <img
            loading="lazy"
            srcSet="/assets/images/ranking/fire.png"
            className="w-6 aspect-[0.93]"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'roi',
    header: () => 'ROI',
    enableSorting: false,
    cell: ({ row }) => {
      const { roi } = row.original
      return <div className="text-primary-2">{roi ? `${roi}%` : '-'}</div>
    },
  },
  {
    accessorKey: 'net_profit',
    header: () => 'Net Profit',
    enableSorting: false,
    cell: ({ row }) => {
      const { net_profit } = row.original
      return (
        <div className="text-primary-2">{net_profit ? `$${nFormatter(net_profit, 2)}` : '-'}</div>
      )
    },
  },
  {
    accessorKey: 'total_balance',
    header: () => 'Total Balance',
    enableSorting: false,
    cell: ({ row }) => {
      const { total_balance } = row.original
      return <div>{total_balance ? `$${nFormatter(total_balance, 2)}` : '-'}</div>
    },
  },
  {
    accessorKey: 'most_profitable_trade',
    header: () => 'Most Profitable Trade',
    enableSorting: false,
    cell: ({ row }) => {
      const { most_profitable_trade } = row.original
      return most_profitable_trade ? (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_profitable_trade}</div>
        </div>
      ) : null
    },
  },
  {
    accessorKey: 'current_largest_position',
    header: () => 'Current Largest Position',
    enableSorting: false,
    cell: ({ row }) => {
      const { current_largest_position } = row.original
      return current_largest_position ? (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{current_largest_position}</div>
        </div>
      ) : null
    },
  },
  {
    accessorKey: 'most_bought_token_24h',
    header: () => 'Most Bought Token (24h)',
    enableSorting: false,
    cell: ({ row }) => {
      const { most_bought_token_24h } = row.original
      return most_bought_token_24h ? (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_bought_token_24h}</div>
        </div>
      ) : null
    },
  },
  {
    accessorKey: 'most_sell_token_24h',
    header: () => 'Most Sell Token (24h)',
    enableSorting: false,
    cell: ({ row }) => {
      const { most_sell_token_24h } = row.original
      return most_sell_token_24h ? (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_sell_token_24h}</div>
        </div>
      ) : null
    },
  },
  {
    accessorKey: 'largest_trade',
    enableSorting: false,
    header: () => <div className="flex w-full justify-end text-right">Largest Trade</div>,
    cell: ({ row }) => {
      const { largest_trade } = row.original
      return (
        <div className="flex text-right w-full justify-end text-neutral-04">{largest_trade}</div>
      )
    },
  },
]
