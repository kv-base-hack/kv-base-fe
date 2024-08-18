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
      className="shadow-ai-signal flex w-full flex-col gap-4 rounded-2xl border border-solid border-[#EFEFEF] bg-transparent p-6 backdrop-blur-lg"
      style={{ zIndex: 10 - index }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {loading ? (
            <Skeleton className="h-[54px] w-[54px] rounded-full" />
          ) : (
            <ImageToken
              imgUrl={item?.image_url}
              symbol={item?.symbol}
              className="h-[54px] w-[54px]"
            />
          )}
          <div className={loading ? 'flex flex-col gap-2' : ''}>
            <div className="flex items-center gap-2">
              {loading ? (
                <Skeleton className="h-[14px] w-[140px] rounded-lg" />
              ) : (
                <Link
                  href={`/smartmoney-onchain/token-explorer/${item.address}?chain=${CHAIN}`}
                  passHref
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    className="flex items-center gap-1 text-xl font-bold hover:underline"
                  >
                    <p
                      className={cn(
                        'text-[#1A1D1F]',
                        pathName === '/smartmoney-onchain/dashboard'
                          ? 'max-w-20 truncate'
                          : '',
                      )}
                    >
                      {item.symbol}
                    </p>
                    <p
                      className={cn(
                        'text-[#6F767E]',
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
                <Skeleton className="h-[14px] w-[140px] rounded-lg" />
              ) : (
                <div className="flex items-center gap-1">
                  <div>
                    <IconClockCounter />
                  </div>
                  <p className="whitespace-nowrap text-sm font-medium text-neutral-04">
                    Created {moment(item.signal_time).fromNow()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : (
          <div className="rounded-full">
            {renderIcon(item.dex_trade_signal_type)}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton className="h-[14px] w-[100px] rounded-lg" />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]">Entry</p>
          )}
          {loading ? (
            <Skeleton className="h-[14px] w-[100px] rounded-lg" />
          ) : (
            <div className="text-xl font-medium text-neutral-07">
              {renderPrice(item.entry)}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton className="h-[14px] w-[100px] rounded-lg" />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]">Target</p>
          )}
          {loading ? (
            <Skeleton className="h-[14px] w-[100px] rounded-lg" />
          ) : (
            <div className="flex items-center text-xl font-medium text-neutral-07">
              {renderPrice(item.target_min)}-{renderPrice(item.target_max)}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton className="h-[14px] w-[100px] rounded-lg" />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]"># of Wallet</p>
          )}
          {loading ? (
            <Skeleton className="h-[14px] w-[100px] rounded-lg" />
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
