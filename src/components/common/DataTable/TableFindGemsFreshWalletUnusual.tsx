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
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'
import { TooltipTable } from '../Tooltip/TooltipTable'

export const TableFindGemsFreshWalletUnusual = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  setSort,
  duration,
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
                      <div className="text-normal max-w-[120px] truncate text-neutral-03 underline">
                        {row?.original?.symbol}
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
        accessorKey: 'age',
        header: () => <div>Age</div>,
        cell: ({ row }) => {
          const { token_age } = row.original
          return <div className="text-neutral-03">{token_age}</div>
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
        accessorKey: 'price',
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
            <div>-</div>
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
        accessorKey: 'buy_vol',
        header: () => <div>Buy Vol</div>,
        cell: ({ row }) => {
          const { total_spent } = row.original
          return (
            <div className="text-neutral-03">${nFormatter(total_spent)}</div>
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

          return !roi || roi === 0 ? (
            '-'
          ) : (
            <div>
              <div className={pnl < 0 ? 'text-error-500' : 'text-green'}>
                {pnl < 0 ? '' : '+'}$
                {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                  ? numeral(pnl).format('0,0.[000000]')
                  : nFormatter(pnl)}
              </div>
              <div className={roi < 0 ? 'text-error-500' : 'text-green'}>
                {roi < 0 ? '' : '+'}
                {(roi < 0.001 && roi > 0) || (roi > -0.001 && roi < 0)
                  ? numeral(roi).format('0,0.[000000]')
                  : roi.toFixed(2)}
                %
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'realized',
        header: () => <div>Realized %</div>,
        cell: ({ row }) => {
          const { realized_percent } = row.original
          return <div>{realized_percent.toFixed(2)}%</div>
        },
      },
      {
        accessorKey: 'buyer_count',
        header: () => (
          <div className="flex items-center gap-0.5">
            <div># Wallet</div>
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
              duration={duration as string}
            />
          )
        },
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
