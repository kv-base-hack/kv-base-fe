import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopCexWithdraw } from '@/types/find-gems/withdraw'
import { ImageToken } from '@/components/common/Image/ImageToken'
import numeral from 'numeral'
import Link from 'next/link'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { TableFindGemsProps } from '@/types'
import { renderPrice } from '@/lib/utils/renderPrice'

export const TableFindGemsWithdraw = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  setSort,
  chain,
}: TableFindGemsProps) => {
  const columns: ColumnDef<TopCexWithdraw>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id_holding',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">#</div>
        ),
        cell: ({ row }) => {
          return <div>{row.index + 1 + (page - 1) * perPage}</div>
        },
        size: 50,
      },
      {
        accessorKey: 'symbol_holding',
        enableSorting: false,
        header: () => (
          <div className="w-full text-neutral-04 text-sm not-italic leading-5 whitespace-nowrap">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}?chain=${chain}`}
                    className="flex items-center gap-2"
                  >
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="flex flex-col gap-1.5 w-full items-start justify-start">
                      <div className="truncate font-bold text-primary text-neutral-07">
                        {row?.original?.name}
                      </div>
                      <div className="font-normal text-neutral-04">
                        {row?.original?.symbol}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div>{row?.original?.name}</div>
                    <div className="font-normal text-neutral-04">
                      {row?.original?.symbol}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'net_flow_24h_holding',
        header: () => (
          <div
            className="whitespace-nowrap text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('net_flow')}
            role="button"
          >
            CEX Netflow
          </div>
        ),
        cell: ({ row }) => {
          const { net_flow_24h } = row.original
          return net_flow_24h === 0 ? (
            <div className=" text-neutral-07 text-sm not-italic leading-5">
              -
            </div>
          ) : (
            <div className=" text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(net_flow_24h)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'withdraw_value_holding',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Withdraw Value
          </div>
        ),
        cell: ({ row }) => {
          const { value } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(value)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'withdrawals_holding',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            # of Withdrawals
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_withdraw } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              {nFormatter(number_of_withdraw)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'price_holding',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Price
          </div>
        ),
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              {renderPrice(current_price)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'price_24h_holding',
        header: () => (
          <div
            className="text-neutral-04 whitespace-nowrap text-sm not-italic leading-5"
            onClick={() => setSort('price_change')}
            role="button"
          >
            Price (24h%)
          </div>
        ),
        cell: ({ row }) => {
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h === 0 ? (
            <div>-</div>
          ) : (
            <div
              className={cn(
                price_percent_change_24h > 0
                  ? 'text-success-500'
                  : 'text-error-500',
              )}
            >
              {price_percent_change_24h > 0 ? '+' : ''}
              {price_percent_change_24h.toFixed(2)}%
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'oi_1h_holding',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            OI (1h%)
          </div>
        ),
        cell: ({ row }) => {
          const { oi_1h } = row.original
          return oi_1h === 0 ? (
            <div>-</div>
          ) : (
            <div
              className={cn(oi_1h > 0 ? 'text-success-500' : 'text-error-500')}
            >
              {oi_1h > 0 ? '+' : ''}
              {oi_1h >= 0.01
                ? oi_1h.toFixed(2)
                : numeral(oi_1h).format('0,00.[0000]')}
              %
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'oi_4h_holding',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            OI (4h%)
          </div>
        ),
        cell: ({ row }) => {
          const { oi_4h } = row.original
          return oi_4h === 0 ? (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-neutral-07 text-sm not-italic leading-5',
                oi_4h > 0 ? 'text-success-500' : 'text-error-500',
              )}
            >
              {oi_4h > 0 ? '+' : ''}
              {oi_4h.toFixed(2)}%
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'market_cap_holding',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Marketcap
          </div>
        ),
        cell: ({ row }) => {
          const { market_cap } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(market_cap)}
            </div>
          )
        },
        align: 'end',
      },
    ]
  }, [chain, page, perPage, setSort])
  return (
    <RenderTableFindGemsByTab
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      dataTable={data}
      total={total}
      isFetching={isFetching}
      columns={columns}
    />
  )
}
