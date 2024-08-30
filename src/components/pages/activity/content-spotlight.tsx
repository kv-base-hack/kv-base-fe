import {
  ImageBadge,
  ImageRanking,
} from '@/components/common/Image/image-ranking'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { TooltipWallet } from '@/components/common/Tooltip/tooltip-wallet'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import upperFirst from 'lodash.upperfirst'
import numeral from 'numeral'
import { ReactNode } from 'react'

const renderWallet = (
  wallet: string,
  ranking: string,
  badges: string[],
  item: any,
) => {
  return (
    <TooltipWallet data={item}>
      <div className="flex items-center gap-1">
        <ImageRanking ranking={ranking} size={16} />

        <a
          href={`/smartmoney-onchain/wallet-explorer/${wallet}`}
          className="flex text-sm font-normal text-neutral-100 underline"
        >
          {wallet?.slice(0, 4)}
          ...
          {wallet?.slice(-4)}
        </a>

        {badges && (
          <div className="flex gap-1">
            {badges?.map((badge) => (
              <ImageBadge badge={badge} size={16} key={badge} />
            ))}
          </div>
        )}
      </div>
    </TooltipWallet>
  )
}

const RenderNumber = ({
  value,
  className,
  children,
}: {
  value: number
  className?: string
  children: ReactNode
}) => {
  return (
    <span
      className={cn(
        value > 0 ? 'text-core' : value < 0 ? 'text-[#F04D1A]' : 'hidden',
        className,
      )}
    >
      {children}
    </span>
  )
}

const renderToken = (token: string, symbol: string, image_url: string) => {
  return (
    <a
      href={`/smartmoney-onchain/token-explorer/${token}`}
      className="flex gap-1 px-0.5"
    >
      <ImageToken symbol={symbol} imgUrl={image_url} />
      <span className="text-sm font-normal text-neutral-300 underline">
        {symbol}
      </span>
    </a>
  )
}

const renderText = (text: string) => {
  return <span className="text-[#EFEFEF]">{text}</span>
}

export const ContentSpotlight = ({ ...item }) => {
  const {
    action,
    image_url,
    symbol,
    token_address,
    sender,
    portfolio_percenter,
    value_in_usdt,
    avg_price,
    balance_change_percent,
    price,
    roi,
    exchange_name,
    token_age,
    ranking,
    badges,
    total_volume_usdt,
  } = item.item



  switch (action) {
    case 'buy':
      return (
        <div className="flex flex-col">
          {renderWallet(sender, ranking, badges, item.item)} has buy more{' '}
          <div className="flex flex-wrap items-center gap-x-0.5 align-baseline text-sm font-normal text-neutral-300">
            <RenderNumber value={1000}>{renderPrice(1000)}</RenderNumber> of{' '}
            {renderToken(token_address, symbol, image_url)}at{' '}
            {renderPrice(avg_price)}His avg entry price is{' '}
            {renderPrice(avg_price)}and{' '}
            <RenderNumber value={1000}>{renderPrice(1000)}</RenderNumber>Total{' '}
            Profit and ROI{' '}
            <RenderNumber value={40}>
              {numeral(40).format('0,0.[00]')}%
            </RenderNumber>{' '}
            Total actions is <span>6 Buy</span> and <span>0 Sell</span>
          </div>
        </div>
      )
    case 'unusual_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item.item)}
          <div className="flex flex-wrap items-center gap-x-0.5 align-baseline text-sm font-normal text-neutral-300">
            Unusual buy{' '}
            <RenderNumber value={value_in_usdt}>
              ${nFormatter(value_in_usdt)}
            </RenderNumber>{' '}
            of {renderToken(token_address, symbol, image_url)} at{' '}
            {renderPrice(price)} Make up{' '}
            {numeral(portfolio_percenter).format('0,0.[00]')}% of portfolio
          </div>
        </div>
      )
    case 'new_listing_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item.item)} has buy token create{' '}
          <div className="flex flex-wrap items-center gap-x-0.5 align-baseline text-sm font-normal text-neutral-300">
            <span>Just bought</span>
            <RenderNumber value={1000}>{renderPrice(1000)}</RenderNumber> of
            newly listed token (3H)
            {renderToken(token_address, symbol, image_url)} at{' '}
            {renderPrice(1000)} This trasaction accounts for 40% of portfolio
          </div>
        </div>
      )
    case 'first_time_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item.item)}
          <div className="flex flex-wrap gap-x-1 align-baseline text-sm font-normal text-neutral-300">
            has first time buy
            <RenderNumber value={1000}>{renderPrice(1000)}</RenderNumber>
            of {renderToken(token_address, symbol, image_url)} at{' '}
            {renderPrice(price)} Make up 40% of portfolio
          </div>
        </div>
      )
    case 'selling':
      return (
        <div className="flex w-full flex-col">
          {renderWallet(sender, ranking, badges, item.item)}
          <div className="flex flex-wrap gap-x-0.5 text-sm font-normal text-neutral-300">
            <>has sold</>
            <RenderNumber value={value_in_usdt}>
              ${nFormatter(value_in_usdt)}
            </RenderNumber>{' '}
            ({numeral(balance_change_percent).format('0,0.[00]')}% Balance) of
            {renderToken(token_address, symbol, image_url)}
            at {renderPrice(price)} Make up{' '}
            <RenderNumber value={100}>{renderPrice(100)}</RenderNumber>
            total Profit and ROI
            <RenderNumber value={roi}>
              {numeral(roi).format('0,0.[00]')}%
            </RenderNumber>
          </div>
        </div>
      )
    case 'withdraw':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item.item)}
          <div className="flex flex-wrap gap-x-1 align-baseline text-sm font-normal text-neutral-300">
            just withdraw{' '}
            <span className="text-[#32AE60]">{nFormatter(value_in_usdt)}</span>{' '}
            of
            {renderToken(token_address, symbol, image_url)} at{' '}
            <span>{renderPrice(price)}</span> His avg price is{' '}
            {renderPrice(avg_price)}
          </div>
        </div>
      )
    case 'deposit':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item.item)}
          <div className="flex flex-wrap gap-x-1 align-baseline text-sm font-normal text-neutral-300">
            just deposited{' '}
            <span className="text-semibold text-[#F04D1A]">
              ${nFormatter(value_in_usdt)}
            </span>
            of {renderToken(token_address, symbol, image_url)} at{' '}
            {renderPrice(avg_price)} to {upperFirst(exchange_name)}
          </div>
        </div>
      )
    case 'new_listing_sell':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item.item)}
          <div className="flex flex-wrap gap-x-1 align-baseline text-sm font-normal text-neutral-300">
            just bought{' '}
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            of newly listed token{' '}
            {token_age && <span className="text-[#EFEFEF]">({token_age})</span>}{' '}
            {renderToken(token_address, symbol, image_url)} at{' '}
            {renderPrice(price)} This transaction accounts for{' '}
            <span className="text-[#EFEFEF]">
              {numeral(balance_change_percent).format('0,0.[000]')}%
            </span>
            of portfolio
          </div>
        </div>
      )
  }
}
