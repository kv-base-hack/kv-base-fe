'use client'

import * as React from 'react'
import { Label, Pie, PieChart, Tooltip } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { nFormatter } from '@/lib/utils/nFormatter'
import { CardBalanceToken } from '@/components/common/Card/card-balance-token'
import { useGetUserBalanceQuery } from '@/query/wallet-explorer/getUserBalance'

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
  const userBalanceQuery = useGetUserBalanceQuery({
    address,
    chain: 'solana',
    page: 1,
    perPage: 10,
  })

  const totalVol = userBalanceQuery?.data?.data?.total_balance || 0

  const dataBalance = userBalanceQuery?.data?.data?.tokens

  const formatData = React.useMemo(() => {
    const otherTokens: any[] = []
    const result = []

    dataBalance?.forEach((item) => {
      if (item.usdt_amount < 1000) {
        otherTokens.push(item)
      } else {
        result.push(item)
      }
    })

    if (otherTokens.length) {
      result.push({
        symbol: 'Others',
        usdt_amount: otherTokens.reduce(
          (acc, item) => acc + item.usdt_amount,
          0,
        ),
        image_url: '',
      })
    }

    return result
  }, [dataBalance])

  const dataChart = React.useMemo(() => {
    return formatData?.map((item, i) => {
      return {
        token: item.symbol,
        vol: item.usdt_amount / totalVol,
        fill: renderColorChart(i),
        balance: item.usdt_amount,
        imageUrl: item.image_url,
      }
    })
  }, [formatData, totalVol])

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square">
      <PieChartX width={360} height={400}>
        <Pie
          data={dataChart}
          dataKey="vol"
          nameKey="token"
          innerRadius={100}
          outerRadius={150}
          strokeWidth={5}
          paddingAngle={8}
          cornerRadius={6}
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
                      ${nFormatter(totalVol)}
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
