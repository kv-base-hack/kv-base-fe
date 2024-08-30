import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { nFormatter } from '@/lib/utils/nFormatter'

import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { ImageToken } from '@/components/common/Image/ImageToken'

import { IconCart } from '@/components/shared/icons/spotlight'
import { IconUsers } from '@/components/ui/icons'
import { useQuery } from '@tanstack/react-query'
import { useLeaderboardSpotlightQuery } from '@/query/leaderboard/getLeaderboardSpotlight'
import { SPOTLIGHT_TYPES } from '@/constant/spotlight'
import {
  IconCoinHand,
  IconTrendUp,
} from '@/components/shared/icons/wallet-explorer/icon-trader-spotlight'
import { CardBalanceToken } from '@/components/common/Card/card-balance-token'
import { DataSpotlight } from '@/types/spotlight'
import { TooltipToken } from '@/components/common/Tooltip/tooltip-token'
import { CHAIN } from '@/constant/chain'

const PieChartX = PieChart as any

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
      return 'var(--color-Electrician)'
    case 4:
      return 'var(--color-DarkPurple)'
    default:
      return 'var(--color-Electrician)'
  }
}

export const TokenSpotLight = ({
  durationSpotlight,
}: {
  durationSpotlight: string
}) => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const leaderboardSpotlightQuery = useQuery(
    useLeaderboardSpotlightQuery({
      chain: CHAIN,
      duration: durationSpotlight,
    }),
  )

  const data = leaderboardSpotlightQuery?.data

  if (!data) return null

  const totalStats = Object.values(SPOTLIGHT_TYPES).reduce(
    (acc, type) => {
      const typeData = data[type] || {}
      acc.totalProfit += typeData.total_profit || 0
      acc.totalHold += typeData.hold_in_usdt || 0
      return acc
    },
    { totalProfit: 0, totalHold: 0 },
  )

  const formatData = Object.entries(SPOTLIGHT_TYPES).map(
    ([key, type], index) => ({
      type: key,
      profit: data[type]?.total_profit || 0,
      balance: data[type]?.hold_in_usdt || 0,
      realized: data[type]?.realized_percent || 0,
      symbol: data[type]?.symbol || '',
      imageUrl: data[type]?.image_url || '',
      percent: (data[type]?.total_profit || 0) / totalStats.totalProfit,
      fill: renderColorChart(index),
    }),
  )

  const dataChart = formatData.map((item) => ({
    ...item,
    balance: item.balance,
    profit: item.profit,
    realized: item.realized,
  }))

  return (
    <div className="flex h-full w-full flex-col lg:flex-row justify-between gap-10">
    <div className="h-[300px] lg:h-full w-full lg:w-1/2">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-full"
        >
          <PieChartX>
            <Pie
              data={dataChart}
              dataKey="percent"
              nameKey="type"
              innerRadius="64%"
              outerRadius="94%"
              strokeWidth={5}
              paddingAngle={8}
              cornerRadius={4}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {dataChart.map((_, index) => {
                const segmentColor = renderColorChart(index)
                const isActive = index === activeIndex
                return (
                  <Cell
                    key={`cell-${index}`}
                    style={{
                      filter: `drop-shadow(0px 0px 3px ${segmentColor}) ${isActive ? 'brightness(1.2)' : ''}`,
                      stroke: segmentColor,
                      strokeWidth: 2,
                      transition: 'all 0.3s ease',
                    }}
                  />
                )
              })}

              <Label
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox as any;
                  const radius = Math.min(cx, cy);
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        y={cy - radius * 0.3}
                        className="fill-light-telegray text-xs font-medium leading-4"
                      >
                        Total Hold Value
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy - radius * 0.15}
                        className="fill-neutral-100 text-[20px] font-bold leading-[32px]"
                      >
                        ${nFormatter(totalStats.totalHold)}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + radius * 0.2}
                        className="fill-[#D0D0DA] text-xs font-medium"
                      >
                        Total Profit
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + radius * 0.32}
                        className="fill-green text-lg font-bold"
                      >
                        +${nFormatter(totalStats.totalProfit)}
                      </tspan>
                    </text>
                  )
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
      </ResponsiveContainer>
    </div>

    <div className="w-full lg:w-2/3 flex flex-col gap-5 my-auto">
      <TokenSpotlight
        title="Most Profitable"
        icon={<IconTrendUp />}
        data={data?.most_profit}
      />
      <TokenSpotlight
        title="Largest Buy Volume"
        icon={<IconCart />}
        data={data?.most_buy_by_volume}
      />
      <TokenSpotlight
        title="Largest Hold Value"
        icon={<IconCoinHand />}
        data={data?.most_hold_by_volume}
      />
      <TokenSpotlight
        title="Most ST Buy"
        icon={<IconUsers />}
        data={data?.most_buy_by_user_number}
      />
      <TokenSpotlight
        title="Most ST Hold"
        icon={<IconUsers />}
        data={data?.most_buy_by_user_number}
      />
    </div>
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
        percent={data?.percent * 100}
        balance={data?.balance}
        realized={data?.realized}
        profit={data?.profit}
      />
    )
  }

  return null
}

const TokenSpotlight = ({
  title,
  icon,
  data,
}: {
  title: string
  icon: React.ReactNode
  data?: DataSpotlight
}) => {
  const { token_address: address, symbol, image_url } = data || {}

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 flex-1 items-center justify-center rounded-full bg-neutral-07 text-core">
          {icon}
        </div>
        <p className="text-base font-medium text-neutral-200">{title}</p>
      </div>

      <TooltipToken data={data} side="left">
        <Link
          href={`/smartmoney-onchain/token-explorer/${address}`}
          className="flex items-center gap-3"
        >
          <p className="text-base font-medium uppercase text-white">
            {symbol ? symbol : '-'}
          </p>
          {!symbol && !image_url ? (
            '-'
          ) : (
            <ImageToken imgUrl={image_url} symbol={symbol} />
          )}
        </Link>
      </TooltipToken>
    </div>
  )
}
