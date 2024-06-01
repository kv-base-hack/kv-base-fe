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
}: {
  users: SmartMoneyTradeWithTokenResponse[]
}) => {
  const columns: ColumnDef<SmartMoneyTradeWithTokenResponse>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        cell: ({ row }) => {
          return (
            <div className="text-base text-neutral-400 font-semibold">
              {row.index + 1}
            </div>
          )
        },
        size: 50,
      },
      {
        accessorKey: 'user_address',
        cell: ({ row }) => {
          const address = row.original.useraddress
          return (
            <Link href={`/smartmoney-onchain/wallet-explorer/${address}`}>
              <div className="text-base text-neutral-300 font-semibold flex items-center gap-3">
                <p className="hover:underline">
                  {address?.substring(0, 6)}..
                  {address?.substring(address?.length - 4, address?.length)}
                </p>
                <div className="p-1 border border-white/10 rounded-full bg-[#1a1d1f80]">
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
                {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                  ? numeral(pnl).format('0,0.[000000]')
                  : nFormatter(pnl)}
                $
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
        <div className="text-neutral-07 whitespace-nowrap text-xl leading-5 underline">
          {nFormatter(users?.length)}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[617px] !p-0 !rounded-xl !border-none">
        <div className="flex flex-col gap-4 p-4 bg-[#1e1e1e80] rounded-xl">
          <div className="relative">
            <p className="text-neutral-02 text-xl font-medium text-center">
              List of Wallet
            </p>
            <DialogClose className="absolute top-0.5 right-0">
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
