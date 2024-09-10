import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { TopTokenBuy } from '@/types/topTokenBuy'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { useMemo } from 'react'
import { DataTable } from '.'
import { DialogNumberOfSmartMoney } from '../Dialog/DialogNumberOfSmartMoney'
import { TooltipTable } from '../Tooltip/TooltipTable'
import CircularProgress from '../CircularProgress'
import numeral from 'numeral'
import { nFormatter } from '@/lib/utils/nFormatter'
import { TooltipToken } from '../Tooltip/tooltip-token'

export const TableTopTokenBuy = ({
  page,
  perPage,
  data,
  isFetching,
  duration,
  setSortBy,
}: {
  page: number
  perPage: number
  data: any[]
  isFetching?: boolean
  duration: string
  setSortBy: (value: string) => void
}) => {
  const columns: ColumnDef<TopTokenBuy>[] = useMemo(() => {
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
        align: 'start',
      },
      {
        accessorKey: 'token_age',
        header: () => (
          <div
            className="whitespace-nowrap"
            onClick={() => setSortBy('token_age')}
            role="button"
          >
            Token Age
          </div>
        ),
        align: 'age',
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
        accessorKey: 'price_change',
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
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h ? (
            <div
              className={cn(
                'flex items-center font-medium leading-[140%]',
                price_percent_change_24h > 0 ? 'text-green' : 'text-error-500',
                price_percent_change_24h === 0 && 'text-neutral-300',
              )}
            >
              {price_percent_change_24h > 0 ? '+' : ''}
              {price_percent_change_24h.toFixed(2)}%
            </div>
          ) : (
            <div className="w-full text-center">-</div>
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
        align: 'start',
        cell: ({ row }) => {
          const { users } = row.original
          return (
            <div className="font-medium">
              {!users?.[0]?.pnl || users?.[0]?.pnl === 0 ? (
                '-'
              ) : (
                <div
                  className={
                    users?.[0]?.pnl < 0 ? 'text-error-500' : 'text-green'
                  }
                >
                  $
                  {(users?.[0]?.pnl < 0.001 && users?.[0]?.pnl > 0) ||
                  (users?.[0]?.pnl > -0.001 && users?.[0]?.pnl < 0)
                    ? numeral(users?.[0]?.pnl).format('0,0.[000000]')
                    : nFormatter(users?.[0]?.pnl)}
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
