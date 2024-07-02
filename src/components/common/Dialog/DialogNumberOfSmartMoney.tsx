'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import numeral from 'numeral'
import { useQuery } from '@tanstack/react-query'
import Close from '@/components/shared/icons/Close'
import Link from 'next/link'
import { useGetTopSmartMoneyTradeQuery } from '@/query/leaderboard/getTopSmartMoneyTrade'
import { IconArrowColorRightUp } from '@/components/shared/icons/IconArrowColorRightUp'
import { nFormatter } from '@/utils/nFormatter'
import { DataTable } from '../DataTable'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { PaginationTable } from '../Pagination/PaginationTable'

interface ListWalletProps {
  user_address: string
  roi: number
  pnl: number
}

export const DialogNumberOfSmartMoney = ({
  number,
  address,
  type,
  duration,
}: {
  number: number
  address: string
  type: string
  duration: string
}) => {
  const CHAIN = useAtomValue(chainAtom)
  const [start, setStart] = useState(1)
  const [limit, setLimit] = useState(5)
  const [visible, setVisible] = useState(false)

  const topSmartMoneyTradeQuery = useQuery(
    useGetTopSmartMoneyTradeQuery({
      chain: CHAIN,
      limit,
      start,
      address,
      duration,
      enabled: visible,
      type,
    }),
  )

  const listUsers = topSmartMoneyTradeQuery.isFetching
    ? [...(Array(5).keys() as any)]
    : topSmartMoneyTradeQuery.data?.users || []
  const total = topSmartMoneyTradeQuery.data?.total || 0

  const columns: ColumnDef<ListWalletProps>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        cell: ({ row }) => {
          return (
            <div className="text-base font-semibold">
              {row.index + 1 + (start - 1) * limit}
            </div>
          )
        },
        size: 50,
      },
      {
        accessorKey: 'user_address',
        cell: ({ row }) => {
          const address = row.original.user_address
          return (
            <Link href={`/smartmoney-onchain/wallet-explorer/${address}`}>
              <div className="text-base  font-semibold flex items-center gap-3">
                <p className="hover:underline">
                  {address?.substring(0, 6)}..
                  {address?.substring(address?.length - 4, address?.length)}
                </p>
                <div className="p-1 rounded-full bg-[#D8F0FF]">
                  <IconArrowColorRightUp />
                </div>
              </div>
            </Link>
          )
        },
      },
      {
        accessorKey: 'roi',
        cell: ({ row }) => {
          return (
            <div
              className={cn(
                'text-sm font-semibold flex items-center gap-1',
                row.original.roi >= 0
                  ? 'text-semantic-success-1'
                  : 'text-semantic-error-1',
              )}
            >
              <p>ROI:</p>
              <p>{numeral(row.original.roi).format('0,0.[000]')}%</p>
            </div>
          )
        },
      },
      {
        accessorKey: 'pnl',
        cell: ({ row }) => {
          const { pnl } = row.original
          return !pnl || pnl === 0 ? (
            <div>PNL: -</div>
          ) : (
            <div
              className={cn(
                'flex items-center gap-1',
                pnl < 0 ? 'text-semantic-error-1' : 'text-semantic-success-1',
              )}
            >
              PNL:
              <p>
                $
                {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                  ? numeral(pnl).format('0,0.[000000]')
                  : nFormatter(pnl)}
              </p>
            </div>
          )
        },
        align: 'start',
      },
    ]
  }, [limit, start])
  return (
    <>
      {number > 0 ? (
        <Dialog>
          <DialogTrigger>
            <div
              className="whitespace-nowrap text-sm not-italic leading-5 underline"
              onClick={() => setVisible(true)}
            >
              {nFormatter(number)}
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[617px] !p-0 !rounded-xl !border-none">
            <div className="flex flex-col gap-4 p-4 bg-neutral-01 rounded-xl">
              <div className="relative">
                <p className="text-neutral-07 text-xl font-medium text-center">
                  List of Wallet
                </p>
                <DialogClose className="absolute top-0.5 right-0">
                  <Close />
                </DialogClose>
              </div>

              <DataTable
                data={listUsers}
                columns={columns}
                emptyData="No result!!!"
                classNameHeader="hidden"
                isFetching={topSmartMoneyTradeQuery.isFetching}
              />

              <PaginationTable
                currentPage={start}
                pageSize={limit}
                total={total}
                setPage={setStart}
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="whitespace-nowrap text-sm not-italic leading-5">
          {' '}
          {nFormatter(number)}
        </div>
      )}
    </>
  )
}
