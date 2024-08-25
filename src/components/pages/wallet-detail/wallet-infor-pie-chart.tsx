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
} satisfies ChartConfig

const renderColorChart = (i: number) => {
  switch (i) {
    case 0:
      return 'var(--color-Amethyst)'
    case 1:
      return 'var(--color-Azure)'
    case 2:
      return 'var(--color-Cyan)'
    case 3:
      return 'var(--color-DarkPurple)'
    case 4:
      return 'var(--color-Electrician)'
  }
}

const PieChartX = PieChart as any

export function WalletInfoPieChart({ address }: { address: string }) {
  const userBalanceQuery = useQuery(
    useGetUserBalanceQuery({
      address,
      chain: CHAIN,
      page: 1,
      perPage: 10,
    }),
  )

  const dataBalance = userBalanceQuery?.data?.balances

  const totalVol =
    dataBalance?.reduce((acc, cur) => {
      return acc + cur.hold_in_usdt
    }, 0) || 1

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
        vol: item.hold_in_usdt / totalVol,
        fill: renderColorChart(i),
        balance: item.hold_in_usdt,
        imageUrl: item.image_url,
        realized: item.realized_percent,
      }
    })
  }, [formatData, totalVol])

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
            paddingAngle={dataChart?.length > 1 ? 8 : 0}
            cornerRadius={dataChart?.length > 1 ? 6 : 0}
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
                        ${nFormatter(totalVol as number)}
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
