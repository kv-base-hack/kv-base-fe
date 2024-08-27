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
      <div className="text-xs font-normal text-[#797979]">{title}</div>
      <div className="text-sm font-semibold text-[#1A1D1F]">
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
    <div className="mb-4 flex w-full items-center justify-between rounded-full border border-white/10 bg-[#EFEFEF] px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <ImageToken imgUrl={imgUrl} symbol={symbol} className="h-10 w-10" />

          <p className="text-2xl font-semibold text-[#111827]">{symbol}</p>
        </div>
      </div>
      <div className="flex gap-10">
        <MarketInfo title="AVG ST entry" loading={loading}>
          {renderPrice(avg_entry)}
        </MarketInfo>
        <div className="h-10 w-px flex-1 bg-[#E7E9EB]"></div>

        <MarketInfo title="# ST hold" loading={loading}>
          <DialogNumberOfSmartMoney
            number={number_sm_hold || 0}
            address={address || ''}
            type="find-gems-sm-holding"
            duration={'24h'}
          />
        </MarketInfo>
        <div className="h-10 w-px bg-[#E7E9EB]"></div>
        <MarketInfo title="# Unusual buy" loading={loading}>
          <DialogNumberOfSmartMoney
            number={unusual_buy || 0}
            address={address || ''}
            type="unusual_buy"
            duration={'24h'}
          />
        </MarketInfo>
        <div className="h-10 w-px bg-[#E7E9EB]"></div>
        <div className="flex flex-col items-center justify-between whitespace-nowrap">
          <div className="flex gap-1">
            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-center text-right text-xs leading-5 tracking-normal text-neutral-04">
                <div>ST BUY VOL</div>
              </div>
              <div className="text-sm font-medium leading-6 text-neutral-07">
                {loading ? null : `$${nFormatter(volume_buy || 0)}`}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-end pl-20">
              <div className="flex items-center justify-center gap-1 text-right text-xs leading-5 tracking-normal text-neutral-04">
                <div>ST SELL VOL</div>
              </div>
              <div className="self-end text-sm font-medium leading-6 text-neutral-07">
                {loading ? null : `$${nFormatter(volume_sell || 0)}`}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between gap-0.5">
            {loading ? (
              <div className="h-3 w-20 overflow-hidden rounded-full">
                <Skeleton />
              </div>
            ) : (
              <div
                style={{ width: percentBuy + '%' }}
                className="h-1 shrink-0 rounded-[100px] bg-lime-300"
              />
            )}
            {loading ? (
              <div className="h-3 w-20 overflow-hidden rounded-full">
                <Skeleton />
              </div>
            ) : (
              <div
                style={{ width: percentSell + '%' }}
                className="h-1 shrink-0 rounded-[100px] bg-rose-500"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex h-full cursor-pointer items-center justify-center rounded-3xl bg-neutral-07 px-6 py-3 text-[15px] font-bold leading-6 text-[#FCFCFC] hover:underline">
        <Link href={`/smartmoney-onchain/token-explorer/${address}`}>
          See Detail in Token Explore
        </Link>
      </div>
    </div>
  )
}
