import { ImageToken } from '../../Image/ImageToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import { renderPrice } from '@/lib/utils/renderPrice'
import { cn } from '@/lib/utils'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import { TokenInfoProps } from '@/types'
import SkeletonCell from '../../Skeleton/SkeletonCell'
import Link from 'next/link'

const MarketInfo = ({
  title,
  total,
  loading,
  type,
}: {
  title: string
  total: number
  loading?: boolean
  type?: string
}) => {
  const renderTotal =
    type === 'percent'
      ? `${total?.toFixed(2)}%`
      : type === 'price'
      ? renderPrice(total)
      : nFormatter(total)

  return (
    <div className="flex flex-col items-start gap-1">
      <div className=" gap-1 text-neutral-300 text-sm font-normal">{title}</div>
      <div className="text-neutrl-dark-01 text-base font-medium">
        {loading ? <SkeletonCell /> : total ? renderTotal : '-'}
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
}: TokenInfoProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1a1d1f] rounded-[20px] border border-white/10 mt-8 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <ImageToken
            imgUrl={imgUrl}
            symbol={symbol}
            className="w-[45px] h-[45px]"
          />
          <div className="flex flex-col justify-between">
            <p className="text-black-300 text-base font-medium">{symbol}</p>
            <p className="text-black-300 text-sm font-normal">{name}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-base text-[#DADCE0] font-medium">
            {renderPrice(usdPrice)}
          </p>
          <div
            className={cn(
              'flex gap-0 text-xs leading-5',
              price_24h > 0 ? 'text-success-500' : 'text-error-500',
            )}
          >
            {price_24h !== 0 && price_24h > 0 ? (
              <PercentUpIcon />
            ) : (
              <PercentDownIcon />
            )}
            {price_24h > 0 ? '+' : ''}
            {price_24h.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MarketInfo
          title="# of SM Hold"
          total={number_sm_hold}
          loading={loading}
          type="number"
        />
        <div className="w-px h-10 flex-1 bg-white/30"></div>
        <MarketInfo title="SM Value Buy" total={value_buy} loading={loading} />
        <div className="w-px h-10 bg-white/30"></div>
        <MarketInfo
          title="SM Avg entry"
          total={avg_entry}
          loading={loading}
          type="price"
        />
        <div className="w-px h-10 bg-white/30"></div>
        <MarketInfo
          title="Realized %"
          total={realized}
          loading={loading}
          type="percent"
        />
        <div className="w-px h-10 bg-white/30"></div>
        <div className="rounded-3xl p-px bg-gradient-to-r from-[#9945FF] to-[#14F195] shadow-lg backdrop-blur-[2px]">
          <div className="bg-neutral-07 cursor-pointer rounded-3xl flex items-center justify-center px-6 py-2 h-full text-sm text-white hover:underline">
            <Link href={`/smartmoney-onchain/token-explorer/${address}`}>
              See Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
