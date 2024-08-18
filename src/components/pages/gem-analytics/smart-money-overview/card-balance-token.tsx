import { ImageToken } from '@/components/common/Image/ImageToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import numeral from 'numeral'

export const CardBalanceToken = ({
  color,
  symbol,
  imgUrl,
  percent,
  balance,
}: {
  color: string
  symbol: string
  imgUrl: string
  percent: number
  balance: number
}) => {
  return (
    <div className="flex flex-col gap-2.5 rounded-[20px] border border-white/10 bg-black/90 p-4 shadow-md">
      <div className="flex items-center gap-3">
        <p
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        ></p>
        <p className="text-base font-normal text-neutral-200">
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
          <p className="text-sm font-semibold text-neutral-200">-</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-400">Total Profit</p>
          <p className="text-sm font-semibold text-neutral-200">-</p>
        </div>
      </div>
    </div>
  )
}
