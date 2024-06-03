import { ImageToken } from '@/components/common/Image/ImageToken'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { cn } from '@/lib/utils'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import Link from 'next/link'
import numeral from 'numeral'

type WalletInfoItemTitleProps = {
  icon?: JSX.Element
  name?: string
}

export const WalletInfoItemTitle: React.FC<WalletInfoItemTitleProps> = ({
  icon,
  name,
}) => {
  return (
    <div className="flex gap-3 items-center justify-start text-xl font-semibold leading-6 text-neutral-07">
      <div className="w-6 h-6">{icon}</div>
      <div>{name}</div>
    </div>
  )
}

type WalletInfoItemProps = {
  imgUrl?: string
  symbol?: string
  chain?: string
  priceChangeH24?: number
  usdPrice?: number
  avg_price?: number
  spent?: number
  roi?: number
  pnl?: number
  address?: string
  price?: number
}

export const WalletInfoItem: React.FC<WalletInfoItemProps> = ({
  imgUrl,
  symbol,
  chain,
  priceChangeH24,
  usdPrice,
  avg_price,
  spent,
  roi,
  pnl,
  address,
  price,
}) => {
  return (
    <div className="flex flex-col self-stretch mt-4">
      <div className="flex flex-col mt-2 w-full p-3 border border-solid rounded-xl border-[#EFEFEF]">
        <div className="flex gap-2.5 whitespace-nowrap">
          <ImageToken imgUrl={imgUrl} symbol={symbol} className="w-8 h-8" />
          <div className="flex flex-col flex-1 justify-center">
            <Link
              href={`/smartmoney-onchain/token-explorer/${address}`}
              className="hover:underline"
            >
              <div className="flex gap-1 pr-5">
                <div className="text-base font-medium tracking-tight leading-6 text-neutral-07">
                  {symbol}
                </div>
                <div className="text-sm font-semibold tracking-normal leading-6 text-[#A7ACB0]">
                  {chain}
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              <div className="text-neutral-07 text-sm font-semibold">
                {renderPrice(price as number)}
              </div>
              <div className="flex gap-2 pr-5 text-sm tracking-normal leading-6">
                <div
                  className={cn(
                    'flex items-center justify-start leading-[140%]',
                    priceChangeH24 && priceChangeH24 > 0
                      ? 'text-success-500'
                      : 'text-error-500',
                    priceChangeH24 === 0 && 'text-neutral-07',
                  )}
                >
                  {priceChangeH24 &&
                  priceChangeH24 !== 0 &&
                  priceChangeH24 > 0 ? (
                    <PercentUpIcon />
                  ) : (
                    <PercentDownIcon />
                  )}
                  {priceChangeH24?.toFixed(2)}%
                </div>
                <div className="text-neutral-50">
                  {formatPriceNumber(usdPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between whitespace-nowrap">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              Spent
            </div>
            <div className="mt-1 text-base font-semibold tracking-normal leading-6 text-neutral-07">
              {spent ? `${nFormatter(spent)}` : '-'}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              Avg Price
            </div>
            <div className="text-sm font-semibold tracking-normal leading-6 text-neutral-07">
              {avg_price ? `$${nFormatter(avg_price)}` : '-'}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              ROI
            </div>
            <div className="mt-1 text-base font-semibold tracking-normal leading-6 text-emerald-400">
              {roi
                ? (roi < 0.001 && roi > 0) || (roi > -0.001 && roi < 0)
                  ? numeral(roi).format('0,0.[0000]%')
                  : `${roi?.toFixed(2)}%`
                : '-'}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              PnL
            </div>
            <div className="mt-1 text-base font-semibold tracking-normal leading-6 text-emerald-400">
              {pnl ? `${nFormatter(pnl)}` : '-'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
