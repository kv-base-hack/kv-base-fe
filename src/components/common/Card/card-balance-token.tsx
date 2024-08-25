import { ImageToken } from '@/components/common/Image/ImageToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import numeral from 'numeral'

export const CardBalanceToken = ({
  color,
  symbol,
  imgUrl,
  percent,
  balance,
  realized,
  profit,
}: {
  color: string
  symbol: string
  imgUrl: string
  percent: number
  balance: number
  realized?: number
  profit?: number
}) => {
  return (
    <div className="relative overflow-hidden rounded-[20px]">
      <div className="absolute -z-10 h-full w-full rounded-[20px] bg-black/25 backdrop-blur-md"></div>
      <div className="custom-tooltip flex min-w-[173px] flex-col gap-2 rounded-[20px] border border-solid border-white/10 bg-black/25 p-4 font-sans shadow-tooltip backdrop-blur-md">
        <div className="flex items-center gap-3">
          <p
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color }}
          ></p>
          <p className="text-base font-normal text-[#DCDCDC]">
            {numeral(percent).format('0,0.[00]')}%
          </p>
          <ImageToken imgUrl={imgUrl} symbol={symbol} />
          <p className="text-base font-medium text-neutral-100">{symbol}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-400">Balance</p>
            <p className="text-sm font-semibold text-neutral-200">
              ${nFormatter(balance)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-400">Realized</p>
            <p className="text-sm font-semibold text-neutral-200">
              {realized ? `${numeral(realized).format('0,0.[00]')}$` : '-'}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-400">Total Profit</p>
            <p className="text-sm font-semibold text-core">
              {profit ? `$${nFormatter(profit)}` : '-'}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-neutral-400">ROI</p>
            <p className="text-sm font-semibold text-neutral-200">-</p>
          </div>
        </div>
      </div>
    </div>
  )
}
