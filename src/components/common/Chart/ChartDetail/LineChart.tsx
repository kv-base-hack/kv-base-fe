import 'chartjs-adapter-date-fns'
import moment from 'moment'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import SkeletonChart from '@/components/common/Skeleton/SkeletonChart'
import { CustomDotActive } from '@/components/shared/icons/CustomDotActive'
import { TokenInfo } from '@/types/tokenInfo'
import Skeleton from '../../Skeleton'

export function LineChart({
  sparkLineIn7D,
  dataTokenInfo,
  loading,
  setValueIndex,
  showDate = true,
}: {
  sparkLineIn7D: number[][]
  loading?: boolean
  dataTokenInfo?: TokenInfo | null
  setValueIndex: (value: number | undefined) => void
  showDate?: boolean
}) {
  const formatData = useMemo(() => {
    return sparkLineIn7D?.map((item, index) => {
      return {
        key: index,
        date: moment((item[0] as any) * 1000).format('MMM:DD, HH:mm'),
        price: item[1],
      }
    })
  }, [sparkLineIn7D])

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

  return loading ? (
    <div className="overflow-hidden mt-4">
      <SkeletonChart />
    </div>
  ) : (
    <>
      {/* @ts-ignore */}
      <AreaChart
        width={1300}
        height={300}
        data={formatData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        {showDate ? (
          <XAxis
            dataKey="date"
            allowDataOverflow
            axisLine={false}
            tickLine={false}
            interval={7}
            tickFormatter={xAxisFormatter}
            padding={{ left: 16, right: 16 }}
          />
        ) : null}
        <YAxis
          dataKey="price"
          domain={[minPrice - space, maxPrice + space]}
          hide
          tickCount={7}
          type="number"
        />

        <Area
          dataKey="price"
          stroke="#00FFA3"
          filter="drop-shadow(0px 0px 16px rgba(105, 91, 255, 0.50))"
          strokeWidth={2}
          fillOpacity={0.4}
          fill="url(#price)"
          activeDot={<CustomDotActive />}
          type="monotone"
        />
        <defs>
          <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FFA3" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#45B36B" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </>
  )
}

const CustomTooltip = ({
  active,
  payload,
  label,
  setValueIndex,
}: {
  active: any
  payload: any
  label: any
  setValueIndex: any
}) => {
  const price = payload[0]?.payload?.price
  setValueIndex(price)
  if (active && payload && payload.length) {
    return (
      <div>
        <p className="text-[#A7ACB4] text-sm font-normal">{label}</p>
      </div>
    )
  }

  return null
}
