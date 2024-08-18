import { ImageToken } from '@/components/common/Image/ImageToken'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import numeral from 'numeral'
import CircularProgress from '../CircularProgress'
import { checkScoreToken } from '@/utils/checkScoreToken'

type CardInfoTopTokenProps = {
  token: any
  type: 'hold' | 'buy'
  view: 'token' | 'chart'
  color?: string
}

export const CardInfoTopToken = ({
  token,
  type,
  view,
  color = '#00FFF0',
}: CardInfoTopTokenProps) => {
  const {
    image_url,
    symbol,
    score,
    avg_price,
    avg_cost,
    hold_in_usdt,
    pnl,
    realized_percent,
    number_of_smart_money_hold,
    number_of_smart_money,
    percent,
    price_change_24h,
    price_percent_change_24h,
    current_price,
    realized,
  } = token

  const percentChange = price_percent_change_24h || price_change_24h

  return (
    <div className="custom-tooltip font-AoenikPro shadow-tooltip flex min-w-[173px] flex-col gap-2 rounded-[20px] border border-solid border-white/10 bg-black/25 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {view === 'chart' ? (
          <div className="flex items-center gap-3">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
            <div className="text-base font-medium text-neutral-200">
              {numeral(percent).format('0,0.[00]')}%
            </div>
            <div className="flex items-center gap-3">
              <ImageToken imgUrl={image_url} symbol={symbol} />
              <div className="text-xl font-semibold text-white underline">
                {symbol}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <ImageToken imgUrl={image_url} symbol={symbol} />
            <div className="text-base font-semibold text-white underline">
              {symbol}
            </div>
          </div>
        )}
      </div>

      {/* Price % Percent Change */}

      <div className="flex items-center justify-between text-base font-medium">
        <p className="text-neutral-200">{renderPrice(current_price)}</p>
        <div>
          <div className="flex items-center gap-1 text-base">
            {percentChange > 0 ? (
              <PercentUpIcon />
            ) : percentChange < 0 ? (
              <PercentDownIcon />
            ) : null}
            <div
              className={cn(
                'font-medium',
                percentChange > 0
                  ? 'text-core'
                  : percentChange < 0
                    ? 'text-error-500'
                    : 'text-neutral-100',
              )}
            >
              {numeral(percentChange).format('0,0.[00]')}%
            </div>
          </div>
        </div>
      </div>

      {/* Score  */}
      <div className="flex gap-2">
        <div>
          <CircularProgress
            percentage={parseFloat(
              numeral(score?.toString()).format('0,0.[00]'),
            )}
            size={32}
            fontSize={10}
          />
        </div>
        <div
          style={{
            backgroundColor: checkScoreToken(score).backgroundColor,
            color: checkScoreToken(score).color,
          }}
          className="flex w-full items-center justify-center rounded-lg px-2 py-0.5 text-sm font-medium uppercase"
        >
          {checkScoreToken(score).text}
        </div>
      </div>

      <div className="flex flex-col gap-2 whitespace-nowrap">
        {/* hold value */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-normal leading-6 text-neutral-300">
            Total Hold Value
          </p>
          <p className="text-sm font-medium leading-6 text-neutral-100">
            {hold_in_usdt ? `$${nFormatter(hold_in_usdt)}` : '-'}
          </p>
        </div>
        {/* Avg entry */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-normal leading-6 text-neutral-300">
            Avg Entry
          </p>
          <p className="text-sm font-medium leading-6 text-neutral-100">
            ${nFormatter(avg_price || avg_cost)}
          </p>
        </div>
        {/* ST */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium leading-6 text-neutral-300">
            {type === 'hold' ? '# ST Hold' : '# ST Buy'}
          </p>
          <p className="text-sm font-medium leading-6 text-neutral-100 underline">
            {number_of_smart_money_hold || number_of_smart_money}
          </p>
        </div>

        {/* Realized % */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium leading-6 text-neutral-300">
            Realized %
          </p>
          <p className="text-sm font-medium leading-6 text-neutral-100">
            {numeral(realized_percent || realized).format('0,0.[00]')}%
          </p>
        </div>

        {/* Total Profit */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium leading-6 text-neutral-300">
            Total Profit
          </p>
          <p
            className={cn(
              'text-sm font-medium leading-6',
              pnl > 0
                ? 'text-core'
                : pnl < 0
                  ? 'text-error-500'
                  : 'text-neutral-100',
            )}
          >
            {pnl ? `$${nFormatter(pnl)}` : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}
