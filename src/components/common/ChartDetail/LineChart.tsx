import 'chartjs-adapter-date-fns'
import moment from 'moment'
import numeral from 'numeral'
import { useMemo, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ModeFilter } from './ModeFilter'
import SkeletonChart from '@/components/common/Skeleton/SkeletonChart'
import { ArrowUpRight } from '@/components/shared/icons/ArrowUpRight'
import SkeletonCell from '@/components/common/Skeleton/SkeletonCell'
import { CustomDotActive } from '@/components/shared/icons/CustomDotActive'

const modes = ['1h', '1d', '1w', '1m', '1y']

export function LineChart({
  mode,
  sparkLineIn7D,
  value,
  onModeChange,
  loading,
}: {
  mode: string
  sparkLineIn7D: number[][]
  value: number
  onModeChange: (mode: string) => void
  loading?: boolean
}) {
  const [valueIndex, setValueIndex] = useState<number>()

  const formatData = useMemo(() => {
    return sparkLineIn7D?.map((item, index) => {
      return {
        key: index,
        date: moment((item[0] as any) * 1000).format('MMM:DD, HH:mm'),
        price: item[1],
      }
    })
  }, [sparkLineIn7D])

  const handleModeChange = (value: string) => {
    if (value) onModeChange(value)
  }

  const xAxisFormatter = (item: any) => {
    if (moment(item).isValid()) {
      const label = moment(item).format('MMM DD')
      return label
    } else {
      return item
    }
  }

  const minPrice = sparkLineIn7D?.reduce(function (min: any, current: any) {
    return Math.min(min, current[1])
  }, Number.POSITIVE_INFINITY)

  const maxPrice = sparkLineIn7D?.reduce(function (max: any, current: any) {
    return Math.max(max, current[1])
  }, Number.NEGATIVE_INFINITY)

  const space = (maxPrice - minPrice) / 5

  return (
    <div className="rounded-lg h-full border border-white/10 flex flex-col gap-4">
      <div className="flex items-start justify-between px-6 pt-4">
        <div>
          <div className="flex gap-3 text-sm leading-5 whitespace-nowrap">
            <img
              loading="lazy"
              src="/assets/icons/chain/ethereum.svg"
              className="object-center w-6 aspect-square"
            />
            <div className="flex gap-1 my-auto">
              <div className="grow font-bold text-gray-300">Ethereum</div>
              <div className="text-gray-400">ETH</div>
            </div>
          </div>
          <div className={loading ? 'flex flex-col gap-2' : 'mt-2'}>
            {loading ? (
              <SkeletonCell />
            ) : (
              <p className="text-[28px] font-bold text-[#fefefe]">
                {valueIndex
                  ? numeral(valueIndex).format('$0,0.[0000]')
                  : numeral(value).format('$0,0.[0000]')}
              </p>
            )}
            {loading ? (
              <SkeletonCell />
            ) : (
              <div className="flex items-center gap-1">
                <span className="font-manrope text-title-2 text-semantic-success-1">1.74%</span>
                <ArrowUpRight className="text-semantic-success-1" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeFilter options={modes} value={mode} onChange={handleModeChange} />
        </div>
      </div>
      <div className="h-[400px]">
        {loading ? (
          <SkeletonChart />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              height={400}
              data={formatData || []}
              margin={{
                top: 0,
                left: 16,
                right: 16,
                bottom: 24,
              }}
              onMouseLeave={() => {
                setValueIndex(undefined)
              }}>
              <Tooltip
                wrapperStyle={{
                  backgroundColor: 'transparent',
                }}
                contentStyle={{
                  backgroundColor: 'transparent',
                }}
                cursor={{
                  stroke: '#ffffff1a',
                  strokeWidth: 1,
                  strokeDasharray: '5 5',
                }}
                position={{ y: 0 }}
                content={<CustomTooltip setValueIndex={setValueIndex} />}
              />
              <XAxis
                dataKey="date"
                allowDataOverflow
                axisLine={false}
                tickLine={false}
                interval={7}
                tickFormatter={xAxisFormatter}
                padding={{ left: 16, right: 16 }}
              />
              <YAxis
                dataKey="price"
                domain={[minPrice - space, maxPrice + space]}
                hide
                tickCount={7}
                type="number"
              />

              <Area
                dataKey="price"
                stroke="#35DEE8"
                filter="drop-shadow(0px 0px 16px rgba(105, 91, 255, 0.50))"
                strokeWidth={2}
                fillOpacity={0.4}
                fill="url(#price)"
                activeDot={<CustomDotActive />}
              />
              <defs>
                <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#35DEE8" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#5235E8" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label, setValueIndex }: any) => {
  if (active && payload && payload.length) {
    const price = payload[0]?.payload?.price
    setValueIndex(price)
    return (
      <div>
        <p className="text-[#A7ACB4] text-sm font-normal font-inter">{label}</p>
      </div>
    )
  }

  return null
}
