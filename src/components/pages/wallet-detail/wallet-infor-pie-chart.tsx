'use client'

import * as React from 'react'
import { Label, Pie, PieChart, Tooltip } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'
import { nFormatter } from '@/lib/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { CHAIN } from '@/constant/chain'
import { CardBalanceToken } from '@/components/common/Card/card-balance-token'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  Amethyst: {
    label: 'Amethyst',
    color: 'hsl(var(--chart-1))',
  },
  Azure: {
    label: 'Azure',
    color: 'hsl(var(--chart-2))',
  },
  Cyan: {
    label: 'Cyan',
    color: 'hsl(var(--chart-3))',
  },
  DarkPurple: {
    label: 'DarkPurple',
    color: 'hsl(var(--chart-4))',
  },
  Electrician: {
    label: 'Electrician',
    color: 'hsl(var(--chart-5))',
  },
  Idingo: {
    label: 'Idingo',
    color: 'hsl(var(--chart-6))',
  },
  Amber: {
    label: 'Amber',
    color: 'hsl(var(--chart-7))',
  },
  DarkOrange: {
    label: 'DarkOrange',
    color: 'hsl(var(--chart-8))',
  },
  Brown: {
    label: 'Brown',
    color: 'hsl(var(--chart-9))',
  },
  Pink: {
    label: 'Pink',
    color: 'hsl(var(--chart-10))',
  },
  LightGreen: {
    label: 'LightGreen',
    color: 'hsl(var(--chart-11))',
  },
} satisfies ChartConfig

const renderColorChart = (i: number) => {
  const colors = [
    'var(--color-Amethyst)',
    'var(--color-Azure)',
    'var(--color-Cyan)',
    'var(--color-Electrician)',
    'var(--color-DarkPurple)',
    'var(--color-Idingo)',
    'var(--color-Amber)',
    'var(--color-DarkOrange)',
    'var(--color-Brown)',
    'var(--color-Pink)',
    'var(--color-LightGreen)',
  ]
  return colors[i] || 'var(--color-Electrician)'
}

const PieChartX = PieChart as any

export function WalletInfoPieChart({
  address,
  total_balance,
}: {
  address: string
  total_balance: number
}) {
  const userBalanceQuery = useQuery(
    useGetUserBalanceQuery({
      address,
      chain: CHAIN,
      page: 1,
      perPage: 10,
    }),
  )

  const dataBalance = userBalanceQuery?.data?.balances

  const formatData = React.useMemo(() => {
    const otherTokens: any[] = []
    const result = []

    dataBalance?.forEach((item) => {
      if (item.hold_in_usdt < 1000) {
        otherTokens.push(item)
      } else {
        result.push(item)
      }
    })

    if (otherTokens.length) {
      result.push({
        symbol: 'Others',
        hold_in_usdt: otherTokens.reduce(
          (acc, item) => acc + item.hold_in_usdt,
          0,
        ),
        image_url: '',
        realized_percent: otherTokens.reduce(
          (acc, item) => acc + item.realized_percent,
          0,
        ),
        total_profit: otherTokens.reduce(
          (acc, item) => acc + item.total_profit,
          0,
        ),
        roi: otherTokens.reduce((acc, item) => acc + item.roi, 0),
      })
    }

    return result
  }, [dataBalance])

  const dataChart = React.useMemo(() => {
    return formatData?.map((item, i) => {
      return {
        token: item.symbol,
        vol: item.hold_in_usdt / total_balance,
        fill: renderColorChart(i),
        balance: item.hold_in_usdt,
        imageUrl: item.image_url,
        realized: item.realized_percent,
      }
    })
  }, [formatData, total_balance])

  return (
    <div className="h-[400px] w-[360px]">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square">
        <PieChartX width={360} height={400}>
          <Pie
            data={dataChart}
            dataKey="vol"
            nameKey="token"
            innerRadius={100}
            outerRadius={150}
            strokeWidth={5}
            paddingAngle={dataChart.length > 1 ? 8 : 0}
            cornerRadius={dataChart.length > 1 ? 6 : 0}
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
                        className="fill-light-telegray text-[18px] font-medium leading-6"
                      >
                        Total Balance
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 15}
                        className="fill-neutral-100 text-[32px] leading-[48px]"
                      >
                        {total_balance
                          ? `$${nFormatter(total_balance as number)}`
                          : '-'}
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
            content={<CustomTooltip />}
          />
        </PieChartX>
      </ChartContainer>
    </div>
  )
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: any
  payload?: any
}) => {
  const data = payload[0]?.payload || {}

  if (active && payload && payload.length) {
    return (
      <CardBalanceToken
        color={data.fill}
        symbol={data?.token}
        imgUrl={data?.imageUrl}
        percent={data?.vol * 100}
        balance={data?.balance}
      />
    )
  }

  return null
}
