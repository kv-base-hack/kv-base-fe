import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { nFormatter } from '@/lib/utils/nFormatter'

import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import React, { useMemo } from 'react'
import Link from 'next/link'
import { ImageToken } from '@/components/common/Image/ImageToken'
import CircularProgress from '@/components/common/CircularProgress'

import { IconUsers } from '@/components/ui/icons'
import { useQuery } from '@tanstack/react-query'
import {
  IconCoinHand,
  IconTrendUp,
  IconCart,
} from '@/components/shared/icons/wallet-explorer/icon-trader-spotlight'
import { useLeaderboardSpotlightQuery } from '@/query/leaderboard/getLeaderboardSpotlight'
import { CardBalanceToken } from '@/components/common/Card/card-balance-token'
import { TooltipToken } from '@/components/common/Tooltip/tooltip-token'

const PieChartX = PieChart as any

interface Token {
  token_address: string
  avg_price: number
  value_in_usdt: number
  value_in_token: number
  volume: number
  roi: number
  pnl: number
}

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
    default:
      return 'var(--color-Electrician)'
  }
}

export const TokenSpotLight = ({
  durationSpotlight,
}: {
  durationSpotlight: string
}) => {
  const leaderboardSpotlightQuery = useQuery(
    useLeaderboardSpotlightQuery({
      chain: 'base',
      duration: durationSpotlight,
    }),
  )

  const data = leaderboardSpotlightQuery?.data

  const volumeHold = data?.largest_position_by_max_holders?.value_in_usdt || 0
  const volumePnl = data?.largest_position_by_pnl?.value_in_usdt || 0
  const volumeBuy = data?.most_bought?.value_in_usdt || 0
  const volumeProfit = data?.most_profit?.value_in_usdt || 0

  const totalVol = volumeHold + volumePnl + volumeBuy + volumeProfit

  const dataChart = useMemo(() => {
    const result = [
      {
        type: 'largest hold value',
        volume: volumeHold,
        percent: volumeHold / totalVol,
        fill: renderColorChart(0),
      },
      {
        type: 'largest position by pnl',
        volume: volumePnl,
        percent: volumePnl / totalVol,
        fill: renderColorChart(1),
      },
      {
        type: 'most buy',
        volume: volumeBuy,
        percent: volumeBuy / totalVol,
        fill: renderColorChart(2),
      },
      {
        type: 'most profit',
        volume: volumeProfit,
        percent: volumeProfit / totalVol,
        fill: renderColorChart(3),
      },
    ]

    return result
  }, [totalVol, volumeBuy, volumeHold, volumePnl, volumeProfit])

  console.log(data)

  return (
    <div className="flex h-full w-full justify-between gap-10">
      <div className="h-full w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square"
          >
            <PieChartX>
              <Pie
                data={dataChart}
                dataKey="percent"
                nameKey="type"
                innerRadius={90}
                outerRadius={130}
                strokeWidth={5}
                paddingAngle={8}
                cornerRadius={4}
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
        </ResponsiveContainer>
      </div>

      <div className="my-auto flex w-2/3 flex-col gap-5">
        <TokenSpotlight
          title="Most Profitable"
          symbol={data?.most_profit?.symbol}
          icon={<IconTrendUp />}
          image_url={data?.most_profit?.image_url}
          address={data?.most_profit?.token_address}
          data={data?.most_profit}
        />
        <TokenSpotlight
          title="Largest Buy Volume"
          symbol={data?.most_bought?.symbol}
          icon={<IconCart />}
          image_url={data?.most_bought?.image_url}
          address={data?.most_bought?.token_address}
          data={data?.most_bought}
        />
        <TokenSpotlight
          title="Largest Hold Value"
          symbol={data?.largest_position_by_max_holders?.symbol}
          icon={<IconCoinHand />}
          image_url={data?.largest_position_by_max_holders?.image_url}
          address={data?.largest_position_by_max_holders?.token_address}
          data={data?.largest_position_by_max_holders}
        />
        <TokenSpotlight
          title="Most ST Buy"
          icon={<IconUsers />}
          symbol={data?.most_bought?.symbol}
          image_url={data?.most_bought?.image_url}
          address={data?.most_bought?.token_address}
          data={data?.most_bought}
        />
        <TokenSpotlight title="Most ST Hold" icon={<IconUsers />} data={[]} />
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
        percent={data?.vol * 100}
        balance={data?.balance}
      />
    )
  }

  return null
}

const TokenSpotlight = ({
  title,
  symbol,
  icon,
  image_url,
  address,
  data,
}: {
  title: string
  symbol?: string
  address?: string
  icon: React.ReactNode
  image_url?: string
  data?: any
}) => {
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
