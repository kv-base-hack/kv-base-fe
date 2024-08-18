'use client'

import { TokenList } from '@/types/tokenList'
import React from 'react'
import { ImageToken } from '../Image/ImageToken'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { cn } from '@/lib/utils'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import { renderPrice } from '@/lib/utils/renderPrice'

interface TokenItemProps {
  token: TokenList
  onClick?: () => void
}

export const TokenItem: React.FC<TokenItemProps> = ({ token, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group flex max-w-[172px] cursor-pointer flex-col rounded-2xl border border-solid border-neutral-03 bg-neutral-01 p-4 shadow-chat-ai backdrop-blur-[32px]"
      role="button"
    >
      <div className="flex items-center gap-3 text-sm leading-5 text-neutral-07">
        <ImageToken
          imgUrl={token?.imageUrl}
          symbol={token?.symbol}
          className="aspect-square h-8 w-8 shrink-0"
        />
        <div className="my-auto flex min-h-10 flex-col items-start group-hover:underline">
          <div className="w-[90px] truncate">{token.symbol}</div>
          <div className="w-[90px] truncate">({token.name})</div>
        </div>
      </div>
      <div className="mt-1 flex items-center justify-start gap-1">
        <div className="text-base font-bold leading-8 tracking-tight text-neutral-04">
          {renderPrice(token.usdPrice)}
        </div>
        <div
          className={cn(
            'flex gap-0 text-xs leading-5',
            token.price_24h > 0 ? 'text-success-500' : 'text-error-500',
          )}
        >
          {token.price_24h !== 0 && token.price_24h > 0 ? (
            <PercentUpIcon />
          ) : (
            <PercentDownIcon />
          )}
          {token.price_24h > 0 ? '+' : ''}
          {token.price_24h.toFixed(2)}%
        </div>
      </div>
    </div>
  )
}
