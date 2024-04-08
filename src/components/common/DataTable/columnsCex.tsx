import { nFormatter } from '@/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { DATA_TOKEN } from '@/constant/token'
import { TopCexIn } from '@/types/cexIn'

export const columnsCex: ColumnDef<TopCexIn>[] = [
  {
    accessorKey: 'id',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px]">#</div>
    ),
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'symbol',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap whitespace-nowrap">
        Symbol
      </div>
    ),
    cell: ({ row }) => {
      return row?.original?.address ? (
        <Link
          to="/smartmoney-onchain/token-explorer/$token/deep"
          params={{
            token: row?.original?.address,
          }}>
          <div className="flex gap-1.5 w-full items-center justify-start">
            <img
              loading="lazy"
              src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
              className="w-6 aspect-square fill-blue-950"
            />
            <div className="text-normal underline text-neutral-dark-05">
              {row?.original?.symbol}
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
          <img
            loading="lazy"
            src={DATA_TOKEN?.find((el) => el.token === row?.original?.symbol)?.image_url}
            className="w-6 aspect-square fill-blue-950"
          />
          <div className="text-normal underline text-neutral-03">{row?.original?.symbol}</div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'withdraw_value',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        Withdraw Value
      </div>
    ),
    cell: ({ row }) => {
      const { value } = row.original
      return <div className="w-full text-center text-neutral-03">${nFormatter(value, 2)}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: '24h_cex_netflow',
    header: () => (
      <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        24h CEX Netflow
      </div>
    ),
    cell: () => {
      return <div className="text-neutral-03">-</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: 'roi_24h',
    header: () => (
      <div className="text-sm text-right not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
        ROI (%24h)
      </div>
    ),
    cell: () => {
      return <div className="text-neutral-03 text-right">-</div>
    },
    enableSorting: false,
  },
]
