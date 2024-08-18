import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopTokenBuy } from '@/types/topTokenBuy'
import { cn } from '@/lib/utils'
import { TooltipCustom } from '@/components/common/Tooltip'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { TableFindGemsProps } from '@/types'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'
import { TooltipTable } from '../Tooltip/TooltipTable'

import numeral from 'numeral'
import CircularProgress from '../CircularProgress'
import { StVol } from '@/components/pages/find-gems/tables/cols/st-vol'
import { StTx } from '@/components/pages/find-gems/tables/cols/st-tx'

export const TableFindGemsSM = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  duration,
  setSort,
}: TableFindGemsProps) => {
  const columns: ColumnDef<TopTokenBuy>[] = useMemo(() => {
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
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-1.5">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div>
                        <div className="text-normal max-w-[100px] truncate text-neutral-03 underline">
                          {row?.original?.name}
                        </div>
                        <div className="max-w-[100px] truncate">
                          {row?.original?.symbol}
                        </div>
                      </div>
                    </div>
                  </Link>
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
        header: () => (
          <div onClick={() => setSort('token_age')} role="button">
            Age
          </div>
        ),
        cell: ({ row }) => {
          const { token_Age } = row.original
          return <div className="text-neutral-03">{token_Age}</div>
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
          const { liquidity_usd, fdv } = row.original
          return (
            <div>
              <p>${nFormatter(liquidity_usd)}</p>
              <p>${nFormatter(fdv)}</p>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: '24h',
        header: () => (
          <div onClick={() => setSort('price_change')} role="button">
            24h
          </div>
        ),
        cell: ({ row }) => {
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h === 0 ? (
            <div className="text-sm not-italic leading-5 text-neutral-03">
              -
            </div>
          ) : (
            <div
              className={cn(
                'text-sm not-italic leading-5 text-neutral-03',
                price_percent_change_24h > 0 ? 'text-green' : 'text-error-500',
              )}
            >
              {price_percent_change_24h > 0 ? '+' : ''}
              {price_percent_change_24h.toFixed(2)}%
            </div>
          )
        },
      },
      {
        accessorKey: 'price',
        enableSorting: false,
        header: () => <div>Price</div>,
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-03">
              {renderPrice(current_price)}
            </div>
          )
        },
      },
      {
        accessorKey: 'avg_price',
        enableSorting: false,
        header: () => <div>Avg Price</div>,
        cell: ({ row }) => {
          const { avg_price } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-03">
              {renderPrice(avg_price)}
            </div>
          )
        },
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
          return <div>{realized_percent.toFixed(2)}%</div>
        },
      },
      {
        accessorKey: 'number_of_buys',
        enableSorting: false,
        header: () => (
          <div className="flex items-center gap-0.5 whitespace-nowrap">
            <p># ST</p>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_smart_money, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_smart_money}
              address={address}
              type="trade"
              duration={duration as string}
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
      },
    ]
  }, [duration, page, perPage, setSort])
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
