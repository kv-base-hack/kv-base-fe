import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import Image from 'next/image'
import numeral from 'numeral'
import { ImageToken } from '../common/Image/ImageToken'
import { formatPriceNumber } from '@/utils/formatPriceNumber'

type CardInfoProps = {
  image_url: string
  symbol: string
  current_price: number
  price_change_24h: number
  pnl: number
  roi: number
  realized_percent: number
  avg_price: number
  fdv: number
  liquidity: number
}

export const CardInfo = ({
  image_url,
  symbol,
  current_price,
  price_change_24h,
  pnl,
  roi,
  realized_percent,
  avg_price,
  fdv,
  liquidity,
}: CardInfoProps) => {
  return (
    <div className="custom-tooltip flex min-w-[434px] flex-col gap-5 rounded-[20px] bg-[#1F1C25] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-success-500"></div>
          <ImageToken imgUrl={image_url} symbol={symbol} className="h-6 w-6" />
          <div className="ml-2 text-xl font-semibold text-white">{symbol}</div>
        </div>
        <div className="text-2xl font-normal text-neutral-200">
          {renderPrice(current_price)}
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-2xl font-normal',
            price_change_24h > 0
              ? 'text-success-500'
              : price_change_24h < 0
                ? 'text-error-500'
                : 'text-neutral-01',
          )}
        >
          {price_change_24h > 0 ? (
            <PercentUpIcon className="mb-1 h-6 w-6" />
          ) : price_change_24h < 0 ? (
            <PercentDownIcon className="mb-1 h-6 w-6" />
          ) : null}
          {price_change_24h !== 0 && price_change_24h > 0 ? '+' : ''}
          {price_change_24h}%
        </div>
      </div>
      <div className="flex items-center gap-[54px]">
        <div className="flex w-1/2 flex-col gap-2">
          {/* PnL */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-normal leading-6 text-[#A7ACB0]">
              PnL
            </p>
            <p
              className={cn(
                'text-[15px] font-medium leading-6',
                pnl > 0
                  ? 'text-success-500'
                  : pnl < 0
                    ? 'text-error-500'
                    : 'text-neutral-01',
              )}
            >
              {pnl > 0 ? '+' : ''}
              {pnl ? nFormatter(pnl) : '-'}
            </p>
          </div>
          {/* Avg ROI */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-normal leading-6 text-[#A7ACB0]">
              Avg ROI
            </p>
            <p
              className={cn(
                'text-[15px] font-medium leading-6',
                roi > 0
                  ? 'text-success-500'
                  : roi < 0
                    ? 'text-error-500'
                    : 'text-neutral-01',
              )}
            >
              {roi > 0 ? '+' : ''}
              {roi ? <>{numeral(roi).format('0,0.[00]')}%</> : '-'}
            </p>
          </div>
          {/* Realized */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-medium leading-6 text-[#A7ACB0]">
              Realized %
            </p>
            <p className="text-[15px] font-medium leading-6 text-neutral-01">
              {realized_percent ? <>{realized_percent.toFixed(2)}%</> : '-'}
            </p>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          {/* Avg Price */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-medium leading-6 text-[#A7ACB0]">
              Avg Price
            </p>
            <p className="text-[15px] font-medium leading-6 text-neutral-01">
              {renderPrice(avg_price)}
            </p>
          </div>

          {/* FDV */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-medium leading-6 text-[#A7ACB0]">
              FDV
            </p>
            <p className="text-[15px] font-medium leading-6 text-neutral-01">
              {fdv ? nFormatter(fdv) : '-'}
            </p>
          </div>

          {/* liquidity */}
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-medium leading-6 text-[#A7ACB0]">
              Liquidity
            </p>
            <p className="text-[15px] font-medium leading-6 text-neutral-01">
              {liquidity ? nFormatter(liquidity) : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
