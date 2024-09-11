'use client'

import CircularProgress from '@/components/common/CircularProgress'
import { DialogAiAnalysis } from '@/components/common/Dialog/DialogAiAnalysis'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import SkeletonRound from '@/components/common/Skeleton/SkeletonRound'
import { TooltipCustom } from '@/components/common/Tooltip'
import { IconBarChart } from '@/components/shared/icons/trading-signal/IconBarChart'
import { IconClockCounter } from '@/components/shared/icons/trading-signal/IconClockCounter'
import { IconScale } from '@/components/shared/icons/trading-signal/IconScale'
import { IconTarget } from '@/components/shared/icons/trading-signal/IconTarget'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DexTradingSignalInfo } from '@/types/trading-signal/dexTradingSignal'
import moment from 'moment'
import Link from 'next/link'

export const CardSignal = ({
  item,
  loading,
  index,
  className = 'w-[54px] h-[54px]',
}: {
  item: DexTradingSignalInfo
  loading?: boolean
  index: number
  className?: string
}) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'new_listing_buy':
        return (
          <TooltipCustom
            content="AI Signal New Listing Buy"
            className="z-[100]"
          >
            <IconTarget />
          </TooltipCustom>
        )
      case 'top_smart_money_buy':
        return (
          <TooltipCustom content="AI Signal Top Buys" className="z-[100]">
            <IconBarChart />
          </TooltipCustom>
        )
      case 'unusual_buy':
        return (
          <TooltipCustom content="AI Signal Unusual Buy" className="z-[100]">
            <IconScale />
          </TooltipCustom>
        )
      default:
        return ''
    }
  }

  return (
    <div
      className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-4"
      style={{ zIndex: 10 - index }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {loading ? (
            <SkeletonRound />
          ) : (
            <ImageToken
              imgUrl={item?.image_url}
              symbol={item?.symbol}
              className={className}
            />
          )}
          <div className={loading ? 'flex flex-col gap-2' : ''}>
            <div className="flex items-center gap-2">
              {loading ? (
                <Skeleton />
              ) : (
                <Link
                  href={`/smartmoney-onchain/token-explorer/${item.address}`}
                  passHref
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    className="flex items-center gap-1 text-xl font-normal text-neutral-400 hover:underline"
                  >
                    <p className="max-w-[120px] truncate text-neutral-200">
                      {item.symbol}
                    </p>
                    <p className="max-w-[120px] truncate">{item.name}</p>
                  </a>
                </Link>
              )}
            </div>
            <div>
              {loading ? (
                <Skeleton />
              ) : (
                <div className="flex items-center gap-2">
                  <div>
                    <IconClockCounter />
                  </div>
                  <p className="text-xs font-normal text-neutral-400">
                    Created {moment(item.signal_time).fromNow()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <SkeletonRound cx={22} cy={24} r={19} />
        ) : (
          <div className="flex items-center gap-2">
            <CircularProgress percentage={item.ai_score} size={30} />
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 p-2">
              {renderIcon(item.dex_trade_signal_type)}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col items-start">
          {loading ? (
            <Skeleton />
          ) : (
            <p className="text-xs font-normal text-neutral-200">Entry</p>
          )}
          {loading ? (
            <div className="mt-2">
              <Skeleton />
            </div>
          ) : (
            <p className="text-xl font-medium text-neutral-100">
              {renderPrice(item.entry)}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end">
          {loading ? (
            <Skeleton />
          ) : (
            <p className="text-xs font-normal text-neutral-200">Target</p>
          )}
          {loading ? (
            <div className="mt-2">
              <Skeleton />
            </div>
          ) : (
            <p className="flex items-center text-xl font-medium text-core">
              {renderPrice(item.target_min)}-{renderPrice(item.target_max)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {loading ? (
          <div className="w-full overflow-hidden rounded-[20px]">
            <Skeleton width={450} height={40} rx={20} ry={20} />
          </div>
        ) : (
          <DialogAiAnalysis item={item} />
        )}

        {loading ? (
          <div className="w-full overflow-hidden rounded-[20px]">
            <Skeleton width={450} height={40} rx={20} ry={20} />
          </div>
        ) : (
          <Link
            href={`/smartmoney-onchain/token-explorer/${item?.address}`}
            className="flex w-full items-center justify-center rounded-[20px] border border-transparent bg-[#1C1A1F] py-2 text-base backdrop-blur-[32px]"
          >
            Buy now
          </Link>
        )}
      </div>
    </div>
  )
}
