import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { ImageToken } from '../Image/ImageToken'
import { ReactNode } from 'react'
import { CardInfo } from '@/components/Dashboard/CardInfoToken'
import { TokenSymbol } from '../TokenSymbol'

export const TooltipTokenInfo = ({
  token,
  chain,
  className,
  isSymbol = true,
  nameToken = false,
}: {
  token: any
  chain: string
  className?: string
  isSymbol?: boolean
  nameToken?: boolean
}) => {
  const address = token?.address ?? token?.token_address ?? token?.tokenAddress
  const imgUrl = token?.image_url ?? token?.token_image_url ?? token?.imageUrl
  const symbol = token?.symbol
  const currentPrice = token?.current_price ?? token?.price ?? token?.usdPrice
  const priceChange =
    token?.price_change_24h ??
    token.price_percent_change_24h ??
    token.priceChangeH24 ??
    token.price_24h_change
  const pnl = token?.pnl
  const avgRoi = token?.roi ?? token?.avg_roi
  const realizedPercent = token?.realized_percent ?? token?.realized
  const avgPrice = token?.avg_price ?? token?.avg_cost
  const fdv = token?.fdv
  const liquidity = token?.liquidity ?? token?.liquidity_usd
  const name = token?.name

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/smartmoney-onchain/token-explorer/${address}?chain=${chain}`}
          >
            {!nameToken ? (
              <div className="flex gap-1.5 w-full items-center justify-start">
                <ImageToken
                  imgUrl={imgUrl}
                  symbol={symbol}
                  className={className}
                />
                {isSymbol && <TokenSymbol>{symbol}</TokenSymbol>}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ImageToken imgUrl={imgUrl} symbol={symbol} />
                <div className="flex flex-col gap-1.5 w-full items-start justify-start">
                  <div className=" font-bold text-primary max-w-[140px] truncate">
                    {name}
                  </div>
                  <TokenSymbol className="text-neutral-04">
                    {symbol}
                  </TokenSymbol>
                </div>
              </div>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="!p-0 !border-none">
          <CardInfo
            image_url={imgUrl}
            symbol={symbol}
            current_price={currentPrice}
            price_change_24h={priceChange}
            pnl={pnl}
            roi={avgRoi}
            realized_percent={realizedPercent}
            avg_price={avgPrice}
            fdv={fdv}
            liquidity={liquidity}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
