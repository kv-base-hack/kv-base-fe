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
      className="flex max-w-[172px] flex-col p-4 rounded-2xl bg-white/5 border border-solid shadow-chat-ai backdrop-blur-[32px] border-neutral-03 cursor-pointer group"
      role="button"
    >
      <div className="flex items-center gap-3 text-sm leading-5 text-neutral-07">
        <ImageToken
          imgUrl={token?.imageUrl}
          symbol={token?.symbol}
          className="shrink-0 w-8 h-8 aspect-square"
        />
        <div className="my-auto min-h-10 flex flex-col items-start group-hover:underline">
          <div className="w-[90px] truncate">{token.symbol}</div>
          <div className="w-[90px] truncate">({token.name})</div>
        </div>
      </div>
      <div className="flex gap-1 justify-start items-center mt-1">
        <div className="text-base font-bold tracking-tight leading-8 text-neutral-04">
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
