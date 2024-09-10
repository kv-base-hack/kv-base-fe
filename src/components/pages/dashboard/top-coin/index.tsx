'use client'

import { cn } from '@/lib/utils'
import { FreshUnusualBuy } from './fresh-unusual-buy'
import { SMNewListingBuys } from './sm-new-listing-buys'
import { TopTokenBuy } from './top-token-buy'
import { FirstTimeBuy } from './fisrt-time-buy'

type TopCoinProps = {
  className?: string
  width: number
  tab: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const TopCoin: React.FC<TopCoinProps> = ({
  className,
  width,
  tab,
  searchParams,
}) => {
  return (
    <div className={cn('self-stretch pb-4', className)}>
      <div className="flex w-full flex-col gap-2 lg:flex-row">
        {width > 425 ||
        (width <= 425 && tab === 'cex_deposit') ||
        tab === 'cex_withdraw_and_deposit' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <FreshUnusualBuy searchParams={searchParams} />
          </div>
        ) : null}
        {width > 425 ||
        (width <= 425 && tab === 'cex_withdraw') ||
        tab === 'cex_withdraw_and_deposit' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <SMNewListingBuys searchParams={searchParams} />
          </div>
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-2 md:mt-2 lg:flex-row">
        {width > 425 ||
        (width <= 425 && tab === 'sm_top_buys') ||
        tab === 'sm_top_buys_and_sells' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <TopTokenBuy searchParams={searchParams} />
          </div>
        ) : null}
        {width > 425 ||
        (width <= 425 && tab === 'sm_top_sells') ||
        tab === 'sm_top_buys_and_sells' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <FirstTimeBuy searchParams={searchParams} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
