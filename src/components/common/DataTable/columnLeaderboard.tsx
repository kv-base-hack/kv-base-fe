import { DATA_TOKEN } from '@/constant/token'
import { Leaderboard } from '@/types/leaderboard'
import { nFormatter } from '@/utils/nFormatter'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

export const columnsLeaderboard: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: 'id',
    header: () => '#',
    enableSorting: false,
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
    size: 50,
  },
  {
    accessorKey: 'smart_money',
    header: () => 'Smart Money',
    enableSorting: false,
    cell: ({ row }) => {
      const { user_address } = row.original
      return (
        <Link
          className="w-32 truncate"
          to="/onchain-discovery/wallet-explorer/$groupId/deep"
          params={{
            groupId: '1',
          }}>
          {user_address}
        </Link>
      )
    },
  },
  // {
  //   accessorKey: 'badge',
  //   header: () => 'Badge',
  //   enableSorting: false,
  //   cell: () => {
  //     return (
  //       <div className="flex gap-1 self-stretch pr-5">
  //         <img
  //           loading="lazy"
  //           srcSet="/assets/images/ranking/gold.png"
  //           className="w-6 aspect-[0.93]"
  //         />
  //         <img
  //           loading="lazy"
  //           srcSet="/assets/images/ranking/platium.png"
  //           className="w-6 aspect-[0.93]"
  //         />
  //         <img
  //           loading="lazy"
  //           srcSet="/assets/images/ranking/fire.png"
  //           className="w-6 aspect-[0.93]"
  //         />
  //       </div>
  //     )
  //   },
  // },
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
    cell: () => {
      return '-'
      // const { most_profitable_trade } = row.original
      // return most_profitable_trade ? (
      //   <div className="flex gap-3 items-center justify-between text-right">
      //     <img
      //       loading="lazy"
      //       src="/assets/icons/token/usdt.svg"
      //       className="w-6 aspect-square fill-blue-950"
      //     />
      //     <div>{most_profitable_trade}</div>
      //   </div>
      // ) : null
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
            src={DATA_TOKEN?.find((el) => el.token === current_largest_position.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{current_largest_position.symbol}</div>
        </div>
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
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === most_token_buy.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_token_buy.symbol}</div>
        </div>
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
        <div className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === most_token_sell.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{most_token_sell.symbol}</div>
        </div>
      ) : null
    },
  },
  {
    accessorKey: 'latest_trade',
    enableSorting: false,
    header: () => <div className="flex w-full justify-end text-right">Latest Trade</div>,
    cell: ({ row }) => {
      const { last_trade } = row.original
      return (
        <div className="flex text-right w-full justify-end text-neutral-04">
          {moment(last_trade).fromNow()}
        </div>
      )
    },
  },
]
