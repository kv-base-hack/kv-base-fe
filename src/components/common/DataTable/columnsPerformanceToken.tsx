import { TooltipCustom } from '@/components/common/Tooltip'
import Info from '@/components/shared/icons/Info'
import { DATA_TOKEN } from '@/constant/token'
import { TopTokenProfit } from '@/types/topTokenProfit'
import { nFormatter } from '@/utils/nFormatter'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'

export const columnsPerformanceToken: ColumnDef<TopTokenProfit>[] = [
  {
    accessorKey: 'symbol',
    header: () => 'Symbol',
    enableSorting: false,
    cell: ({ row }) => {
      return row?.original?.address ? (
        <Link
          to="/onchain-discovery/token-explorer/$token/deep"
          params={{
            token: row.original.address,
          }}
          className="flex gap-3 items-center justify-between text-right">
          <img
            loading="lazy"
            src={
              row?.original?.image_url
                ? row?.original?.image_url
                : DATA_TOKEN?.find((item) => item.token === row?.original?.symbol)?.image_url
            }
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{row?.original?.symbol}</div>
        </Link>
      ) : (
        <div className="flex gap-3 cursor-not-allowed items-center justify-between text-right">
          <img
            loading="lazy"
            src={
              row?.original?.image_url
                ? row?.original?.image_url
                : DATA_TOKEN?.find((item) => item.token === row?.original?.symbol)?.image_url
            }
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{row?.original?.symbol}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'gains',
    header: () => (
      <div className="flex items-center gap-2">
        <div>Gains</div>
        <TooltipCustom
          className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
          content="Smart Money's earnings from purchasing this token over 1 day, 7 days, and 30 days.">
          <Info />
        </TooltipCustom>
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const { gains } = row.original
      return <div className="text-primary-2">${nFormatter(gains, 3)}</div>
    },
  },
  // {
  //   accessorKey: 'net_flow',
  //   header: () => (
  //     <div className="flex items-center gap-2">
  //       <div>Net Flow</div>
  //       <TooltipCustom
  //         className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
  //         content="The net flow of the token bought and sold by Smart Money within 1 day, 7 days, and 30 days.">
  //         <Info />
  //       </TooltipCustom>
  //     </div>
  //   ),
  //   enableSorting: false,
  //   cell: ({ row }) => {
  //     const { net_flow } = row.original
  //     return <div>{nFormatter(net_flow, 3)}</div>
  //   },
  // },
  {
    accessorKey: 'avg_cost',
    header: () => (
      <div className="flex items-center gap-2">
        <div>Avg Cost</div>
        <TooltipCustom
          className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
          content="The average purchase price of the token by Smart Money.">
          <Info />
        </TooltipCustom>
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const { avg_cost } = row.original
      return <div>{numeral(avg_cost).format('$0,0.[000000]')}</div>
    },
  },
  {
    accessorKey: 'current_price',
    header: () => 'Current Price',
    enableSorting: false,
    cell: ({ row }) => {
      const { current_price } = row.original
      return <div>{numeral(current_price).format('$0,0.[0000000000]')}</div>
    },
  },
  {
    accessorKey: 'realized_percentage',
    header: () => (
      <div className="flex items-center justify-center gap-2">
        <div className="text-center">Realized Percentage</div>
        <TooltipCustom
          className="w-[320px] z-999 bg-neutral-06 text-neutral-02 shadow-sm border-white/10"
          content="The percentage of tokens sold after purchase.">
          <Info />
        </TooltipCustom>
      </div>
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const { realized_percentage } = row.original
      return (
        <div className="flex w-full justify-center">
          {realized_percentage ? `${realized_percentage}%` : '-'}
        </div>
      )
    },
  },
  {
    accessorKey: 'avg_roi',
    header: () => <div className="flex w-full justify-end">Avg ROI</div>,
    enableSorting: false,
    cell: ({ row }) => {
      const { avg_roi } = row.original
      return <div className="flex w-full justify-end">{avg_roi ? `${avg_roi}%` : '-'}</div>
    },
  },
]
