import { chainAtom } from '@/atom/chain'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import AISignalIcon from '@/components/shared/icons/gem-analytics/AISignalIcon'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import moment from 'moment'
import Link from 'next/link'

export const GemAnalyticsAISignal = () => {
  //
  const dataDexTradingSignalQuery = useQuery(
    useGetDexTradingSignalQuery({
      limit: 3,
      start: 1,
    }),
  )

  const dataDexTradingSignal = dataDexTradingSignalQuery?.data?.data?.data || []
  const CHAIN = useAtomValue(chainAtom)

  return (
    <WrapTable
      className="p-4"
      title={
        <div className="text-[15px] font-bold not-italic leading-6 tracking-[-0.15px]">
          AI Signal
        </div>
      }
      childHeader={
        <Link
          href={`/trading-signal?chain=${CHAIN}`}
          className="inline-block bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-base font-medium not-italic leading-6 text-transparent"
        >
          See more
        </Link>
      }
      icon={<AISignalIcon />}
    >
      <div className="mt-4 flex flex-col gap-4">
        {dataDexTradingSignalQuery.isFetching
          ? [1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center justify-start gap-2"
              >
                <div className="h-3 w-3 rounded-lg bg-neutral-500"></div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-neutral-500"></div>
                  <div className="h-5 w-[40px] rounded-lg bg-neutral-500"></div>
                </div>
                <div className="h-5 w-full rounded-lg bg-neutral-500"></div>
              </div>
            ))
          : dataDexTradingSignal?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex w-1/5 items-center">
                  <div className="w-3 text-[13px] font-normal not-italic leading-4 tracking-[-0.13px] text-[#D6D9DC]">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6">
                      <ImageToken
                        imgUrl={item.image_url}
                        symbol={item?.symbol}
                        className="h-6 w-6"
                      />
                    </div>
                    <div className="truncate text-right text-[13px] font-normal not-italic leading-4 tracking-[-0.13px] text-[#D6D9DC]">
                      {item?.symbol}
                    </div>
                  </div>
                </div>
                <div className="flex w-1/5 items-center gap-1">
                  <div className="text-right text-xs font-normal not-italic leading-4 tracking-[-0.12px] text-neutral-500">
                    Strategy
                  </div>
                  <div className="text-right text-xs font-medium not-italic leading-4 tracking-[-0.12px] text-[#B5E4CA]">
                    {item.name}
                  </div>
                </div>
                <div className="flex w-1/4 items-center gap-1">
                  <div className="text-right text-xs font-normal not-italic leading-4 tracking-[-0.12px] text-neutral-500">
                    Entry
                  </div>
                  <div className="text-right text-xs font-medium not-italic leading-4 tracking-[-0.12px] text-[#B5E4CA]">
                    {formatPriceNumber(item.entry)}
                  </div>
                </div>
                <div className="flex w-1/6 items-center gap-1">
                  <div className="text-right text-xs font-normal not-italic leading-4 tracking-[-0.12px] text-neutral-500">
                    Price
                  </div>
                  <div className="text-right text-xs font-medium not-italic leading-4 tracking-[-0.12px] text-[#B5E4CA]">
                    {formatPriceNumber(item.current_price)}
                  </div>
                </div>
                <div className="flex w-1/6 items-center gap-1">
                  <div className="text-right text-xs font-normal not-italic leading-4 tracking-[-0.12px] text-neutral-500">
                    Created
                  </div>
                  <div className="text-right text-xs font-medium not-italic leading-4 tracking-[-0.12px] text-[#B5E4CA]">
                    {moment(item.signal_time).fromNow()}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </WrapTable>
  )
}
