import { DialogAiAnalysis } from '@/components/common/Dialog/DialogAiAnalysis'
import { DialogUsers } from '@/components/common/Dialog/DialogListUsers'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import Skeleton from '@/components/common/Skeleton/Skeleton'
import SkeletonCell from '@/components/common/Skeleton/SkeletonCell'
import SkeletonRound from '@/components/common/Skeleton/SkeletonRound'
import { SkeletonText } from '@/components/common/Skeleton/SkeletonText'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { IconBarChart } from '@/components/shared/icons/trading-signal/IconBarChart'
import { IconClockCounter } from '@/components/shared/icons/trading-signal/IconClockCounter'
import { IconScale } from '@/components/shared/icons/trading-signal/IconScale'
import { IconTarget } from '@/components/shared/icons/trading-signal/IconTarget'
import { cn } from '@/lib/utils'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { renderPrice } from '@/lib/utils/renderPrice'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import {
  DexTradingSignalInfo,
  SmartMoneyTradeWithTokenResponse,
} from '@/types/trading-signal/dexTradingSignal'
import moment from 'moment'
import Link from 'next/link'
import { useState } from 'react'

interface TabProps {
  tab: string
  type?: string
}

const tabsSignal = [
  {
    tab: 'All Strategy',
  },
  {
    tab: 'AI Unusual Buy',
    type: 'unusual_buy',
  },
  {
    tab: 'AI New Listings Buy',
    type: 'new_listing_buy',
  },
  {
    tab: 'AI Top Buys',
    type: 'top_smart_money_buy',
  },
]

export const AiTradingSignal = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(8)
  const [activeTab, setActiveTab] = useState<string>('All Strategy')
  const [type, setType] = useState<string>()

  const dataDexTradingSignalQuery = useGetDexTradingSignalQuery({
    limit: perPage,
    start: page,
    type,
  })

  const dataDexTradingSignal = dataDexTradingSignalQuery.isFetching
    ? [...(Array(8).keys() as any)]
    : dataDexTradingSignalQuery?.data?.data?.data || []

  const total = dataDexTradingSignalQuery?.data?.data?.metadata?.total || 0

  const handleActiveTab = (value: TabProps) => {
    setActiveTab(value.tab)
    setType(value.type)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-neutral-02 text-[32px] leading-[48px] font-normal">
        Trading Signal By AI
      </p>
      <div className="flex overflow-y-auto gap-4 self-stretch py-2 font-medium tracking-tight leading-8 text-center text-neutral-03 max-md:flex-wrap max-md:pr-5">
        {tabsSignal.map((item, index) => (
          <div
            key={index}
            onClick={() => handleActiveTab(item)}
            className={cn(
              'cursor-pointer whitespace-nowrap transition-all duration-300 justify-center px-4 py-2 rounded-[20px] !text-xl not-italic font-medium leading-8',
              activeTab === item.tab
                ? 'tab-find-gems text-white border border-solid border-white/10'
                : 'bg-neutral-09/70 text-neutral-400 border border-solid border-transparent',
            )}
          >
            {item.tab}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
        {dataDexTradingSignal?.map((item, index) => (
          <Card
            key={index}
            item={item}
            loading={dataDexTradingSignalQuery.isFetching}
          />
        ))}
      </div>
      <PaginationTable
        className={cn(
          'mt-4',
          dataDexTradingSignalQuery.isFetching ? 'hidden' : 'visible',
        )}
        currentPage={page}
        updatePage={(page: number) => setPage(page)}
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </div>
  )
}

const Card = ({
  item,
  loading,
}: {
  item: DexTradingSignalInfo
  loading?: boolean
}) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'new_listing_buy':
        return <IconTarget />
      case 'top_smart_money_buy':
        return <IconBarChart />
      case 'unusual_buy':
        return <IconScale />
      default:
        return <IconTarget />
    }
  }

  return (
    <div className="p-6 flex flex-col gap-4 bg-[#1e1e1e80] backdrop-blur-[32px] border border-white/10 rounded-2xl w-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {loading ? (
            <SkeletonRound />
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
                <Skeleton />
              ) : (
                <Link
                  href={`/smartmoney-onchain/token-explorer/${item.address}`}
                  passHref
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    className="flex items-center gap-1 font-bold text-xl text-neutral-400 hover:underline"
                  >
                    <p className="text-neutral-200">{item.symbol}</p>
                    <p className="w-[200px] truncate">{item.name}</p>
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
                  <p className="text-base text-neutral-400 text-medium">
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
          <div className="bg-white/5 rounded-full p-1">
            {renderIcon(item.dex_trade_signal_type)}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]">Entry</p>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <p className="bg-sol-gradient bg-clip-text text-transparent text-xl font-medium">
              {renderPrice(item.entry)}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]">Target</p>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <p className="bg-sol-gradient bg-clip-text text-transparent text-xl font-medium flex items-center">
              {renderPrice(item.target_min)}-{renderPrice(item.target_max)}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]"># of Wallet</p>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <DialogUsers
              users={item.users as SmartMoneyTradeWithTokenResponse[]}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <Skeleton />
          ) : (
            <p className="text-xl font-normal text-[#6F767E]">Ai Score</p>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <p className="text-neutral-200 text-xl font-medium">
              {item.ai_score}/100
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="w-full overflow-hidden rounded-[20px]">
          <Skeleton width={450} height={40} rx={20} ry={20} />
        </div>
      ) : (
        <DialogAiAnalysis item={item} />
      )}
    </div>
  )
}
