import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'
import Image from 'next/image'
import { CopyCustom } from '../CopyCustom'
import numeral from 'numeral'
import { nFormatter } from '@/lib/utils/nFormatter'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ImageRanking } from '../Image/image-ranking'
import IconCopyAddress from '@/components/shared/icons/icon-copy-address'

interface TooltipWalletProps {
  user_address?: string
  total_balance?: number
  win_rate_percent?: number
  pnl_of_3d_trades?: number
  roi?: number
  user_balance?: number
  user_profit?: number
  user_roi?: number
  user_win_rate_percent?: number
  sender?: string
  ranking?: string
  badges?: string[]
  total_pnl?: number
}

export const TooltipWallet = ({
  children,
  data,
}: {
  children: ReactNode
  data: TooltipWalletProps
}) => {
  const sender = data?.user_address || data?.sender || ''
  const totalBalance = data?.total_balance || data?.user_balance || 0
  const winRate = data?.win_rate_percent || data?.user_win_rate_percent || 0
  const profit =
    data?.pnl_of_3d_trades || data?.user_profit || data?.total_pnl || 0
  const roi = data?.roi || data?.user_roi || 0

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="min-w-[360px] overflow-hidden rounded-[20px] border border-white/10 !p-0">
          <div className="relative overflow-hidden rounded-[20px]">
            <div className="absolute -z-10 h-full w-full rounded-[20px] bg-black/25 backdrop-blur-md"></div>
            <div className="flex w-full flex-col gap-2.5 self-stretch bg-black/25 p-4 backdrop-blur-xl">
              <div className="flex gap-4 whitespace-nowrap text-base font-medium leading-6 tracking-normal text-[#EFEFEF]">
                <ImageRanking ranking={data.ranking} size={56} />
                <div>
                  <div className="flex items-center gap-2">
                    <div className="underline">
                      <Link
                        className="max-w-32 truncate text-neutral-300 underline"
                        href={`/smartmoney-onchain/wallet-explorer/${sender}`}
                      >
                        {`${sender?.substring(0, 6)}...${sender?.slice(-6)}`}
                      </Link>
                    </div>
                    <div className="mt-1">
                      <CopyCustom value={sender} icon={<IconCopyAddress />} />
                    </div>
                    <a
                      href={`https://solscan.io/account/${sender}`}
                      target="_blank"
                    >
                      <Image
                        loading="lazy"
                        src="/images/scan.webp"
                        className="h-[23px] w-[23px]"
                        width={23}
                        height={23}
                        alt="scan"
                      />
                    </a>
                  </div>
                  <div className="flex items-end">
                    {data?.badges?.map((item: string, index: number) => {
                      return (
                        <Image
                          key={index}
                          src={`/images/badges/${item}.png`}
                          alt={item}
                          width={24}
                          height={24}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex w-1/2 flex-col gap-2">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-xs font-normal text-neutral-300">
                      Balance
                    </p>
                    <p className="text-xs font-medium text-neutral-100">
                      {totalBalance ? nFormatter(totalBalance) : '-'}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="text-xs font-normal text-neutral-300">
                      Winrate 30D
                    </p>
                    <p className="text-xs font-medium text-neutral-100">
                      {winRate ? `${numeral(winRate).format('0.00')}%` : '-'}
                    </p>
                  </div>
                </div>
                <div className="flex w-1/2 flex-col gap-2">
                  <div className="flex w-full items-center justify-between gap-2">
                    <p className="whitespace-nowrap text-xs font-normal text-neutral-300">
                      Total Profit 30D
                    </p>
                    <p
                      className={cn(
                        'text-end text-xs font-medium',
                        profit > 0
                          ? 'text-core'
                          : profit < 0
                            ? 'text-error-500'
                            : 'text-neutral-100',
                      )}
                    >
                      {profit ? `$${nFormatter(profit)}` : '-'}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <p className="whitespace-nowrap text-xs font-normal text-neutral-300">
                      Total ROI 30D
                    </p>
                    <p
                      className={cn(
                        'text-xs font-medium',
                        roi > 0
                          ? 'text-core'
                          : roi < 0
                            ? 'text-error-500'
                            : 'text-neutral-100',
                      )}
                    >
                      {roi ? `${numeral(roi).format('0,0.[00]')}%` : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
