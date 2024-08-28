import { ImageToken } from '@/components/common/Image/ImageToken'
import SkeletonChart from '@/components/common/Skeleton/SkeletonChart'
import SkeletonDefault from '@/components/common/Skeleton/SkeletonDefault'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { cn } from '@/lib/utils'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
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
    <div className="flex w-full justify-start gap-3 text-base leading-6 text-white">
      <div className="shrink-0">{icon}</div>
      <div className="font-medium">{name}</div>
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
  volume?: number
  roi?: number
  pnl?: number
  address?: string
  loading?: boolean
}

export const WalletInfoItem: React.FC<WalletInfoItemProps> = ({
  imgUrl,
  symbol,
  chain,
  priceChangeH24,
  usdPrice,
  avg_price,
  volume,
  roi,
  pnl,
  address,
  loading,
}) => {
  return (
    <div className="flex flex-col self-stretch">
      <div className="flex gap-4 whitespace-nowrap">
        {loading ? (
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <SkeletonDefault />
          </div>
        ) : (
          <Link
            href={`/smartmoney-onchain/token-explorer/${address}`}
            className="hover:underline"
          >
            <ImageToken imgUrl={imgUrl} symbol={symbol} className="h-8 w-8" />
          </Link>
        )}
        <div className="flex flex-1 flex-col justify-center gap-1">
          {loading ? (
            <div className="h-4 w-28 overflow-hidden rounded-full">
              <SkeletonDefault />
            </div>
          ) : (
            <Link
              href={`/smartmoney-onchain/token-explorer/${address}`}
              className="hover:underline"
            >
              <div className="flex gap-1 pr-5">
                <div className="text-sm font-medium leading-6 tracking-tight text-purple-50 underline">
                  {symbol}
                </div>
                {loading ? (
                  <div className="h-4 w-28 overflow-hidden rounded-full">
                    <SkeletonDefault />
                  </div>
                ) : (
                  <div className="flex gap-2 pr-5 text-sm font-medium leading-6 tracking-normal">
                    <div
                      className={cn(
                        'flex items-center justify-start leading-[140%]',
                        priceChangeH24 && (priceChangeH24 as number) > 0
                          ? 'text-green'
                          : 'text-error-500',
                        priceChangeH24 === 0 && 'text-neutral-dark-03',
                      )}
                    >
                      {priceChangeH24 &&
                      priceChangeH24 !== 0 &&
                      (priceChangeH24 as number) > 0 ? (
                        <PercentUpIcon />
                      ) : (
                        <PercentDownIcon />
                      )}
                      {priceChangeH24?.toFixed(2)}%
                    </div>
                    <div className="text-neutral-50">
                      {renderPrice(usdPrice as number)}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-3 flex w-full flex-col rounded-xl border border-solid border-white border-opacity-10 p-2">
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col justify-center">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              Avg Entry/Vol Buy
            </div>
            <div className="mt-1 text-base font-medium leading-6 tracking-normal text-neutral-50">
              {loading ? (
                <div className="h-4 w-28 overflow-hidden rounded-full">
                  <SkeletonDefault />
                </div>
              ) : avg_price ? (
                formatPriceNumber(avg_price)
              ) : (
                '-'
              )}
            </div>
            <div
              className={cn(
                'mt-1 flex justify-start text-base font-medium leading-6 tracking-normal',
                (volume as number) >= 0 ? 'text-green' : 'text-error-500',
              )}
            >
              {loading ? (
                <div className="h-4 w-28 overflow-hidden rounded-full">
                  <SkeletonDefault />
                </div>
              ) : volume ? (
                formatPriceNumber(volume)
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col whitespace-nowrap text-right">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              Total Profit/Avg ROI
            </div>
            <div className="mt-1 flex w-full justify-end text-base font-medium leading-6 tracking-normal text-neutral-50">
              {loading ? (
                <div className="h-4 w-28 overflow-hidden rounded-full">
                  <SkeletonDefault />
                </div>
              ) : pnl ? (
                formatPriceNumber(pnl)
              ) : (
                '-'
              )}
            </div>
            <div
              className={cn(
                'mt-1 flex justify-end text-base font-medium leading-6 tracking-normal',
                (roi as number) >= 0 ? 'text-green' : 'text-error-500',
              )}
            >
              {loading ? (
                <div className="h-4 w-28 overflow-hidden rounded-full">
                  <SkeletonDefault />
                </div>
              ) : roi ? (
                formatPriceNumber(roi)
              ) : (
                '-'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
