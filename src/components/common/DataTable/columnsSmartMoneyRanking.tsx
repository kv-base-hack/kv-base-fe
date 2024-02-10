import { nFormatter } from '@/utils/nFormatter'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export type SmartMoneyRanking = {
  id: string
  smart_money: string
  badge: string[]
  roi: number
  net_profit: number
  total_balance: number
  most_profitable_trade: string
  current_largest_position: string
  most_bought_token_24h: string
  most_sell_token_24h: string
  largest_trade: string
}

export const columnsSmartMoneyRanking: ColumnDef<SmartMoneyRanking>[] = [
  {
    accessorKey: 'id',
    header: () => '#',
    cell: ({ row }) => {
      const { id } = row.original
      return <div>{id}</div>
    },
  },
  {
    accessorKey: 'smart_money',
    header: () => 'Smart Money',
    cell: ({ row }) => {
      const { smart_money } = row.original
      return (
        <Link
          className="underline"
          to="/onchain-discovery/wallet-explorer/$groupId/deep"
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
    cell: ({ row }) => {
      const { badge } = row.original
      console.log({ badge })
      return (
        <div className="flex gap-1 self-stretch pr-5">
          <img loading="lazy" srcSet="..." className="w-6 aspect-[0.93]" />
          <img loading="lazy" srcSet="..." className="w-6 aspect-[0.93]" />
          <img loading="lazy" srcSet="..." className="w-6 aspect-[0.93]" />
        </div>
      )
    },
  },
  {
    accessorKey: 'roi',
    header: () => 'ROI',
    cell: ({ row }) => {
      const { roi } = row.original
      return <div className="text-primary-2">{roi}%</div>
    },
  },
  {
    accessorKey: 'net_profit',
    header: () => 'Net Profit',
    cell: ({ row }) => {
      const { net_profit } = row.original
      return <div className="text-primary-2">${nFormatter(net_profit, 2)}</div>
    },
  },
  {
    accessorKey: 'total_balance',
    header: () => 'Total Balance',
    cell: ({ row }) => {
      const { total_balance } = row.original
      return <div>${nFormatter(total_balance, 2)}</div>
    },
  },
  {
    accessorKey: 'most_profitable_trade',
    header: () => 'Most Profitable Trade',
    cell: ({ row }) => {
      const { most_profitable_trade } = row.original
      return (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_profitable_trade}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'current_largest_position',
    header: () => 'Current Largest Position',
    cell: ({ row }) => {
      const { current_largest_position } = row.original
      return (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{current_largest_position}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'most_bought_token_24h',
    header: () => 'Most Bought Token (24h)',
    cell: ({ row }) => {
      const { most_bought_token_24h } = row.original
      return (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_bought_token_24h}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'most_sell_token_24h',
    header: () => 'Most Sell Token (24h)',
    cell: ({ row }) => {
      const { most_sell_token_24h } = row.original
      return (
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src="/assets/icons/token/usdt.svg"
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_sell_token_24h}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'largest_trade',
    header: () => <div className="flex w-full justify-end text-right">Largest Trade</div>,
    cell: ({ row }) => {
      const { largest_trade } = row.original
      return (
        <div className="flex text-right w-full justify-end text-neutral-04">{largest_trade}</div>
      )
    },
  },
]
