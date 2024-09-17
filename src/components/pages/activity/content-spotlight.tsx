import { ImageBadge, ImageRanking } from '@/components/common/Image/image-ranking'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { TooltipToken } from '@/components/common/Tooltip/tooltip-token'
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
    <TooltipWallet data={item.item}>
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
        value > 0 ? 'text-core' : value < 0 ? 'text-[#F04D1A]' : '',
        className,
      )}
    >
      {children}
    </span>
  )
}

const renderToken = (
  token: string,
  symbol: string,
  image_url: string,
  data: any,
) => {
  return (
    <TooltipToken data={data} type="hold" side="bottom">
      <a
        href={`/smartmoney-onchain/token-explorer/${token}`}
        className="flex items-start gap-1 px-0.5"
      >
        <ImageToken symbol={symbol} imgUrl={image_url} />
        <span className="text-sm font-normal text-neutral-300 underline">
          {symbol}
        </span>
      </a>
    </TooltipToken>
  )
}

export const ContentSpotlight = ({ ...item }) => {
  const {
    action,
    image_url,
    symbol,
    token_address,
    sender,
    value_in_usdt,
    avg_price,
    balance_change_percent,
    price,
    roi,
    portfolio_percenter,
    exchange_name,
    token_age,
    ranking,
    badges,
    total_volume_usdt,
    pnl,
    maket_cap,
    supply_change_percent,
  } = item.item

  console.log('item', item.item)

  switch (action) {
    case 'buy':
      return (
        <div className="flex flex-col">
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-neutral-300">
            has buy more{' '}
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>{' '}
            of {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            {renderPrice(avg_price)} His avg entry price is{' '}
            {renderPrice(avg_price)} and{' '}
            <RenderNumber value={pnl}>{renderPrice(pnl)}</RenderNumber>. Total{' '}
            Profit and ROI{' '}
            <RenderNumber value={roi}>
              {numeral(roi).format('0,0.[00]')}%
            </RenderNumber>{' '}
            Total actions is <span>- Buy</span> and <span>- Sell</span>
          </div>
        </div>
      )
    case 'new_listing_buy':
      return (
        <div className="flex flex-col">
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-neutral-300">
            has buy token create <span>Just bought</span>
            <RenderNumber value={total_volume_usdt}>
              {renderPrice(total_volume_usdt)}
            </RenderNumber>{' '}
            of newly listed token (3H)
            {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            {renderPrice(avg_price)} This transaction accounts for 40% of
            portfolio
          </div>
        </div>
      )
    case 'selling':
      return (
        <div className="flex flex-col">
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-neutral-300 inline-block">
            <span>has sold</span>
            <RenderNumber value={value_in_usdt}>
              ${nFormatter(value_in_usdt)}
            </RenderNumber>{' '}
            ({numeral(balance_change_percent).format('0,0.[00]')}<span>% Balance</span>) of
            {renderToken(token_address, symbol, image_url, item.item)}
            at {renderPrice(price)} Make up{' '}
            <RenderNumber value={pnl}>{renderPrice(pnl)}</RenderNumber>
            <span>total</span> <span>profit</span> <span>and ROI</span>
            <RenderNumber value={roi}>
              {numeral(roi).format('0,0.[00]')}%
            </RenderNumber>
          </div>
        </div>
      )
    case 'withdraw':
      return (
        <div className="flex flex-col">
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-neutral-300">
            just withdraw{' '}
            <RenderNumber value={value_in_usdt}>
              ${nFormatter(value_in_usdt)}
            </RenderNumber>{' '}
            of
            <span className="flex items-start">
              {renderToken(token_address, symbol, image_url, item.item)}.{' '}
            </span>
            <span>His</span> <span>avg</span> price is {renderPrice(price)} to{' '}
            {upperFirst(exchange_name)}
          </div>
        </div>
      )
    case 'deposit':
      return (
        <div className="flex flex-col">
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-neutral-300">
            just deposited{' '}
            <span className="text-semibold text-[#F04D1A]">
              ${nFormatter(value_in_usdt)}
            </span>
            of {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            {renderPrice(price)} to {upperFirst(exchange_name)}
          </div>
        </div>
      )
    case 'new_listing_sell':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="inline-flex flex-wrap gap-x-1 align-baseline text-sm font-normal text-neutral-300">
            just sold{' '}
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            <span>of</span><span>newly</span> <span>listed</span><span>token</span>{' '}
            {token_age && <span className="text-[#EFEFEF]">({token_age})</span>}{' '}
            {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            {renderPrice(price)}. <span>This</span> <span>transaction</span> <span>accounts for</span>{' '}
            <span className="text-[#EFEFEF]">
              {numeral(portfolio_percenter).format('0,0.[000]')}%
            </span>
            of portfolio
          </div>
        </div >
      )

    ///
    case 'all_in_buy':
    case 'massive_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>just executed a large purchase</span>
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            of {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            {renderPrice(avg_price)}. <span>This</span> <span>transaction</span>{' '}
            <span>accounts for</span>{' '}
            <span className="text-[#EFEFEF]">
              {numeral(portfolio_percenter).format('0,0.[00]')}%
            </span>{' '}
            <span>of portfolio.</span> <span>Total</span>
            <span>actions of</span>
            {renderToken(token_address, symbol, image_url, item.item)}
            <span className="text-core">- Buy</span> and{' '}
            <span className="text-red">- Sell</span>
          </div>
        </div>
      )
    case 'first_time_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>made its first-ever purchase</span>
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            of {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            {renderPrice(avg_price)}. This transaction accounts for{' '}
            <span className="text-[#EFEFEF]">
              {numeral(portfolio_percenter).format('0,0.[00]')}%
            </span>{' '}
            of portfolio
          </div>
        </div>
      )
    case 'buy_more':
      return (
        <div className="flex flex-col">
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>buy more</span>
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            of {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            {renderPrice(avg_price)}. <span>His avg</span>{' '}
            <span>entry price</span> is{' '}
            <RenderNumber value={avg_price}>
              {renderPrice(avg_price)}
            </RenderNumber>{' '}
            and <RenderNumber value={pnl}>{renderPrice(pnl)}</RenderNumber>.
            Total Profit and ROI{' '}
            <RenderNumber value={roi}>
              {numeral(roi).format('0,0.[00]')}%
            </RenderNumber>{' '}
            Total actions is <span>- Buy</span> and <span>- Sell</span>
          </div>
        </div>
      )
    case 'unusual_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className=" flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD] inline-flex">
            <span>Unusual buy</span>
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            of {renderToken(token_address, symbol, image_url, item.item)} at{' '}
            <span className="flex items-center gap-x-0.5">
              {renderPrice(avg_price)}.
            </span>{' '}
            Makes up
            <span className="text-[#EFEFEF]">
              {numeral(portfolio_percenter).format('0,0.[00]')}%
            </span>{' '}
            of portfolio
          </div>
        </div>
      )
    case 'low_cap_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>just invested</span>
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            in low cap token <span>(${nFormatter(maket_cap)})</span>
            {renderToken(token_address, symbol, image_url, item.item)} at
            {renderPrice(avg_price)}. <span>This</span> <span>transaction</span>{' '}
            <span>accounts for</span>{' '}
            <span className="text-[#EFEFEF]">
              {numeral(balance_change_percent).format('0,0.[00]')}%
            </span>{' '}
            <span>of portfolio</span>
          </div>
        </div>
      )
    case 'new_listing_buy':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>just bought</span>
            <RenderNumber value={total_volume_usdt}>
              ${nFormatter(total_volume_usdt)}
            </RenderNumber>
            <span>of</span>
            <span>newly</span>
            <span>listed</span>
            <span>token ({token_age})</span>
            {renderToken(token_address, symbol, image_url, item.item)} at
            {renderPrice(avg_price)}. <span>This</span> <span>transaction</span>{' '}
            <span>accounts for</span>{' '}
            <span className="text-[#EFEFEF]">
              {numeral(portfolio_percenter).format('0,0.[00]')}%
            </span>{' '}
            <span>of portfolio</span>
          </div>
        </div>
      )
    case 'major_sell_off':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>has sold</span>
            <span className="text-red">${nFormatter(total_volume_usdt)}</span>
            <span>
              ({numeral(balance_change_percent).format('0,0.[00]')}% Balance)
            </span>
            <span>of</span>
            <span>
              {renderToken(token_address, symbol, image_url, item.item)}
            </span>
            <span>at</span>
            <span>{renderPrice(avg_price)}.</span>
            <span>This wallet has</span>
            <RenderNumber value={pnl}>{renderPrice(pnl)}</RenderNumber>
            <span>total Profit of</span>
            {renderToken(token_address, symbol, image_url, item.item)}
          </div>
        </div>
      )
    case 'sell_all_position':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>just sold</span>
            <span className="text-red">${nFormatter(total_volume_usdt)}</span>
            <span>
              ({numeral(balance_change_percent).format('0,0.[00]')}% Balance)
            </span>
            <span>of</span>
            <span>
              {renderToken(token_address, symbol, image_url, item.item)}
            </span>
          </div>
        </div>
      )
    case 'token_dump':
      return (
        <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
          <span>Multiple</span>
          {/* <DialogNumberOfSmartMoney
            number={100}
            address="0x1234567890123456789012345678901234567890"
            type="dump"
            duration="1h"
          /> */}
          <span>wallets collectively sold</span>
          <span className="text-red">${nFormatter(total_volume_usdt)}</span>(
          {numeral(supply_change_percent).format('0,0.[00]')}% supply){' '}
          <span>of</span>
          <span>
            {renderToken(token_address, symbol, image_url, item.item)}
          </span>
          <span>at avg</span> <span>price</span>{' '}
          <span>{renderPrice(avg_price)}</span> within -.
        </div>
      )
    case 'panic_sell':
      return (
        <div>
          {renderWallet(sender, ranking, badges, item)}
          <div className="flex flex-wrap items-start gap-x-0.5 text-sm font-normal text-[#BDBDBD]">
            <span>has sold</span>
            <span className="text-red">${nFormatter(total_volume_usdt)}</span>(
            {numeral(balance_change_percent).format('0,0.[00]')}% Balance){' '}
            <span>of</span>
            <span>
              {renderToken(token_address, symbol, image_url, item.item)}
            </span>
            <span>at avg</span> <span>price</span>{' '}
            <span>{renderPrice(avg_price)}</span> <span>following a</span>{' '}
            <span>sharp</span> <span>price drop</span>.<span>This wallet</span>{' '}
            <span>has</span>{' '}
            <RenderNumber value={pnl}>{renderPrice(pnl)}</RenderNumber>{' '}
            <span>total Profit of</span>
            {renderToken(token_address, symbol, image_url, item.item)}
          </div>
        </div>
      )
  }
}
