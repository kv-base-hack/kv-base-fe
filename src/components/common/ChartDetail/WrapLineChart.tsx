import numeral from 'numeral'
import { useState } from 'react'
import { ModeFilter } from './ModeFilter'
import { ArrowUpRight } from '@/components/shared/icons/ArrowUpRight'
import SkeletonCell from '@/components/common/Skeleton/SkeletonCell'
import { TokenInfo } from '@/types/tokenInfo'
import { cn } from '@/lib/utils'
import { LineChart } from '@/components/common/ChartDetail/LineChart'
import { ImageToken } from '../Image/ImageToken'

const modes = ['1h', '1d', '1w', '1m', '1y']

const checkPercent = (time: string, dataTokenInfo?: TokenInfo) => {
  if (dataTokenInfo) {
    switch (time) {
      case '1h':
        return dataTokenInfo.percent_change_1h
      case '1d':
        return dataTokenInfo.percent_change_24h
      case '1w':
        return dataTokenInfo.percent_change_7d
      case '1m':
        return 0
      case '1y':
        return 0
    }
  }
  return 0
}

export function WrapLineChart({
  mode,
  sparkLineIn7D,
  dataTokenInfo,
  onModeChange,
  loading,
}: {
  mode: string
  sparkLineIn7D: number[][]
  onModeChange: (mode: string) => void
  loading?: boolean
  dataTokenInfo?: TokenInfo
}) {
  const [valueIndex, setValueIndex] = useState<number>()

  const handleModeChange = (value: string) => {
    if (value) onModeChange(value)
  }

  const percentChange = checkPercent(mode, dataTokenInfo)
  return (
    <div className="rounded-lg h-full border border-white/10 flex flex-col gap-4">
      <div className="flex items-start justify-between px-6 pt-4">
        <div>
          <div className="flex gap-3 text-sm leading-5 whitespace-nowrap">
            <ImageToken
              symbol={dataTokenInfo?.symbol}
              className="object-center w-6 aspect-square"
            />
            <div className="flex gap-1 my-auto">
              <div className="grow font-bold text-gray-300">{dataTokenInfo?.name}</div>
              <div className="text-gray-400">{dataTokenInfo?.symbol}</div>
            </div>
          </div>
          <div className={loading ? 'flex flex-col gap-2' : 'mt-2'}>
            {loading ? (
              <SkeletonCell />
            ) : (
              <p className="text-[28px] font-bold text-[#fefefe]">
                {valueIndex
                  ? numeral(valueIndex).format('$0,0.[00000000]')
                  : numeral(dataTokenInfo?.usd_price).format('$0,0.[00000000000]')}
              </p>
            )}
            {loading ? (
              <SkeletonCell />
            ) : (
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    'font-manrope text-title-2',
                    percentChange > 0 ? 'text-semantic-success-1' : 'text-semantic-error-3'
                  )}>
                  {percentChange.toFixed(2)}%
                </span>
                <ArrowUpRight
                  className={
                    percentChange > 0 ? 'text-semantic-success-1' : 'text-semantic-error-3'
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeFilter options={modes} value={mode} onChange={handleModeChange} />
        </div>
      </div>
      <div className="h-[400px]">
        <LineChart
          dataTokenInfo={dataTokenInfo}
          sparkLineIn7D={sparkLineIn7D}
          loading={loading}
          setValueIndex={setValueIndex}
        />
      </div>
    </div>
  )
}
