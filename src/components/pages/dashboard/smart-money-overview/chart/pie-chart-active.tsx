'use client'

import { Pie, Label, PieChart, Sector, Tooltip } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

import {  ChartContainer } from '@/components/ui/chart'
import { nFormatter } from '@/lib/utils/nFormatter'
import SkeletonDefault from '@/components/common/Skeleton/SkeletonDefault'
import { CardInfoTopToken } from '@/components/common/Card/CardInfoTopToken'
import { CHART_CONFIG, COLOR_CHART } from '@/constant/chart-config'

const PieChartX = PieChart as any

export function PieChartActive({
  title,
  data,
  type,
  loading,
}: {
  title: string
  data: any
  type: 'hold' | 'buy'
  loading?: boolean
}) {
  const total = data?.reduce((acc: number, cur: any) => {
    acc += cur?.hold_in_usdt || cur?.volume

    return acc
  }, 0)

  const chartData = data?.map((token: any, index: number) => {
    return {
      symbol: token.symbol,
      visitors:
        (token.hold_in_usdt * 20) / total || (token.volume * 20) / total,
      fill: COLOR_CHART(index),
      filter: `url(#glow_${index})`,
      image_url: token.image_url,
      current_price: token.current_price,
      price_change_24h: token.price_percent_change_24h,
      avg_price: token.avg_price,
      hold_in_usdt: token.hold_in_usdt,
      roi: token.roi,
      realized_percent: token.realized_percent,
      number_of_smart_money_hold: token.number_of_smart_money_hold,
      number_of_smart_money: token.number_of_smart_money,
      percent: (token.hold_in_usdt / total || token.volume / total) * 100,
      score: token.score,
      pnl: token.pnl,
    }
  })

  return (
    <div className="h-[300px] w-[300px]">
      {loading ? (
        <SkeletonDefault className="h-[296px] w-[296px] rounded-full" />
      ) : (
        <ChartContainer config={CHART_CONFIG} className="mx-auto aspect-square">
          <PieChartX width={300} height={300}>
            <defs>
              <filter id="glow_0" x="-50%" y="-50%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="rgba(103, 65, 177, 0.90)" result="color" />
                <feComposite
                  in2="offsetblur"
                  operator="in"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <defs>
              <filter id="glow_1" x="-50%" y="-50%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="rgba(23, 150, 236, 0.55)" result="color" />
                <feComposite
                  in2="offsetblur"
                  operator="in"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <defs>
              <filter id="glow_2" x="-50%" y="-50%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="rgba(0, 255, 240, 0.55)" result="color" />
                <feComposite
                  in2="offsetblur"
                  operator="in"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <defs>
              <filter id="glow_3" x="-50%" y="-50%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="rgba(58, 134, 254, 0.55)" result="color" />
                <feComposite
                  in2="offsetblur"
                  operator="in"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <defs>
              <filter id="glow_4" x="-50%" y="-50%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="rgba(82, 20, 169, 0.55)" result="color" />
                <feComposite
                  in2="offsetblur"
                  operator="in"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Pie
              className=""
              data={chartData}
              dataKey="visitors"
              nameKey="token"
              innerRadius={100}
              outerRadius={130}
              activeIndex={[0, 1, 2, 3, 4, 5]}
              activeShape={({
                outerRadius = 20,
                ...props
              }: PieSectorDataItem) => {
                return (
                  <Sector
                    {...props}
                    outerRadius={outerRadius + (props?.value || 0)}
                  />
                )
              }}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 15}
                          className="fill-light-telegray font-inter text-[12px] font-medium uppercase leading-6"
                        >
                          {title}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          className="fill-neutral-100 font-sans text-[32px] font-normal leading-[48px]"
                        >
                          {nFormatter(total)}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
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
              content={<CustomTooltip type={type} />}
            />
          </PieChartX>
        </ChartContainer>
      )}
    </div>
  )
}

const CustomTooltip = ({
  active,
  payload,
  type,
}: {
  active?: any
  payload?: any
  type: 'hold' | 'buy'
}) => {
  const data = payload[0]?.payload || {}

  if (active && payload && payload.length) {
    return (
      <CardInfoTopToken
        token={data}
        type={type}
        view="chart"
        color={data.fill}
      />
    )
  }

  return null
}
