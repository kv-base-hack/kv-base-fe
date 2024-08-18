import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopCexDeposit } from '@/types/find-gems/deposit'
import { ImageToken } from '@/components/common/Image/ImageToken'
import numeral from 'numeral'
import Link from 'next/link'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { TableFindGemsProps } from '@/types'
import { renderPrice } from '@/lib/utils/renderPrice'
import { TooltipTokenInfo } from '../Tooltip/TooltipTokenInfo'

export const TableFindGemsDeposit = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  chain,
}: TableFindGemsProps) => {
  const columns: ColumnDef<TopCexDeposit>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id_deposit',
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">#</div>
        ),
        cell: ({ row }) => {
          return <div>{row.index + 1 + (page - 1) * perPage}</div>
        },
        size: 50,
      },
      {
        accessorKey: 'symbol_deposit',
        header: () => (
          <div className="whitespace-nowrap text-sm not-italic leading-5 text-neutral-04">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <TooltipTokenInfo
                    token={row.original}
                    chain={chain}
                    nameToken={true}
                  />
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="max-w-[120px] truncate">
                      {row?.original?.name}
                    </div>
                    <div className="font-normal text-neutral-07">
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
        accessorKey: 'net_flow_24h',
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
            CEX Netflow
          </div>
        ),
        cell: ({ row }) => {
          const { net_flow_24h } = row.original
          return net_flow_24h === 0 ? (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              -
            </div>
          ) : (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              ${nFormatter(net_flow_24h)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'deposit_value',
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
            Deposit Value
          </div>
        ),
        cell: ({ row }) => {
          const { value } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              ${nFormatter(value)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'deposits',
        header: () => (
          <div className="whitespace-nowrap text-sm not-italic leading-5 text-neutral-04">
            # of Deposit
          </div>
        ),
        size: 50,
        cell: ({ row }) => {
          const { number_of_deposit } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              {nFormatter(number_of_deposit)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'price',
        enableSorting: false,
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
            Price
          </div>
        ),
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              {renderPrice(current_price)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'price_24h',
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
            Price (24h%)
          </div>
        ),
        cell: ({ row }) => {
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h === 0 ? (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-sm not-italic leading-5 text-neutral-07',
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
        accessorKey: 'oi_1h',
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
            OI (1h%)
          </div>
        ),
        cell: ({ row }) => {
          const { oi_1h } = row.original
          return oi_1h === 0 ? (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-sm not-italic leading-5 text-neutral-07',
                oi_1h > 0 ? 'text-success-500' : 'text-error-500',
              )}
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
        accessorKey: 'oi_4h',
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
            OI (4h%)
          </div>
        ),
        cell: ({ row }) => {
          const { oi_4h } = row.original
          return oi_4h === 0 ? (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-sm not-italic leading-5 text-neutral-07',
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
        accessorKey: 'market_cap',
        enableSorting: false,
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
            Marketcap
          </div>
        ),
        cell: ({ row }) => {
          const { market_cap } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              ${nFormatter(market_cap)}
            </div>
          )
        },
        align: 'end',
      },
    ]
  }, [chain, page, perPage])
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
