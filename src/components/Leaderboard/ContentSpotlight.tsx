import { chainAtom } from '@/atom/chain'
import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { useAtomValue } from 'jotai'
import { upperCase, upperFirst } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { ReactNode } from 'react'
import { ImageToken } from '../common/Image/ImageToken'

const renderWallet = (wallet: string, chain: string) => {
  return (
    <a
      href={`/smartmoney-onchain/wallet-explorer/${wallet}?chain=${chain}`}
      className="flex font-semibold text-[#0C68E9] hover:underline"
    >
      {wallet.slice(0, 4)}
      ...
      {wallet.slice(-4)}
    </a>
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
    <div
      className={cn(
        value > 0 ? 'text-[#32AE60]' : value < 0 ? 'text-[#F04D1A]' : 'hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}

const renderToken = (
  token: string,
  symbol: string,
  image_url: string,
  chain: string,
) => {
  return (
    <a
      href={`/smartmoney-onchain/token-explorer/${token}?chain=${chain}`}
      className="flex gap-1"
    >
      <ImageToken symbol={symbol} imgUrl={image_url} />
      <span className="font-semibold underline">{upperCase(symbol)}</span>
    </a>
  )
}

export const ContentSpotlight = ({ item }: any) => {
  const CHAIN = useAtomValue(chainAtom)

  const {
    action,
    sender,
    value_in_usdt,
    avg_price,
    pnl,
    roi,
    token_age,
    price_change_24h,
    exchange_name,
    price,
    balance_change_percent,
    token_address,
    symbol,
    portfolio_percent,
    image_url,
  } = item

  switch (action) {
    case 'buy':
      return (
        <div className="flex flex-wrap gap-x-1">
          {renderWallet(sender, CHAIN)}
          has bought
          <span className="text-[#32AE60]">{nFormatter(value_in_usdt)}</span> of
          {renderToken(token_address, symbol, image_url, CHAIN)} at{' '}
          {renderPrice(price)} His avg price is{' '}
          <RenderNumber value={avg_price}>
            {renderPrice(avg_price)}
          </RenderNumber>{' '}
          <span className={pnl ? '' : 'hidden'}>and</span>
          <RenderNumber value={pnl}>{nFormatter(pnl)}</RenderNumber>{' '}
          <span className={pnl ? '' : 'hidden'}>PnL with ROI</span>{' '}
          <RenderNumber value={roi}>{roi?.toFix(2)}</RenderNumber>
        </div>
      )
    case 'withdraw':
      return (
        <div className="flex flex-wrap gap-x-1">
          {renderWallet(sender, CHAIN)}
          just withdraw{' '}
          <span className="text-[#32AE60]">{nFormatter(value_in_usdt)}</span> of
          {renderToken(token_address, symbol, image_url, CHAIN)} at{' '}
          <span>{renderPrice(price)}</span> His avg price is{' '}
          {renderPrice(avg_price)}
        </div>
      )
    case 'selling':
      return (
        <div className="flex flex-wrap gap-x-1">
          {renderWallet(sender, CHAIN)}
          has sold
          <span className="text-semibold text-[#F04D1A]">
            ${nFormatter(value_in_usdt)}
          </span>
          ({numeral(balance_change_percent).format('0,0.[00]')}% Balance) of
          {renderToken(token_address, symbol, image_url, CHAIN)} at
          <span className="text-semibold text-[#F04D1A]">
            {renderPrice(price)}
          </span>
          His avg price is
          <span className="text-semibold text-[#F04D1A]">
            {renderPrice(avg_price)}
          </span>
          <span className={pnl ? '' : 'hidden'}>and</span>
          <span
            className={cn('text-semibold text-[#F04D1A]', pnl ? '' : 'hidden')}
          >
            {nFormatter(pnl)}
          </span>
          <span className={pnl ? '' : 'hidden'}>PnL with ROI</span>
          <span
            className={cn(
              'text-semibold',
              roi > 0
                ? 'text-[#32AE60]'
                : roi < 0
                  ? 'text-[#F04D1A]'
                  : 'hidden',
            )}
          >
            {nFormatter(roi)}
          </span>
        </div>
      )
    case 'deposit':
      return (
        <div className="flex flex-wrap gap-x-1">
          {renderWallet(sender, CHAIN)}
          just deposited{' '}
          <span className="text-semibold text-[#F04D1A]">
            {nFormatter(value_in_usdt)}
          </span>
          of {renderToken(token_address, symbol, image_url, CHAIN)} at{' '}
          {renderPrice(avg_price)} to {upperFirst(exchange_name)}
        </div>
      )
    case 'new_listing_buy':
      return (
        <div className="flex flex-wrap gap-x-1">
          {renderWallet(sender, CHAIN)} has bought{' '}
          <span className="font-semibold text-[#32AE60]">
            ${nFormatter(value_in_usdt)}
          </span>{' '}
          at {renderPrice(price)}.{' '}
          <div
            className={cn(
              'flex-wrap gap-x-1',
              Boolean(token_age) && Boolean(price_change_24h)
                ? 'flex'
                : 'hidden',
            )}
          >
            <span>This token is</span>
            {token_age && <> created {moment(token_age).fromNow()}</>}
            24h Price % is
            <span
              className={
                price_change_24h > 0
                  ? 'text-[#32AE60]'
                  : price_change_24h < 0
                    ? 'text-[#F04D1A]'
                    : ''
              }
            >
              {price_change_24h}%
            </span>
          </div>
          .
        </div>
      )
    case 'unusual_buy':
      return (
        <div className="flex flex-wrap gap-1">
          <div className="flex flex-wrap gap-x-1">
            {renderWallet(sender, CHAIN)} has bought
            <span className="font-semibold text-[#32AE60]">
              ${nFormatter(value_in_usdt)}
            </span>
            <>
              of {renderToken(token_address, symbol, image_url, CHAIN)} at{' '}
              {renderPrice(avg_price)}
            </>
          </div>
          <div
            className={cn(
              'flex-wrap gap-x-1',
              Boolean(token_age) && Boolean(price_change_24h)
                ? 'flex'
                : 'hidden',
            )}
          >
            <span>This token is</span>
            {token_age && <> created {moment(token_age).fromNow()}</>}
            24h Price % is
            <span
              className={
                price_change_24h > 0
                  ? 'text-[#32AE60]'
                  : price_change_24h < 0
                    ? 'text-[#F04D1A]'
                    : ''
              }
            >
              {price_change_24h}%
            </span>
          </div>
        </div>
      )
    case 'fresh_wallet_buy':
      return (
        <div className="flex flex-wrap gap-x-1">
          Fresh wallet {renderWallet(sender, CHAIN)} just buy
          {nFormatter(value_in_usdt)} of{' '}
          {renderToken(token_address, symbol, image_url, CHAIN)} at
          {renderPrice(price)} 24h Price % is
          <RenderNumber value={price_change_24h}>
            {numeral(price_change_24h).format('0,0.[00]')}%
          </RenderNumber>
        </div>
      )
    case 'fresh_wallet_received':
      return (
        <div className="flex flex-wrap gap-x-1">
          Fresh wallet {renderWallet(sender, CHAIN)} received
          {nFormatter(value_in_usdt)} of
          {renderToken(token_address, symbol, image_url, CHAIN)} at{' '}
          {renderPrice(price)} from wallet
        </div>
      )
    case 'fresh_wallet_withdraw':
      return (
        <div className="flex flex-wrap gap-x-1">
          Fresh wallet {renderWallet(sender, CHAIN)} withdraw
          {nFormatter(value_in_usdt)} of
          {renderToken(token_address, symbol, image_url, CHAIN)} at{' '}
          {renderPrice(price)} from
          {upperFirst(exchange_name)}
        </div>
      )
    default:
      return null
  }
}
