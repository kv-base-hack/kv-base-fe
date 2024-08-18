import { cn } from '@/lib/utils'
import { TopTokenBuy } from '@/components/common/TopCoin/TopTokenBuy'
import { TopTokenSell } from '@/components/common/TopCoin/TopTokenSell'
import { SMNewListingBuys } from './SMNewListinBuys'
import { FreshUnusualBuy } from './FreshUnusualBuy'

type TopCoinProps = {
  className?: string
  width: number
  tab: string
}

export const TopCoin: React.FC<TopCoinProps> = ({ className, width, tab }) => {
  return (
    <div className={cn('self-stretch pb-4', className)}>
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        {width > 425 ||
        (width <= 425 && tab === 'cex_withdraw') ||
        tab === 'cex_withdraw_and_deposit' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <SMNewListingBuys />
          </div>
        ) : null}
        {width > 425 ||
        (width <= 425 && tab === 'cex_deposit') ||
        tab === 'cex_withdraw_and_deposit' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <FreshUnusualBuy />
          </div>
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-4 md:mt-4 lg:flex-row">
        {width > 425 ||
        (width <= 425 && tab === 'sm_top_buys') ||
        tab === 'sm_top_buys_and_sells' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <TopTokenBuy />
          </div>
        ) : null}
        {width > 425 ||
        (width <= 425 && tab === 'sm_top_sells') ||
        tab === 'sm_top_buys_and_sells' ? (
          <div className="flex w-full flex-col lg:w-1/2">
            <TopTokenSell />
          </div>
        ) : null}
      </div>
    </div>
  )
}
