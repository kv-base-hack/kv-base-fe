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

export const TooltipWallet = ({
  children,
  data,
}: {
  children: ReactNode
  data: any
}) => {
  const sender = data?.user_address || data?.sender
  const totalBalance = data?.total_balance || 0
  const winRate = data?.win_rate_percent || 0
  const profit = data?.pnl_of_3d_trades || 0
  const roi = data?.roi || 0

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="w-[400px] overflow-hidden rounded-[20px] border border-white/10 bg-black p-4 backdrop-blur-xl">
          <div className="flex w-full flex-col gap-2.5 self-stretch">
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
                    href={`https://basescan.org/account/${sender}`}
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
                <div className="flex w-full items-center justify-between">
                  <p className="text-xs font-normal text-neutral-300">
                    Total Profit 30D
                  </p>
                  <p
                    className={cn(
                      'text-xs font-medium',
                      data?.pnl_of_3d_trades > 0
                        ? 'text-core'
                        : data?.pnl_of_3d_trades < 0
                          ? 'text-error-500'
                          : 'text-neutral-100',
                    )}
                  >
                    {profit ? `$${nFormatter(data?.pnl_of_3d_trades)}` : '-'}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-xs font-normal text-neutral-300">
                    Total ROI 30D
                  </p>
                  <p
                    className={cn(
                      'text-xs font-medium',
                      data?.roi > 0
                        ? 'text-core'
                        : data?.roi < 0
                          ? 'text-error-500'
                          : 'text-neutral-100',
                    )}
                  >
                    {roi ? `$${numeral(data?.roi).format('0,0.[00]')}%` : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
