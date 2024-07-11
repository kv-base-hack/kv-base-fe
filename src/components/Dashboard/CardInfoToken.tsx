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
    <div className="custom-tooltip p-6 rounded-[20px] bg-[#1F1C25] flex flex-col gap-5 min-w-[434px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-success-500"></div>
          <ImageToken imgUrl={image_url} symbol={symbol} className="w-6 h-6" />
          <div className="text-xl text-white font-semibold ml-2">{symbol}</div>
        </div>
        <div className="text-neutral-200 text-2xl font-normal">
          {renderPrice(current_price)}
        </div>
        <div
          className={cn(
            'text-2xl font-normal flex items-center gap-1',
            price_change_24h > 0
              ? 'text-success-500'
              : price_change_24h < 0
              ? 'text-error-500'
              : 'text-neutral-01',
          )}
        >
          {price_change_24h > 0 ? (
            <PercentUpIcon className="w-6 h-6 mb-1" />
          ) : price_change_24h < 0 ? (
            <PercentDownIcon className="w-6 h-6 mb-1" />
          ) : null}
          {price_change_24h !== 0 && price_change_24h > 0 ? '+' : ''}
          {price_change_24h}%
        </div>
      </div>
      <div className="flex items-center gap-[54px]">
        <div className="flex flex-col gap-2 w-1/2">
          {/* PnL */}
          <div className="flex items-center justify-between">
            <p className="text-[#A7ACB0] text-[15px] leading-6 font-normal">
              PnL
            </p>
            <p
              className={cn(
                'text-[15px] leading-6 font-medium',
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
            <p className="text-[#A7ACB0] text-[15px] leading-6 font-normal">
              Avg ROI
            </p>
            <p
              className={cn(
                'text-[15px] leading-6 font-medium',
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
            <p className="text-[#A7ACB0] text-[15px] leading-6 font-medium">
              Realized %
            </p>
            <p className="text-[15px] leading-6 font-medium text-neutral-01">
              {realized_percent ? <>{realized_percent.toFixed(2)}%</> : '-'}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          {/* Avg Price */}
          <div className="flex items-center justify-between">
            <p className="text-[#A7ACB0] text-[15px] leading-6 font-medium">
              Avg Price
            </p>
            <p className="text-[15px] leading-6 font-medium text-neutral-01">
              {renderPrice(avg_price)}
            </p>
          </div>

          {/* FDV */}
          <div className="flex items-center justify-between">
            <p className="text-[#A7ACB0] text-[15px] leading-6 font-medium">
              FDV
            </p>
            <p className="text-[15px] leading-6 font-medium text-neutral-01">
              {fdv ? nFormatter(fdv) : '-'}
            </p>
          </div>

          {/* liquidity */}
          <div className="flex items-center justify-between">
            <p className="text-[#A7ACB0] text-[15px] leading-6 font-medium">
              Liquidity
            </p>
            <p className="text-[15px] leading-6 font-medium text-neutral-01">
              {liquidity ? nFormatter(liquidity) : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
