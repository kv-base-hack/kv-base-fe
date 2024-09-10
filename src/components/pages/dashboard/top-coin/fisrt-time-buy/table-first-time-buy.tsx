import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { TableProps } from '@/types'
import { FirstTimeBuy } from '@/types/fist-time-buy'
import { useMemo } from 'react'
import { TooltipToken } from '@/components/common/Tooltip/tooltip-token'
import { TooltipTable } from '@/components/common/Tooltip/TooltipTable'
import CircularProgress from '@/components/common/CircularProgress'
import numeral from 'numeral'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { DataTable } from '@/components/common/DataTable'


export const TableFirstTimeBuy = ({
  page,
  perPage,
  data,
  isFetching,
  duration,
  setSortBy,
}: TableProps) => {
  const columns: ColumnDef<FirstTimeBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: () => (
          <div className="text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]">
            #
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="font-medium">
              {row.index + 1 + (page - 1) * perPage}
            </div>
          )
        },
        size: 50,
      },
      {
        accessorKey: 'symbol',
        header: () => (
          <div className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <TooltipToken data={row?.original} type="hold">
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-3">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div className="text-normal max-w-[100px] truncate font-medium text-neutral-dark-03 underline">
                        {row?.original?.symbol}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-3">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal font-medium text-neutral-dark-03 underline">
                      {row?.original?.symbol}
                    </div>
                  </div>
                )}
              </div>
            </TooltipToken>
          )
        },
      },
      {
        accessorKey: 'token_age',
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('token_age')}
            role="button"
          >
            Token Age
          </div>
        ),
        cell: ({ row }) => {
          const { token_age } = row.original
          return (
            <div className="w-full whitespace-nowrap font-medium text-neutral-300">
              {token_age}
            </div>
          )
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
            <div className="relative">
              <div className="absolute -top-[18px]">
                <CircularProgress
                  percentage={parseFloat(
                    numeral(score.toString()).format('0,0.[00]'),
                  )}
                  size={35}
                  fontSize={10}
                />
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'price_change_24h',
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('price_change')}
            role="button"
          >
            24h%
          </div>
        ),
        cell: ({ row }) => {
          const { price_change_24h } = row.original
          return price_change_24h ? (
            <div
              className={cn(
                'flex items-center font-medium leading-[140%]',
                price_change_24h > 0 ? 'text-green' : 'text-error-500',
                price_change_24h === 0 && 'text-neutral-300',
              )}
            >
              {price_change_24h > 0 ? '+' : ''}
              {price_change_24h.toFixed(2)}%
            </div>
          ) : (
            '-'
          )
        },
        align: 'start',
      },
      {
        accessorKey: 'total-spent',
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('total_spent')}
            role="button"
          >
            Total Hold
          </div>
        ),
        align: 'start',
        cell: ({ row }) => {
          const { hold_in_usdt } = row.original
          return (
            <div className="w-full font-medium text-neutral-300">
              {hold_in_usdt ? `$${nFormatter(hold_in_usdt)}` : '-'}
            </div>
          )
        },
      },
      {
        accessorKey: 'pnl',
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy('pnl')}
            role="button"
          >
            Profit
          </div>
        ),
        align: 'total-profit',
        cell: ({ row }) => {
          const { pnl } = row.original
          return (
            <div className="font-medium">
              {pnl === 0 ? (
                '-'
              ) : (
                <div className={pnl < 0 ? 'text-error-500' : 'text-green'}>
                  $
                  {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                    ? numeral(pnl).format('0,0.[000000]')
                    : nFormatter(pnl)}
                </div>
              )}
            </div>
          )
        },
      },
      {
        accessorKey: 'buyer_count',
        header: () => (
          <div className="flex items-center gap-0.5">
            <div className="w-full whitespace-nowrap text-center text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]">
              # ST
            </div>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        cell: ({ row }) => {
          const { users, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={users.length}
              address={address}
              type="first-time-buy"
              duration={duration as string}
            />
          )
        },
        align: 'center',
      },
    ]
  }, [duration, page, perPage, setSortBy])
  return (
    <DataTable
      className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
      columns={columns}
      data={data || []}
      isFetching={isFetching}
      noneBorder
      noneBgHeader
      emptyData="No results."
    />
  )
}
