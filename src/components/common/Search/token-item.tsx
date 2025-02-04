import React from 'react'
import { ImageToken } from '../Image/ImageToken'
import { cn } from '@/lib/utils'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import numeral from 'numeral'
import { renderPrice } from '@/lib/utils/renderPrice'
import { WrapGradient } from '../Dialog/DialogSearch/wrap-gradient'

interface TokenItemProps {
  onClick?: () => void
  symbol: string
  imageUrl: string
  name: string
  price: number
  percentChange24h: number
}

export const TokenItem: React.FC<TokenItemProps> = ({
  onClick,
  symbol,
  imageUrl,
  name,
  price,
  percentChange24h,
}) => {
  return (
    <WrapGradient className="rounded-xl" onClick={onClick}>
      <div className="flex !w-[165px] cursor-pointer flex-col rounded-xl p-3">
        <div className="flex items-center gap-2">
          <ImageToken
            symbol={symbol}
            imgUrl={imageUrl}
            className="aspect-square h-8 w-8 self-center"
          />
          <div className="flex max-w-[100px] items-center gap-2">
            <div className="text-sm font-medium">{symbol}</div>
            <div className="truncate text-sm font-medium">({name})</div>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <div className="text-xs font-medium">{renderPrice(price)}</div>
          <div className="flex items-center">
            {percentChange24h > 0 ? <PercentUpIcon /> : percentChange24h < 0 ? <PercentDownIcon /> : null}
            <div
              className={cn(
                'text-xs font-medium',
                percentChange24h > 0 ? 'text-green' : percentChange24h < 0 ? 'text-red' : '',
              )}
            >
              {numeral(percentChange24h).format('0,0.[00]')}%
            </div>
          </div>
        </div>
      </div>
    </WrapGradient>
  )
}
