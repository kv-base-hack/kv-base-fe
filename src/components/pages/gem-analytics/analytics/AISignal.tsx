import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import AISignalIcon from '@/components/shared/icons/gem-analytics/AISignalIcon'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import { useQuery } from '@tanstack/react-query'
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

  return (
    <WrapTable
      className="p-4"
      title={
        <div className="text-[15px] not-italic font-bold leading-6 tracking-[-0.15px]">
          AI Signal
        </div>
      }
      childHeader={
        <Link
          href={'/trading-signal'}
          className="text-base not-italic font-medium leading-6  bg-gradient-to-r from-[#9945FF] to-[#14F195] inline-block text-transparent bg-clip-text"
        >
          See more
        </Link>
      }
      icon={<AISignalIcon />}
    >
      <div className="flex flex-col gap-4 mt-4">
        {dataDexTradingSignalQuery.isFetching
          ? [1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center justify-start gap-2"
              >
                <div className="w-3 h-3 bg-neutral-500 rounded-lg"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-neutral-500 rounded-full"></div>
                  <div className="bg-neutral-500 rounded-lg w-[40px] h-5"></div>
                </div>
                <div className="bg-neutral-500 rounded-lg w-full h-5"></div>
              </div>
            ))
          : dataDexTradingSignal?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center w-1/5">
                  <div className="w-3 text-[#D6D9DC] text-[13px] not-italic font-normal leading-4 tracking-[-0.13px]">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                      <ImageToken
                        imgUrl={item.image_url}
                        symbol={item?.symbol}
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="text-[#D6D9DC] text-right text-[13px] not-italic font-normal leading-4 tracking-[-0.13px] truncate">
                      {item?.symbol}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 w-1/5">
                  <div className="text-neutral-500 text-right text-xs not-italic font-normal leading-4 tracking-[-0.12px]">
                    Strategy
                  </div>
                  <div className="text-[#B5E4CA] text-right text-xs not-italic font-medium leading-4 tracking-[-0.12px]">
                    {item.name}
                  </div>
                </div>
                <div className="flex items-center gap-1 w-1/4">
                  <div className="text-neutral-500 text-right text-xs not-italic font-normal leading-4 tracking-[-0.12px]">
                    Entry
                  </div>
                  <div className="text-[#B5E4CA] text-right text-xs not-italic font-medium leading-4 tracking-[-0.12px]">
                    {formatPriceNumber(item.entry)}
                  </div>
                </div>
                <div className="flex items-center gap-1 w-1/6">
                  <div className="text-neutral-500 text-right text-xs not-italic font-normal leading-4 tracking-[-0.12px]">
                    Price
                  </div>
                  <div className="text-[#B5E4CA] text-right text-xs not-italic font-medium leading-4 tracking-[-0.12px]">
                    {formatPriceNumber(item.current_price)}
                  </div>
                </div>
                <div className="flex items-center gap-1 w-1/6">
                  <div className="text-neutral-500 text-right text-xs not-italic font-normal leading-4 tracking-[-0.12px]">
                    Created
                  </div>
                  <div className="text-[#B5E4CA] text-right text-xs not-italic font-medium leading-4 tracking-[-0.12px]">
                    {moment(item.signal_time).fromNow()}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </WrapTable>
  )
}
