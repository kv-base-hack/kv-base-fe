import { nFormatter } from '@/lib/utils/nFormatter'
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useRouter } from 'next/navigation'
import { CardInfoTopToken } from '@/components/common/Card/CardInfoTopToken'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload
    return <CardInfoTopToken token={data} view="token" type="buy" />
  }

  return null
}

const CustomizedLabel = (props: any) => {
  const { x, y, width, height, value, data } = props
  const router = useRouter()

  const isToken = data.find((f: any) => {
    return f.image_url === value
  })

  const { address, symbol } = isToken

  return (
    <svg
      onClick={() =>
        router.push(`/smartmoney-onchain/token-explorer/${address}`)
      }
      role="button"
    >
      <image
        x={x + width / 4}
        y={y - 42}
        width={36}
        height={36}
        xlinkHref={value}
        clipPath="inset(0% round 18px)"
        onError={(e: any) => {
          const svg = e.target.ownerSVGElement
          const centerX = x + width / 4 + 18
          const centerY = y - 24

          const circle = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle',
          )
          circle.setAttribute('cx', centerX)
          circle.setAttribute('cy', centerY.toString())
          circle.setAttribute('r', '18')
          circle.setAttribute('fill', '#cccccc')

          const text = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text',
          )
          text.setAttribute('x', centerX)
          text.setAttribute('y', centerY.toString())
          text.setAttribute('text-anchor', 'middle')
          text.setAttribute('dominant-baseline', 'central')
          text.setAttribute('font-size', '16')
          text.setAttribute('font-family', 'Open Sans, sans-serif')
          text.setAttribute('fill', '#ffffff')
          text.textContent = symbol.charAt(0)

          svg.appendChild(circle)
          svg.appendChild(text)
          e.target.remove()
        }}
      />
    </svg>
  )
}

const formatYAxis = (tickItem: any) => {
  if (tickItem >= 1000) {
    return nFormatter(tickItem)
  }
  return tickItem
}

export const BarChartTopPerformingTokens = ({
  data,
  width,
}: {
  data: any
  width: number
}) => {
  return (
    <div className="mt-4" style={{ width: width, height: '100%' }}>
      <ResponsiveContainer width={width} height={'100%'}>
        {/* @ts-ignore */}
        <BarChart
          id="chart-performing-token"
          width={width}
          height={400}
          data={data}
          maxBarSize={64}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#15FFAB" stopOpacity={1} />
                <stop
                  offset="50.5%"
                  stopColor="rgba(21, 255, 171, 0.54)"
                  stopOpacity={0.54}
                />
                <stop
                  offset="100%"
                  stopColor="rgba(21, 255, 171, 0)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
          </defs>

          <XAxis dataKey="symbol" tick={{ fill: '#fff', fontSize: '15px' }} />
          <YAxis
            dataKey="pnl"
            padding={{ top: 30 }}
            label={{
              value: 'PnL',
              fill: '#fff',
              position: 'top',
            }}
            tickFormatter={formatYAxis}
            tick={{ fill: '#fff', fontSize: '12px' }}
            axisLine={false}
            tickLine={false}
            domain={[0, 40000]}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            wrapperStyle={{
              backgroundColor: 'transparent',
            }}
            contentStyle={{
              backgroundColor: 'transparent',
            }}
            content={<CustomTooltip />}
          />
          {/* recharts-layer recharts-bar-rectangle */}
          <Bar dataKey="pnl" fill="url(#grad)" minPointSize={5}>
            <LabelList
              dataKey="image_url"
              content={<CustomizedLabel data={data} />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
