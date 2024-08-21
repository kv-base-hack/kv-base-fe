'use client'

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
  desktop: {
    label: 'Value',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const RadarChartX = RadarChart as any

export function WalletStatChart({ userInfoChart }: any) {
  let chartData: any = []
  if (userInfoChart) {
    chartData = [
      { month: 'High frequency', desktop: userInfoChart.high_frequency },
      { month: 'Profit', desktop: userInfoChart.profit },
      { month: 'ROI', desktop: userInfoChart.roi },
      { month: 'Winrate', desktop: userInfoChart.win_rate },
      { month: 'Diversify', desktop: userInfoChart.diversify },
      { month: 'Balance', desktop: userInfoChart.balance },
    ]
  }

  return (
    <div className="h-[290px] w-[300px]">
      <ChartContainer config={chartConfig} className="z-50 aspect-square">
        <RadarChartX data={chartData}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
          />
        </RadarChartX>
      </ChartContainer>
    </div>
  )
}
