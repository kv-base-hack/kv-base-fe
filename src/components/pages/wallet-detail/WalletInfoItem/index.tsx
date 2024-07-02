import { chainAtom } from '@/atom/chain'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Skeleton from '@/components/common/Skeleton'
import { ChevronDown } from '@/components/shared/icons/ChevronDown'
import { ChevronUp } from '@/components/shared/icons/ChevronUp'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { cn } from '@/lib/utils'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { useAtomValue } from 'jotai'
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
      {icon}
      <div>{name}</div>
    </div>
  )
}

type WalletInfoItemProps = {
  imgUrl?: string
  symbol?: string
  name?: string
  priceChangeH24?: number
  usdPrice?: number
  avg_price?: number
  spent?: number
  roi?: number
  pnl?: number
  address?: string
  price?: number
  loading?: boolean
}

export const WalletInfoItem: React.FC<WalletInfoItemProps> = ({
  imgUrl,
  symbol,
  name,
  priceChangeH24,
  usdPrice,
  avg_price,
  spent,
  roi,
  pnl,
  address,
  price,
  loading,
}) => {
  const CHAIN = useAtomValue(chainAtom)

  return (
    <div className="flex flex-col self-stretch mt-2 w-full">
      <div className="flex flex-col gap-2 mt-2 w-full p-3 border border-solid rounded-xl border-[#EFEFEF]">
        <div className="flex gap-2.5 whitespace-nowrap">
          {loading ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : (
            <ImageToken imgUrl={imgUrl} symbol={symbol} className="w-8 h-8" />
          )}
          <div className="flex flex-col flex-1 justify-center">
            {loading ? (
              <Skeleton className="h-4 w-[120px] rounded-full overflow-hidden" />
            ) : (
              <Link
                href={`/smartmoney-onchain/token-explorer/${address}?chain=${CHAIN}`}
                className="hover:underline"
              >
                <div className="flex gap-1 pr-5 overflow-hidden">
                  <div className="text-base font-medium tracking-tight leading-6 text-neutral-07 max-w-[100px] truncate">
                    {symbol}
                  </div>
                  <div className="text-sm font-semibold tracking-normal leading-6 text-[#A7ACB0] max-w-[100px] truncate">
                    {name}
                  </div>
                </div>
              </Link>
            )}
            {loading ? (
              <Skeleton className="h-4 w-[120px] rounded-full overflow-hidden mt-1" />
            ) : (
              <div className="flex items-center gap-1">
                <div className="text-neutral-07 text-sm font-semibold">
                  {usdPrice ? renderPrice(usdPrice) : '-'}
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
                    {priceChangeH24 && priceChangeH24 > 0 ? (
                      <ChevronUp />
                    ) : priceChangeH24 === 0 ? (
                      ''
                    ) : (
                      <ChevronDown />
                    )}
                    {priceChangeH24}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between whitespace-nowrap">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              {loading ? (
                <Skeleton className="w-20 h-4 rounded-full" />
              ) : (
                'Spent'
              )}
            </div>
            <div className="text-base font-semibold tracking-normal leading-6 text-neutral-07">
              {loading ? (
                <Skeleton className="w-20 h-4 rounded-full" />
              ) : spent ? (
                `$${nFormatter(spent)}`
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              {loading ? (
                <Skeleton className="w-20 h-4 rounded-full" />
              ) : (
                'Avg Price'
              )}
            </div>
            {loading ? (
              <div className="text-sm font-semibold tracking-normal leading-6 text-neutral-07">
                <Skeleton className="w-20 h-4 rounded-full" />
              </div>
            ) : (
              <div className="text-base font-semibold tracking-normal leading-6 text-neutral-07">
                {avg_price ? renderPrice(avg_price) : '-'}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              {loading ? <Skeleton className="w-20 h-4 rounded-full" /> : 'ROI'}
            </div>
            <div
              className={cn(
                'text-base font-semibold tracking-normal leading-6 ',
                (roi as number) > 0
                  ? 'text-emerald-400'
                  : (roi as number) < 0
                  ? 'text-error-500'
                  : 'text-neutral-07',
              )}
            >
              {loading ? (
                <Skeleton className="w-20 h-4 rounded-full" />
              ) : roi ? (
                (roi < 0.001 && roi > 0) || (roi > -0.001 && roi < 0) ? (
                  numeral(roi).format('0,0.[0000]%')
                ) : (
                  `${roi?.toFixed(2)}%`
                )
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium leading-5 text-neutral-400">
              {loading ? <Skeleton className="w-20 h-4 rounded-full" /> : 'PnL'}
            </div>
            <div
              className={cn(
                'text-base font-semibold tracking-normal leading-6 ',
                (pnl as number) > 0
                  ? 'text-emerald-400'
                  : (pnl as number) < 0
                  ? 'text-error-500'
                  : 'text-neutral-07',
              )}
            >
              {loading ? (
                <Skeleton className="w-20 h-4 rounded-full" />
              ) : pnl ? (
                `$${nFormatter(pnl)}`
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
