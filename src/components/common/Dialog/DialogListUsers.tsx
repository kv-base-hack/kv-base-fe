'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import numeral from 'numeral'
import Close from '@/components/shared/icons/Close'
import Link from 'next/link'
import { DataTable } from '../DataTable'
import { SmartMoneyTradeWithTokenResponse } from '@/types/tradingSignal'
import { IconArrowColorRightUp } from '@/components/shared/icons/IconArrowColorRightUp'
import { nFormatter } from '@/utils/nFormatter'

export const DialogUsers = ({
  users,
  className = 'text-xl',
}: {
  users: SmartMoneyTradeWithTokenResponse[]
  className?: string
}) => {
  const columns: ColumnDef<SmartMoneyTradeWithTokenResponse>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        cell: ({ row }) => {
          return <div className="text-base font-semibold">{row.index + 1}</div>
        },
        size: 50,
      },
      {
        accessorKey: 'user_address',
        cell: ({ row }) => {
          const address = row.original.useraddress
          return (
            <Link href={`/smartmoney-onchain/wallet-explorer/${address}`}>
              <div className="flex items-center gap-3 text-base font-semibold">
                <p className="hover:underline">
                  {address?.substring(0, 6)}..
                  {address?.substring(address?.length - 4, address?.length)}
                </p>
                <div className="rounded-full bg-[#D8F0FF] p-1">
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
                'flex items-center gap-1 text-sm font-semibold',
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
  }, [])
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            'whitespace-nowrap leading-5 text-neutral-07 underline',
            className,
          )}
        >
          {nFormatter(users?.length)}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[617px] !rounded-xl !border-none !p-0">
        <div className="flex flex-col gap-4 rounded-xl bg-neutral-01 p-4">
          <div className="relative">
            <p className="text-center text-xl font-medium text-neutral-07">
              List of Wallet
            </p>
            <DialogClose className="absolute right-0 top-0.5 text-neutral-07">
              <Close />
            </DialogClose>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            <DataTable
              data={users}
              columns={columns}
              emptyData="No result!!!"
              classNameHeader="hidden"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
