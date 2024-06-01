import { AITradingSignalInfo } from '@/types/tradingSignal'
import { CardCommon } from '../common/Card/CardCommon'
import { TitleCard } from '../common/Card/TitleCard'
import { LinkCustom } from '../common/Link'
import { IconFire } from '../shared/icons/leaderboard/IconFire'
import { IconScale } from '../shared/icons/IconScale'
import Skeleton from '../common/Skeleton'
import { ImageToken } from '../common/Image/ImageToken'
import Link from 'next/link'
import { IconClockCounter } from '../shared/icons/IconClockCounter'
import moment from 'moment'
import { renderPrice } from '@/utils/renderPrice'
import { IconBarChart } from '../shared/icons/IconBarChart'
import { DialogUsers } from '../common/Dialog/DialogListUsers'
import { IconTargetGradient } from '../shared/icons/IconTargetGradient'
import { useGetAITradingSignalQuery } from '@/query/leaderboard/getAITradingSignal'
import { useQuery } from '@tanstack/react-query'

export const LastestAiSignal = () => {
  const dataAITradingSignalQuery = useQuery({
    ...useGetAITradingSignalQuery({
      limit: 2,
      start: 1,
    }),
  })

  const dataAITradingSignal = dataAITradingSignalQuery.isFetching
    ? [...(Array(2).keys() as any)]
    : dataAITradingSignalQuery.data?.data || []

  return (
    <CardCommon>
      <TitleCard iconFirst={<IconFire />} title="Lastest AI Trading Signal">
        <LinkCustom url="/" title="See all" />
      </TitleCard>
      <div className="flex items-center gap-6">
        {dataAITradingSignal.map((item, i) => {
          return (
            <Card
              item={item}
              key={i}
              loading={dataAITradingSignalQuery.isFetching}
            />
          )
        })}
      </div>
    </CardCommon>
  )
}

// Fix type
const Card = ({ item, loading }: { item: any; loading?: boolean }) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'new_listing_buy':
        return <IconTargetGradient />
      case 'top_smart_money_buy':
        return <IconBarChart />
      case 'unusual_buy':
        return <IconScale />
      default:
        return <IconTargetGradient />
    }
  }

  return (
    <div className="p-6 flex flex-col gap-4 bg-transparent border border-[#EFEFEF] border-solid rounded-2xl w-full backdrop-blur-lg shadow-ai-signal">
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
                  href={`/smartmoney-onchain/token-explorer/${item.address}`}
                  passHref
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    className="flex items-center gap-1 font-bold text-xl  hover:underline"
                  >
                    <p className="text-[#1A1D1F]">{item.symbol}</p>
                    <p className="w-[150px] text-[#6F767E] truncate">
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
                <div className="flex items-center gap-2">
                  <div>
                    <IconClockCounter />
                  </div>
                  <p className="text-base text-neutral-04 text-medium">
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
