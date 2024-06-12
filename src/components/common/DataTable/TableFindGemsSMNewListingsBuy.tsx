import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { TableFindGemsProps } from '@/types'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { renderPrice } from '@/lib/utils/renderPrice'
import { NewListingBuy } from '@/types/newListingBuy'
import numeral from 'numeral'
import { TooltipTable } from '../Tooltip/TooltipTable'

export const TableFindGemsSMNewListingsBuy = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  setSort,
}: TableFindGemsProps) => {
  const columns: ColumnDef<NewListingBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        enableSorting: false,
        header: () => (
          <div className="text-sm not-italic text-neutral-dartk-05 font-normal leading-6 tracking-[-0.14px]">
            #
          </div>
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
          <div className="text-sm text-neutral-04 not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex gap-1.5 w-full items-center justify-start">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div className="text-normal underline text-neutral-07">
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
                    <div className="text-normal underline text-neutral-07">
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
        accessorKey: 'token_age',
        header: () => (
          <div
            className="text-center text-neutral-04 w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSort('token_age')}
            role="button"
          >
            Token Age
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { token_age } = row.original
          return (
            <div className="w-full text-center text-neutral-07">
              {token_age}
            </div>
          )
        },
      },
      {
        accessorKey: 'total_spent',
        header: () => (
          <div
            className="w-full text-neutral-04 text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSort('total_spent')}
            role="button"
          >
            Total Spent
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { total_spent } = row.original
          return (
            <div className="w-full items-center justify-center text-center text-neutral-07">
              ${nFormatter(total_spent)}
            </div>
          )
        },
      },
      {
        accessorKey: 'roi',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
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
      },
      {
        accessorKey: 'pnl',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('pnl')}
            role="button"
          >
            PnL
          </div>
        ),
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
        accessorKey: 'avg_price',
        header: () => (
          <div className="text-center text-neutral-04 w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            Avg Price
          </div>
        ),
        cell: ({ row }) => {
          const { avg_price } = row.original
          return <div className="text-neutral-07">{renderPrice(avg_price)}</div>
        },
        enableSorting: false,
      },
      {
        accessorKey: 'current_price',
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Current Price
          </div>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className={cn('flex items-center justify-center')}>
              {renderPrice(current_price)}
            </div>
          )
        },
      },
      {
        accessorKey: 'price',
        header: () => (
          <div
            className="w-full text-neutral-04 text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSort('price_change')}
            role="button"
          >
            24h Price %
          </div>
        ),
        cell: ({ row }) => {
          const { price_change_24h } = row.original
          return price_change_24h ? (
            <div
              className={cn(
                'leading-[140%] flex items-center',
                price_change_24h > 0 ? 'text-success-500' : 'text-error-500',
                price_change_24h === 0 && 'text-neutral-03',
              )}
            >
              {price_change_24h > 0 ? '+' : ''}
              {price_change_24h.toFixed(2)}%
            </div>
          ) : (
            <div className="text-center w-full">-</div>
          )
        },
      },
      {
        accessorKey: 'liquidity',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('liquidity')}
            role="button"
          >
            Liquidity
          </div>
        ),
        cell: ({ row }) => {
          const { liquidity } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(liquidity)}
            </div>
          )
        },
        align: 'end',
      },
      {
        accessorKey: 'fdv',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('fdv')}
            role="button"
          >
            FDV
          </div>
        ),
        cell: ({ row }) => {
          const { fdv } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(fdv)}
            </div>
          )
        },
        align: 'end',
      },
      {
        accessorKey: 'buyer_count',
        header: () => (
          <div className="flex items-center gap-0.5">
            <div className="text-neutral-04 text-sm not-italic leading-5">
              # of SM
            </div>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { number_of_smart_money } = row.original
          return <div className="text-neutral-07">{number_of_smart_money}</div>
        },
        enableSorting: false,
      },
    ]
  }, [page, perPage, setSort])
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
