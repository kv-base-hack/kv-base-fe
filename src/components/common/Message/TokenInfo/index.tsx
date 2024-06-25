import { ImageToken } from '../../Image/ImageToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import { cn } from '@/lib/utils'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import { TokenInfoProps } from '@/types'
import SkeletonCell from '../../Skeleton/SkeletonCell'
import Link from 'next/link'
import Image from 'next/image'
import { useAtomValue } from 'jotai'
import { chainAtom } from '@/atom/chain'
import { IconCopyContent } from '@/components/shared/icons/IconCopyContent'
import { CopyCustom } from '../../CopyCustom'

const MarketInfo = ({
  title,
  total,
  loading,
  type,
  marketcap,
  volume,
  Liquidity,
  tokenAge,
}: {
  title: string
  total?: number
  loading?: boolean
  type?: string
  marketcap?: number
  volume?: number
  Liquidity?: number
  tokenAge?: string
}) => {
  const renderTotal =
    type === 'percent'
      ? `${total?.toFixed(2)}%`
      : type === 'price'
      ? renderPrice(total as number)
      : nFormatter(total as number)

  return (
    <div className="flex flex-col items-start gap-1">
      <div className=" text-[#6F767E] text-xs font-normal">{title}</div>
      <div className="text-[#1A1D1F] text-sm font-semibold">
        {loading ? (
          <SkeletonCell />
        ) : total ? (
          renderTotal
        ) : tokenAge ? (
          tokenAge
        ) : (
          '-'
        )}
      </div>
    </div>
  )
}

export const TokenInfo = ({
  symbol,
  name,
  usdPrice,
  price_24h,
  value_buy,
  avg_entry,
  number_sm_hold,
  realized,
  loading,
  address,
  imgUrl,
  pair,
  marketcap,
  volume,
  liquidity,
  tokenAge,
}: TokenInfoProps) => {
  const CHAIN = useAtomValue(chainAtom)

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#EFEFEF] rounded-[20px] border border-white/10 mt-8 mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <ImageToken imgUrl={imgUrl} symbol={symbol} className="w-10 h-10" />
            <Image
              src={`/assets/icons/chain/${CHAIN}.svg`}
              width={40}
              height={40}
              alt={CHAIN}
              className="rounded-full overflow-hidden relative -ml-2"
            />
          </div>
          <p className=" text-base font-medium text-[#111827]">{symbol}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <p className="text-[#6F767E] text-sm font-normal">Token:</p>
            <p className="text-[#0C68E9] text-sm font-normal">
              {address?.substring(0, 4)}...
              {address?.substring(address.length - 4, address.length)}
            </p>
            <CopyCustom value={address as string} icon={<IconCopyContent />} />
          </div>
          {pair && (
            <div className="flex items-center gap-0.5">
              <p className="text-[#6F767E] text-sm font-normal">Pair:</p>
              <p className="text-[#0C68E9] text-sm font-normal">
                {pair?.substring(0, 4)}...
                {pair?.substring(pair.length - 4, pair.length)}
              </p>
              <CopyCustom value={pair as string} icon={<IconCopyContent />} />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <MarketInfo
          title="Market cap"
          total={marketcap as number}
          loading={loading}
          type="number"
        />
        <div className="w-px h-10 flex-1 bg-[#E7E9EB]"></div>
        <MarketInfo
          title="Volume 24h"
          total={volume as number}
          loading={loading}
        />
        <div className="w-px h-10 bg-[#E7E9EB]"></div>
        <MarketInfo
          title="Liquidity"
          total={liquidity as number}
          loading={loading}
          type="price"
        />
        <div className="w-px h-10 bg-[#E7E9EB]"></div>
        <MarketInfo
          title="Token Age"
          tokenAge={tokenAge as string}
          loading={loading}
          type="percent"
        />
      </div>
    </div>
  )
}
