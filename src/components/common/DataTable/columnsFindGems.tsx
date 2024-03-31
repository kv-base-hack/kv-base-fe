import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'
// import { ChartTokenDetail } from '@/components/common/Chart'
import { Link } from '@tanstack/react-router'
import { DATA_TOKEN } from '@/constant/token'
import { TrendingToken } from '@/types/trendingToken'

export const columnsFindGems: ColumnDef<TrendingToken>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">#</div>
    ),
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
    size: 50,
  },
  {
    accessorKey: 'symbol',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5 whitespace-nowrap">
        Token Name
      </div>
    ),
    size: 250,
    cell: ({ row }) => {
      return row?.original?.address ? (
        <Link
          to="/smartmoney-onchain/token-explorer/$token/deep"
          className="flex items-center gap-2"
          params={{
            token: row?.original?.address,
          }}>
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div className="flex flex-col gap-1.5 w-full items-start justify-start">
            <div className="truncate">{row?.original?.name}</div>
            <div className="text-normal text-neutral-dark-05">{row?.original?.symbol}</div>
          </div>
        </Link>
      ) : (
        <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div>{row?.original?.name}</div>
          <div className="text-normal text-neutral-dark-05">{row?.original?.symbol}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">Price</div>
    ),
    cell: ({ row }) => {
      const { price } = row.original
      return <div dangerouslySetInnerHTML={{ __html: price }}></div>
    },
  },
  {
    accessorKey: 'price_24h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">
        Price (24h%)
      </div>
    ),
    cell: ({ row }) => {
      const { price_change_percentage_24h } = row.original
      return (
        <div
          className={cn(
            price_change_percentage_24h > 0 ? 'text-semantic-success-1' : 'text-semantic-error-1'
          )}>
          {price_change_percentage_24h > 0 ? '+' : ''}
          {numeral(price_change_percentage_24h).format('0,0.[00000000]')}%
        </div>
      )
    },
  },
  {
    accessorKey: 'price_1h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">OI (1h%)</div>
    ),
    cell: () => {
      return <div>-</div>
    },
  },
  {
    accessorKey: 'price_4h',
    header: () => (
      <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">OI (4h%)</div>
    ),
    cell: () => {
      return <div>-</div>
    },
  },
  {
    accessorKey: 'market_cap',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          Marketcap
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { market_cap } = row.original
      const format = market_cap?.split('$')?.[1]?.split(',')?.join('')
      return (
        <div className="w-full text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          ${nFormatter(parseFloat(format), 2)}
        </div>
      )
    },
  },
  {
    accessorKey: 'withdrawals',
    enableSorting: false,
    header: () => (
      <div className="whitespace-nowrap">
        <div className="text-right text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          # of withdrawals
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { market_cap } = row.original
      const format = market_cap?.split('$')?.[1]?.split(',')?.join('')
      return (
        <div className="w-full text-center text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          ${nFormatter(parseFloat(format), 2)}
        </div>
      )
    },
  },
  {
    accessorKey: '24h_cex_netflow',
    enableSorting: false,
    header: () => (
      <div className="flex items-center justify-center w-full gap-1 whitespace-nowrap">
        <div className="text-neutral-dark-05 text-sm not-italic font-bold leading-5">
          24h CEX Netflow
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const { total_volume } = row.original
      const format = total_volume?.split('$')?.[1]?.split(',')?.join('')
      return <div className="w-full text-center">${nFormatter(format, 2)}</div>
    },
  },
  // {
  //   accessorKey: 'price_chart',
  //   header: () => (
  //     <div className="text-center w-full text-neutral-dark-05 text-sm not-italic font-bold leading-5">
  //       Chart
  //     </div>
  //   ),
  //   enableSorting: false,
  //   cell: () => {
  //     return (
  //       <div className="flex items-center w-full justify-center relative rounded-2xl">
  //         <ChartTokenDetail
  //           dataChart={[
  //             [1707580800000, 0.999893, 1.001, 0.999685, 0.999685],
  //             [1707566400000, 0.998762, 0.999885, 0.99841, 0.999083],
  //             [1707552000000, 0.999482, 1.001, 0.999482, 1.001],
  //             [1707537600000, 0.999745, 1, 0.999745, 1],
  //             [1707523200000, 0.999406, 1, 0.999406, 1],
  //             [1707508800000, 1, 1.001, 0.997821, 0.997821],
  //             [1707494400000, 0.999803, 0.999842, 0.998952, 0.998952],
  //             [1707480000000, 0.999499, 1.003, 0.999499, 1.001],
  //             [1707465600000, 1, 1, 0.999996, 1],
  //             [1707451200000, 0.999893, 1.003, 0.999893, 1.003],
  //             [1707436800000, 0.999348, 1, 0.998982, 1],
  //             [1707422400000, 1, 1.001, 0.998037, 1.001],
  //           ]}
  //           changePrice={1}
  //         />
  //       </div>
  //     )
  //   },
  // },
]
