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
        <div className="text-[15px] font-bold not-italic leading-6 tracking-[-0.15px]">
          SM Top Performing
        </div>
      }
      icon={<SMNewPerformingTokenIcon />}
    >
      <div className="mt-4 flex flex-col gap-4">
        {topTokenProfitQuery.isFetching
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
          : topTokenProfitQuery.data?.data?.top_smart_money_token_profit?.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
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
                  <div className="w-full">
                    {item.price_change_24h ? (
                      <div
                        className={cn(
                          'flex items-center justify-end text-end font-normal leading-[140%]',
                          item.price_change_24h > 0
                            ? 'text-success-500'
                            : 'text-error-500',
                          item.price_change_24h === 0 && 'text-neutral-07',
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
                      <div className="w-full text-left">-</div>
                    )}
                  </div>
                </div>
              ),
            )}
      </div>
    </WrapTable>
  )
}
