import { ColumnDef } from '@tanstack/react-table'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { TableFindGemsProps } from '@/types'
import { renderPrice } from '@/lib/utils/renderPrice'
import { TooltipTable } from '../Tooltip/TooltipTable'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'

import CircularProgress from '../CircularProgress'
import numeral from 'numeral'
import { nFormatter } from '@/lib/utils/nFormatter'
import { cn } from '@/lib/utils'
import { FirstTimeBuy } from '@/types/fist-time-buy'
import { StVol } from '@/components/pages/find-gems/tables/cols/st-vol'
import { StTx } from '@/components/pages/find-gems/tables/cols/st-tx'
import { TooltipToken } from '../Tooltip/tooltip-token'

export const TableFindGemsFisrtTimeBuy = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  setSort,
}: TableFindGemsProps) => {
  const columns: ColumnDef<FirstTimeBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        enableSorting: false,
        header: () => <div>#</div>,
        cell: ({ row }) => {
          return <div>{row.index + 1 + (page - 1) * perPage}</div>
        },
        size: 50,
      },
      {
        accessorKey: 'symbol',
        enableSorting: false,
        header: () => <div>Token Name</div>,
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                 <TooltipToken data={row?.original} side='bottom'>
                   <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-1.5">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div className='flex flex-col items-start justify-start'>
                        <div className="text-normal max-w-[100px] truncate text-neutral-03 underline">
                          {row?.original?.name}
                        </div>
                        <div className="max-w-[100px] truncate">
                          {row?.original?.symbol}
                        </div>
                      </div>
                    </div>
                  </Link>
                 </TooltipToken>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal text-neutral-03 underline">
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
        header: () => <div>Age</div>,
        cell: ({ row }) => {
          const { token_age } = row.original
          return <div className="text-neutral-03">{token_age}</div>
        },
      },
      {
        accessorKey: 'score',
        header: () => (
          <div className="flex items-center gap-1">
            AI Score
            <TooltipTable type="" />
          </div>
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const { score } = row.original
          return (
            <CircularProgress
              size={40}
              percentage={parseFloat(
                numeral(score.toString()).format('0,0.[00]'),
              )}
            />
          )
        },
      },
      {
        accessorKey: 'liq-fdv',
        header: () => <div>Liq/FDV</div>,
        cell: ({ row }) => {
          const { liquidity, fdv } = row.original
          return (
            <div>
              <p>${nFormatter(liquidity)}</p>
              <p>${nFormatter(fdv)}</p>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'price_change',
        header: () => (
          <div onClick={() => setSort('price_change')} role="button">
            24h%
          </div>
        ),
        cell: ({ row }) => {
          const { price_change_24h } = row.original
          return price_change_24h ? (
            <div
              className={cn(
                'flex items-center leading-[140%]',
                price_change_24h > 0 ? 'text-green' : 'text-error-500',
                price_change_24h === 0 && 'text-neutral-03',
              )}
            >
              {price_change_24h > 0 ? '+' : ''}
              {price_change_24h.toFixed(2)}%
            </div>
          ) : (
            '-'
          )
        },
      },
      {
        accessorKey: 'current_price',
        header: () => <div>Price</div>,
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
        accessorKey: 'avg_price',
        header: () => (
          <div className="flex items-center gap-0.5">
            <div>Avg entry</div>
            <TooltipTable type="avgPrice" />
          </div>
        ),
        cell: ({ row }) => {
          const { avg_price } = row.original
          return <div className="text-neutral-03">{renderPrice(avg_price)}</div>
        },
        enableSorting: false,
      },
      {
        accessorKey: 'hold_value',
        header: () => <div>Hold Value</div>,

        cell: ({ row }) => {
          const { hold_in_usdt } = row.original
          return (
            <div className="w-full text-neutral-03">
              ${nFormatter(hold_in_usdt)}
            </div>
          )
        },
      },
      {
        accessorKey: 'profit_roi',
        enableSorting: false,
        header: () => <div>Profit/ROI</div>,
        cell: ({ row }) => {
          const { roi, pnl } = row.original

          return (
            <div>
              <div className={pnl < 0 ? 'text-error-500' : 'text-green'}>
                {!pnl || pnl === 0 ? (
                  '-'
                ) : (
                  <>
                    {pnl < 0 ? '' : '+'}$
                    {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                      ? numeral(pnl).format('0,0.[000000]')
                      : nFormatter(pnl)}
                  </>
                )}
              </div>
              <div className={roi < 0 ? 'text-error-500' : 'text-green'}>
                {!roi || roi === 0 ? (
                  '-'
                ) : (
                  <>
                    {roi < 0 ? '' : '+'}
                    {(roi < 0.001 && roi > 0) || (roi > -0.001 && roi < 0)
                      ? numeral(roi).format('0,0.[000000]')
                      : roi.toFixed(2)}
                    %
                  </>
                )}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'realized_percent',
        enableSorting: false,
        header: () => <div>Realized %</div>,
        cell: ({ row }) => {
          const { realized_percent } = row.original
          return <>{numeral(realized_percent).format('0,0.[00]')}%</>
        },
      },
      {
        accessorKey: 'number_of_users',
        enableSorting: false,
        header: () => (
          <div className="flex items-center gap-0.5">
            <div># ST</div>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_users, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_users}
              address={address}
              type="first-time-buy"
              duration="24h"
            />
          )
        },
      },
      {
        accessorKey: 'st_tx',
        header: () => <div># ST Tx</div>,
        cell: ({ row }) => {
          const { tx_buy, tx_sell } = row.original
          return <StTx tx_buy={tx_buy} tx_sell={tx_sell} />
        },
      },
      {
        accessorKey: 'st_vol',
        header: () => <div>ST Vol</div>,
        cell: ({ row }) => {
          const { buy_usdt_amount, sell_usdt_amount } = row.original
          return <StVol buyVol={buy_usdt_amount} sellVol={sell_usdt_amount} />
        },
        align: 'end',
        width: 128,
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
