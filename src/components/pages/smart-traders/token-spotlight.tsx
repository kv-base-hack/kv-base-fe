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
import { CHAIN } from '@/constant/chain'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useLeaderboardSpotlightQuery } from '@/query/leaderboard/getLeaderboardSpotlight'
import { SPOTLIGHT_TYPES } from '@/constant/spotlight'
import { IconCoinHand, IconTrendUp } from '@/components/shared/icons/wallet-explorer/icon-trader-spotlight'
import { CardBalanceToken } from '@/components/common/Card/card-balance-token'
import { DataSpotlight } from '@/types/spotlight'
import { TooltipToken } from '@/components/common/Tooltip/tooltip-token'

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

  const findGemsSTHoldingQuery = useQuery(
    useFindGemsSmartMoneyHoldingQuery({
      limit: 10,
      start: 1,
      chain: CHAIN,
      duration: durationSpotlight,
      sort_by: 'hold_in_usdt',
    }),
  )

  const data = leaderboardSpotlightQuery?.data
  const dataTokenHolding = findGemsSTHoldingQuery?.data?.smart_money_holding

  const totalStats = useMemo(() => {
    if (!data) return { totalProfit: 0, totalHold: 0 }
    return Object.values(SPOTLIGHT_TYPES).reduce(
      (acc, type) => {
        const typeData = data[type] || {}
        acc.totalProfit += typeData.total_profit || 0
        acc.totalHold += typeData.hold_in_usdt || 0
        return acc
      },
      { totalProfit: 0, totalHold: 0 },
    )
  }, [data])

  const formatDataChart = useMemo(() => {
    if (!dataTokenHolding) return []
    const topTen = dataTokenHolding.map((item, index) => ({
      type: item.symbol,
      balance: item.hold_in_usdt,
      profit: item.pnl,
      realized: item.realized_percent,
      symbol: item.symbol,
      imageUrl: item.image_url,
      percent: item.hold_in_usdt / totalStats.totalHold,
      roi: item.roi,
      fill: renderColorChart(index),
    }))

    const otherHold =
      totalStats.totalHold -
      dataTokenHolding.reduce((acc, item) => acc + item.hold_in_usdt, 0)
    const otherProfit =
      totalStats.totalProfit -
      dataTokenHolding.reduce((acc, item) => acc + item.pnl, 0)

    return [
      ...topTen,
      {
        type: 'Other',
        balance: otherHold,
        profit: otherProfit,
        symbol: 'Other',
        percent: otherHold / totalStats.totalHold,
        fill: 'var(--color-Electrician)',
      },
    ]
  }, [dataTokenHolding, totalStats.totalHold, totalStats.totalProfit])

  if (!data) return null

  return (
    <div className="flex h-full w-full flex-col justify-between gap-10 lg:flex-row">
      <div className="h-[300px] w-full lg:h-full lg:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-full w-full"
          >
            <PieChartX>
              <Pie
                data={formatDataChart}
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
                {formatDataChart.map((entry, index) => {
                  const isActive = index === activeIndex
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      style={{
                        filter: `drop-shadow(0px 0px 3px ${entry.fill})  ${isActive ? 'brightness(1.2)' : ''}`,
                        stroke: entry.fill,
                        strokeWidth: 2,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  )
                })}
                <Label
                  content={({ viewBox }) => (
                    <CenterLabel
                      viewBox={viewBox}
                      totalHold={totalStats?.totalHold}
                      totalProfit={totalStats?.totalProfit}
                    />
                  )}
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

      <div className="my-auto flex w-full flex-col gap-5 lg:w-2/3">
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

const CenterLabel = React.memo(
  ({
    viewBox,
    totalHold,
    totalProfit,
  }: {
    viewBox: any
    totalHold: number
    totalProfit: number
  }) => {
    const { cx, cy } = viewBox
    const radius = Math.min(cx, cy)
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
      <tspan
        x={cx}
        y={cy - radius * 0.26}
        className="fill-light-telegray text-xs font-medium leading-4"
      >
        Total Hold Value
      </tspan>
      <tspan
        x={cx}
        y={cy - radius * 0.1}
        className="fill-neutral-100 text-[20px] font-bold leading-[32px]"
      >
        ${nFormatter(totalHold || 0)}
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
        y={cy + radius * 0.35}
        className="fill-green text-lg font-bold"
      >
        +${nFormatter(totalProfit || 0)}
      </tspan>
    </text>
  )
})
CenterLabel.displayName = 'CenterLabel'

const CustomTooltip = React.memo(
  ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (!active || !payload || payload.length === 0) return null

    const data = payload[0].payload

    return (
      <CardBalanceToken
        color={data.fill}
        symbol={data.symbol}
        imgUrl={data.imageUrl || data.image_url}
        percent={data.percent * 100}
        balance={data.balance}
        realized={data.realized}
        profit={data.profit}
        roi={data.roi}
      />
    )
  },
)
CustomTooltip.displayName = 'CustomTooltip'

const TokenSpotlight = React.memo(
  ({
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
  },
)
TokenSpotlight.displayName = 'TokenSpotlight'
