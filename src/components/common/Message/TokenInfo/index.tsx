import { ImageToken } from '../../Image/ImageToken'
import { renderPrice } from '@/lib/utils/renderPrice'
import { TokenInfoProps } from '@/types'
import SkeletonCell from '../../Skeleton/SkeletonCell'
import Link from 'next/link'
import { ReactNode } from 'react'
import { nFormatter } from '@/utils/nFormatter'
import { DialogNumberOfSmartMoney } from '../../Dialog/DialogNumberOfSmartMoney'
import Skeleton from '../../Skeleton'

const MarketInfo = ({
  title,
  loading,
  children,
}: {
  title: string
  loading?: boolean
  children?: ReactNode
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-1">
      <div className=" text-[#797979] text-xs font-normal">{title}</div>
      <div className="text-[#1A1D1F] text-sm font-semibold">
        {loading ? <SkeletonCell /> : <>{children}</>}
      </div>
    </div>
  )
}

export const TokenInfo = ({
  symbol,
  avg_entry,
  number_sm_hold,
  loading,
  address,
  imgUrl,
  volume_buy,
  volume_sell,
  unusual_buy,
}: TokenInfoProps) => {
  const percentBuy = (volume_buy * 100) / (volume_buy + volume_sell)
  const percentSell = (volume_sell * 100) / (volume_buy + volume_sell)

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#EFEFEF] rounded-[20px] border border-white/10 mt-8 mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <ImageToken imgUrl={imgUrl} symbol={symbol} className="w-10 h-10" />

          <p className="text-2xl font-semibold text-[#111827]">{symbol}</p>
        </div>
      </div>
      <div className="flex gap-10">
        <MarketInfo title="AVG SM entry" loading={loading}>
          {renderPrice(avg_entry)}
        </MarketInfo>
        <div className="w-px h-10 flex-1 bg-[#E7E9EB]"></div>

        <MarketInfo title="# SM hold" loading={loading}>
          <DialogNumberOfSmartMoney
            number={number_sm_hold || 0}
            address={address || ''}
            type="find-gems-sm-holding"
            duration={'24h'}
          />
        </MarketInfo>
        <div className="w-px h-10 bg-[#E7E9EB]"></div>
        <MarketInfo title="# Unusual buy" loading={loading}>
          <DialogNumberOfSmartMoney
            number={unusual_buy || 0}
            address={address || ''}
            type="unusual_buy"
            duration={'24h'}
          />
        </MarketInfo>
        <div className="w-px h-10 bg-[#E7E9EB]"></div>
        <div className="flex flex-col items-center justify-between whitespace-nowrap">
          <div className="flex gap-1">
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-center text-xs tracking-normal leading-5 text-right text-neutral-04">
                <div>SM BUY VOL</div>
              </div>
              <div className="text-sm font-medium leading-6 text-neutral-07">
                {loading ? null : nFormatter(volume_buy || 0)}
              </div>
            </div>
            <div className="flex flex-col flex-1 items-end pl-20">
              <div className="flex items-center gap-1 justify-center text-xs tracking-normal leading-5 text-right text-neutral-04">
                <div>SM SELL VOL</div>
              </div>
              <div className="self-end text-sm font-medium leading-6 text-neutral-07">
                {loading ? null : nFormatter(volume_sell || 0)}
              </div>
            </div>
          </div>
          <div className="flex gap-0.5 w-full justify-between">
            {loading ? (
              <div className="w-20 h-3 overflow-hidden rounded-full">
                <Skeleton />
              </div>
            ) : (
              <div
                style={{ width: percentBuy + '%' }}
                className="shrink-0 h-1 bg-lime-300 rounded-[100px]"
              />
            )}
            {loading ? (
              <div className="w-20 h-3 overflow-hidden rounded-full">
                <Skeleton />
              </div>
            ) : (
              <div
                style={{ width: percentSell + '%' }}
                className="shrink-0 h-1 bg-rose-500 rounded-[100px]"
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-neutral-07 cursor-pointer rounded-3xl flex items-center justify-center px-6 py-3 h-full text-[15px] leading-6 font-bold text-[#FCFCFC] hover:underline">
        <Link href={`/smartmoney-onchain/token-explorer/${address}`}>
          See Detail in Token Explore
        </Link>
      </div>
    </div>
  )
}
