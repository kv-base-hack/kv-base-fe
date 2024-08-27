import Link from 'next/link'
import { ImageToken } from '../Image/ImageToken'
import { renderPrice } from '@/lib/utils/renderPrice'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import numeral from 'numeral'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import React, { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const Info = ({
  title,
  children,
  number,
}: {
  title: string
  children?: ReactNode
  number?: number
}) => {
  return (
    <div className="flex items-center justify-between text-xs">
      <p className="font-normal text-[#BDBDBD]">{title}</p>
      {number ? (
        <span
          className={cn(
            number > 0 ? 'text-green' : number < 0 ? 'text-red' : '',
          )}
        >
          {number !== 0 ? `$${nFormatter(number)}` : '-'}
        </span>
      ) : (
        children
      )}
    </div>
  )
}

export const TooltipTokenMoreInfo = ({ ...data }) => {
  const {
    price_change_24h,
    token_address,
    symbol,
    token_image_url,
    user_balance,
    price,
    avg_entry_buy,
    avg_entry_sell,
    tx_buy,
    tx_sell,
    realized_profit,
    unrealized_profit,
    buy_volume_in_usdt,
    sell_volume_in_usdt,
    total_profit,
    realized_percent,
  } = data.data

  const percentBuyVolumne =
    (buy_volume_in_usdt / (buy_volume_in_usdt + sell_volume_in_usdt)) * 100 || 0
  const percentSellVolumne =
    (sell_volume_in_usdt / (buy_volume_in_usdt + sell_volume_in_usdt)) * 100 ||
    0

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="rounded-[36px] border border-white/10 bg-white/10 px-3 py-0.5 text-sm font-normal text-neutral-300">
            More Infor
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-[340px] border-none p-0">
          <div className="flex flex-col gap-2.5 rounded-[20px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2 whitespace-nowrap">
              <Link
                href={`/smartmoney-onchain/token-explorer/${token_address}`}
                passHref
                legacyBehavior
              >
                <a
                  target="_blank"
                  className="text-sm font-normal text-[#7F56D9] underline"
                >
                  {token_address?.slice(0, 6)}...{token_address?.slice(-4)}
                </a>
              </Link>
              <p className="text-base font-normal text-[#EFEFEF]">
                30D Trade Statistic
              </p>
            </div>

            {/* token info */}
            <div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/smartmoney-onchain/token-explorer/${token_address}`}
                  passHref
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    className="text-sm font-normal text-[#7F56D9] underline"
                  >
                    <div className="flex items-center gap-2">
                      <ImageToken
                        symbol={symbol}
                        imgUrl={token_image_url}
                        className="size-6"
                      />
                      <p className="text-base font-medium text-white underline">
                        {symbol}
                      </p>
                    </div>
                  </a>
                </Link>
                <p className="text-base font-normal text-[#DCDCDC]">
                  {renderPrice(price)}
                </p>

                {price_change_24h > 0 ? (
                  <PercentUpIcon />
                ) : price_change_24h < 0 ? (
                  <PercentDownIcon />
                ) : null}

                <div
                  className={cn(
                    'text-base font-medium',
                    price_change_24h > 0
                      ? 'text-core'
                      : price_change_24h < 0
                        ? 'text-error-500'
                        : 'text-neutral-100',
                  )}
                >
                  {numeral(price_change_24h).format('0,0.[00]')}%
                </div>
              </div>
            </div>

            {/* avg & vol */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between text-xs font-normal text-[#BDBDBD]">
                <p>Avg Entry/Vol</p>
                <p>Avg Price Sell/Vol</p>
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-[#EFEFEF]">
                <div className="flex items-center">
                  {renderPrice(avg_entry_buy) || '-'}/
                  {buy_volume_in_usdt
                    ? `$${nFormatter(buy_volume_in_usdt)}`
                    : '-'}
                </div>
                <p className="flex items-center">
                  {renderPrice(avg_entry_sell)}/
                  {sell_volume_in_usdt
                    ? `$${nFormatter(sell_volume_in_usdt)}`
                    : '-'}
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                <div
                  className="h-1 rounded-[100px] bg-core"
                  style={{ width: percentBuyVolumne }}
                ></div>
                <div
                  className="h-1 rounded-[100px] bg-red"
                  style={{ width: percentSellVolumne }}
                ></div>
              </div>
            </div>

            {/* detail info */}
            <div className="flex flex-col gap-2">
              <Info title="TXs">
                <div>
                  <span className="text-green">{tx_buy || '-'}</span>/
                  <span className="text-red">{tx_sell || '-'}</span>
                </div>
              </Info>
              <Info title="Realized Profit" number={realized_profit} />
              <Info title="Unrealized Profit" number={unrealized_profit} />
              <Info title="Total Profit" number={total_profit} />
              <Info title="Balance">
                <span className="text-[#EFEFEF]">
                  ${nFormatter(user_balance)}{' '}
                  {`(${nFormatter(user_balance / price)} ${symbol})`}
                </span>
              </Info>
              <Info title="Realized %">
                <span className="text-[#EFEFEF]">
                  {realized_percent
                    ? `${numeral(realized_percent).format('0,0.[00]')}%`
                    : '-'}
                </span>
              </Info>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
