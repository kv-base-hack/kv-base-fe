import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { TableFindGemsProps } from '@/types'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { renderPrice } from '@/lib/utils/renderPrice'
import numeral from 'numeral'
import { UnusualBuy } from '@/types/unusualBuy'
import { TooltipTable } from '../Tooltip/TooltipTable'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'
import { TooltipTokenInfo } from '../Tooltip/TooltipTokenInfo'

export const TableFindGemsFreshWalletUnusual = ({
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
  const columns: ColumnDef<UnusualBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-dartk-05 text-sm font-normal not-italic leading-6 tracking-[-0.14px]">
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
          <div className="whitespace-nowrap text-sm font-normal not-italic leading-6 tracking-[-0.14px] text-neutral-04">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}?chain=${chain}`}
                  >
                    <TooltipTokenInfo token={row?.original} chain={chain} />
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal text-neutral-07 underline">
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
        accessorKey: 'total_spent',
        header: () => (
          <div
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px] text-neutral-04"
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
            className="text-sm not-italic leading-5 text-neutral-04"
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
        accessorKey: 'pnl',
        header: () => (
          <div
            className="text-sm not-italic leading-5 text-neutral-04"
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
        align: 'center',
      },
      {
        accessorKey: 'avg_price',
        header: () => (
          <div className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px] text-neutral-04">
            Avg Price
          </div>
        ),
        cell: ({ row }) => {
          const { avg_price } = row.original
          return <div className="text-neutral-07">{renderPrice(avg_price)}</div>
        },
        enableSorting: false,
        align: 'center',
      },
      {
        accessorKey: 'current_price',
        header: () => (
          <div className="text-sm not-italic leading-5 text-neutral-04">
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
        align: 'center',
      },
      {
        accessorKey: 'price',
        header: () => (
          <div
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px] text-neutral-04"
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
                'flex items-center leading-[140%]',
                price_change_24h > 0 ? 'text-success-500' : 'text-error-500',
                price_change_24h === 0 && 'text-neutral-03',
              )}
            >
              {price_change_24h > 0 ? '+' : ''}
              {price_change_24h.toFixed(2)}%
            </div>
          ) : (
            <div className="w-full text-center">-</div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'liquidity',
        header: () => (
          <div
            className="text-sm not-italic leading-5 text-neutral-04"
            onClick={() => setSort('liquidity')}
            role="button"
          >
            Liquidity
          </div>
        ),
        cell: ({ row }) => {
          const { liquidity } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              ${nFormatter(liquidity)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'fdv',
        header: () => (
          <div
            className="text-sm not-italic leading-5 text-neutral-04"
            onClick={() => setSort('fdv')}
            role="button"
          >
            FDV
          </div>
        ),
        cell: ({ row }) => {
          const { fdv } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
              ${nFormatter(fdv)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'buyer_count',
        header: () => (
          <div className="flex items-center gap-0.5">
            <div className="text-sm not-italic leading-5 text-neutral-04">
              # of Wallet
            </div>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { number_of_users, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_users}
              address={address}
              type="unusual_buy"
              duration="24h"
            />
          )
        },
        enableSorting: false,
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
