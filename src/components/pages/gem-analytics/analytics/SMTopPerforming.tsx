import { chainAtom } from '@/atom/chain'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import SMNewPerformingTokenIcon from '@/components/shared/icons/gem-analytics/SMNewPerformingTokenIcon'
import { cn } from '@/lib/utils'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import { useAtomValue } from 'jotai'

export const GemAnalyticsSMTopPerformingToken = () => {
  const CHAIN = useAtomValue(chainAtom)
  //
  const topTokenProfitQuery = useTopTokenProfitQuery({
    limit: 3,
    start: 1,
    chain: CHAIN,
    duration: '24h',
    sort_by: '',
  })

  return (
    <WrapTable
      className="p-4"
      title={
        <div className="text-[15px] not-italic font-bold leading-6 tracking-[-0.15px]">
          SM Top Performing
        </div>
      }
      icon={<SMNewPerformingTokenIcon />}
    >
      <div className="flex flex-col gap-4 mt-4">
        {topTokenProfitQuery.isFetching
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
          : topTokenProfitQuery.data?.data?.top_smart_money_token_profit?.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
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
                  <div className="w-full">
                    {item.price_change_24h ? (
                      <div
                        className={cn(
                          'flex items-center justify-end text-end text-sm not-italic font-normal leading-[140%]',
                          item.price_change_24h > 0
                            ? 'text-success-500'
                            : 'text-error-500',
                          item.price_change_24h === 0 && 'text-neutral-dark-03',
                        )}
                      >
                        {item.price_change_24h !== 0 &&
                        item.price_change_24h > 0 ? (
                          <PercentUpIcon />
                        ) : (
                          <PercentDownIcon />
                        )}
                        {item.price_change_24h > 0 ? '+' : ''}
                        {item.price_change_24h.toFixed(2)}%
                      </div>
                    ) : (
                      <div className="text-left w-full">-</div>
                    )}
                  </div>
                </div>
              ),
            )}
      </div>
    </WrapTable>
  )
}
