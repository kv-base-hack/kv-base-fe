import { chainAtom } from '@/atom/chain'
import { DialogUsers } from '@/components/common/Dialog/DialogListUsers'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Skeleton from '@/components/common/Skeleton'
import { TooltipCustom } from '@/components/common/Tooltip'
import { IconBarChart } from '@/components/shared/icons/IconBarChart'
import { IconClockCounter } from '@/components/shared/icons/IconClockCounter'
import { IconScale } from '@/components/shared/icons/IconScale'
import { IconTargetGradient } from '@/components/shared/icons/IconTargetGradient'
import { cn } from '@/lib/utils'
import { AITradingSignalInfo } from '@/types/tradingSignal'
import { renderPrice } from '@/utils/renderPrice'
import { useAtomValue } from 'jotai'
import moment from 'moment'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const CardAISignal = ({
  item,
  loading,
  index,
}: {
  item: AITradingSignalInfo
  loading: boolean
  index: number
}) => {
  const pathName = usePathname()
  const CHAIN = useAtomValue(chainAtom)

  const renderIcon = (type: string) => {
    switch (type) {
      case 'new_listing_buy':
        return (
          <TooltipCustom
            content="AI Signal New Listing Buy"
            className="text-neutral-07"
          >
            <IconTargetGradient />
          </TooltipCustom>
        )
      case 'top_smart_money_buy':
        return (
          <TooltipCustom
            content="AI Signal Top Buy"
            className="text-neutral-07"
          >
            <IconBarChart />
          </TooltipCustom>
        )
      case 'unusual_buy':
        return (
          <TooltipCustom
            content="AI Signal Unusual Buy"
            className="text-neutral-07"
          >
            <IconScale />
          </TooltipCustom>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="p-6 flex flex-col gap-4 bg-transparent border border-[#EFEFEF] border-solid rounded-2xl w-full backdrop-blur-lg shadow-ai-signal"
      style={{ zIndex: 10 - index }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {loading ? (
            <Skeleton className="w-[54px] h-[54px] rounded-full" />
          ) : (
            <ImageToken
              imgUrl={item?.image_url}
              symbol={item?.symbol}
              className="w-[54px] h-[54px]"
            />
          )}
          <div className={loading ? 'flex flex-col gap-2' : ''}>
            <div className="flex items-center gap-2">
              {loading ? (
                <Skeleton className="w-[140px] h-[14px] rounded-lg" />
              ) : (
                <Link
                  href={`/smartmoney-onchain/token-explorer/${item.address}?chain=${CHAIN}`}
                  passHref
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    className="flex items-center gap-1 font-bold text-xl  hover:underline"
                  >
                    <p
                      className={cn(
                        'text-[#1A1D1F] ',
                        pathName === '/smartmoney-onchain/dashboard'
                          ? 'max-w-20 truncate'
                          : '',
                      )}
                    >
                      {item.symbol}
                    </p>
                    <p
                      className={cn(
                        ' text-[#6F767E] ',
                        pathName === '/smartmoney-onchain/dashboard'
                          ? 'max-w-20 truncate'
                          : 'max-w-[160px] truncate',
                      )}
                    >
                      {item.name}
                    </p>
                  </a>
                </Link>
              )}
            </div>
            <div>
              {loading ? (
                <Skeleton className="w-[140px] h-[14px] rounded-lg" />
              ) : (
                <div className="flex items-center gap-1">
                  <div>
                    <IconClockCounter />
                  </div>
                  <p className="text-sm text-neutral-04 font-medium whitespace-nowrap">
                    Created {moment(item.signal_time).fromNow()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : (
          <div className="rounded-full">
            {renderIcon(item.dex_trade_signal_type)}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton className="w-[100px] h-[14px] rounded-lg " />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]">Entry</p>
          )}
          {loading ? (
            <Skeleton className="w-[100px] h-[14px] rounded-lg " />
          ) : (
            <p className="text-neutral-07 text-xl font-medium">
              {renderPrice(item.entry)}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton className="w-[100px] h-[14px] rounded-lg" />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]">Target</p>
          )}
          {loading ? (
            <Skeleton className="w-[100px] h-[14px] rounded-lg" />
          ) : (
            <p className="text-xl font-medium flex items-center text-neutral-07">
              {renderPrice(item.target_min)}-{renderPrice(item.target_max)}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton className="w-[100px] h-[14px] rounded-lg" />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]"># of Wallet</p>
          )}
          {loading ? (
            <Skeleton className="w-[100px] h-[14px] rounded-lg" />
          ) : (
            <DialogUsers users={item.users} />
          )}
        </div>
      </div>

      {/* {loading ? (
        <div className="w-full overflow-hidden rounded-[20px]">
          <Skeleton width={450} height={40} rx={20} ry={20} />
        </div>
      ) : (
        <DialogAiAnalysis item={item} />
      )} */}
    </div>
  )
}
