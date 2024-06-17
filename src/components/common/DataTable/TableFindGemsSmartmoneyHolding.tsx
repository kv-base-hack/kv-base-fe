import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { SmartMoneyHolding } from '@/types/find-gems/smartMoneyHolding'
import Link from 'next/link'
import numeral from 'numeral'
import { TableFindGemsProps } from '@/types'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'
import { TooltipTable } from '../Tooltip/TooltipTable'

export const TableFindGemsSmartMoneyHolding = ({
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
  const columns: ColumnDef<SmartMoneyHolding>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
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
        accessorKey: 'symbol',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5 whitespace-nowrap">
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
                      <div className="truncate font-bold text-primary">
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
                    <div>{row?.original?.network}</div>
                    <div className="text-normal text-neutral-07">
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
        accessorKey: 'number_of_smart_money_hold',
        enableSorting: false,
        header: () => (
          <div className="flex items-center gap-0.5">
            <div className="text-neutral-04 text-sm not-italic leading-5">
              # of SM
            </div>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_smart_money_hold, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_smart_money_hold}
              address={address}
              type="find-gems-sm-holding"
              duration="24h"
            />
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'total_spent',
        header: () => (
          <div
            className="text-neutral-04"
            onClick={() => setSort('total_spent')}
            role="button"
          >
            Total Spent
          </div>
        ),
        cell: ({ row }) => {
          const { total_spent_3d } = row.original
          return <div>{nFormatter(total_spent_3d)}</div>
        },
        align: 'center',
      },
      {
        accessorKey: 'avg_price',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Avg Price
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { avg_price } = row.original
          return (
            <div className="text-neutral-07 whitespace-nowrap text-sm not-italic leading-5">
              {renderPrice(avg_price)}
            </div>
          )
        },
      },
      {
        accessorKey: 'price',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Price
          </div>
        ),
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-neutral-07 whitespace-nowrap text-sm not-italic leading-5">
              {renderPrice(current_price)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'price_24h',
        header: () => (
          <div
            className="text-neutral-07 text-sm not-italic leading-5"
            onClick={() => setSort('price_change')}
            role="button"
          >
            % 24h
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h === 0 ? (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-neutral-07 text-sm not-italic  leading-5',
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
      },
      {
        accessorKey: 'pnl',
        header: () => (
          <div
            className="text-neutral-04"
            onClick={() => setSort('pnl')}
            role="button"
          >
            PnL
          </div>
        ),

        align: 'center',
        cell: ({ row }) => {
          const { pnl } = row.original
          return !pnl || pnl === 0 ? (
            '-'
          ) : (
            <div className={pnl < 0 ? 'text-error-500' : 'text-success-500'}>
              {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                ? numeral(pnl).format('0,0.[000000]')
                : nFormatter(pnl)}
              $
            </div>
          )
        },
      },
      {
        accessorKey: 'roi',
        header: () => (
          <div
            className="text-neutral-04"
            onClick={() => setSort('roi')}
            role="button"
          >
            ROI
          </div>
        ),
        cell: ({ row }) => {
          const { roi } = row.original
          return !roi || roi === 0 ? (
            '-'
          ) : (
            <div className={roi < 0 ? 'text-error-500' : 'text-success-500'}>
              {(roi < 0.001 && roi > 0) || (roi > -0.001 && roi < 0)
                ? numeral(roi).format('0,0.[000000]')
                : roi.toFixed(2)}
              %
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'realized_percent',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('realized_percent')}
            role="button"
          >
            Realized %
          </div>
        ),
        cell: ({ row }) => {
          const { realized_percent } = row.original
          return realized_percent === 0 ? (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              -
            </div>
          ) : (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              {realized_percent.toFixed(2)}%
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
