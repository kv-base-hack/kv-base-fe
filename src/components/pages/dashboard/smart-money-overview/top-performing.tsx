'use client'

import { WrapTable } from '@/components/common/DataTable/WrapTable'
import SmartMoneyTopPerformingIcon from '@/components/shared/icons/dashboard/SmartMoneyTopPerformingIcon'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import React, { Suspense } from 'react'
import { useWindowSize } from 'react-use'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { CHAIN } from '@/constant/chain'
import { SelectDurationLeaderboard } from '@/components/common/Select/SelectDuration/select-duration-leaderboard'
import { BarChartTopPerformingTokens } from './chart/bar-chart-top-performing-tokens'

export const TopPerformingTokens = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentDuration = searchParams?.ttp_duration?.toString() || '1d'

  const barChartRef = React.useRef<HTMLDivElement>(null)
  const [widthChart, setWidthChart] = React.useState(0)
  const { width } = useWindowSize()
  const [, setFilterDate] = useQueryState('ttp_duration', {
    defaultValue: currentDuration,
    history: 'push',
    shallow: false,
  })

  const topTokenProfitQuery = useSuspenseQuery(
    useTopTokenProfitQuery({
      limit: 8,
      start: 1,
      chain: CHAIN,
      duration: currentDuration,
      sort_by: '',
    }),
  )

  const dataTopTokenProfit = topTokenProfitQuery.isFetching
    ? [...(Array(8).keys() as any)]
    : topTokenProfitQuery?.data?.top_smart_money_token_profit?.map(
        (item, index) => {
          return {
            ...item,
            index: index + 1,
          }
        },
      ) || []

  React.useEffect(() => {
    setWidthChart((barChartRef?.current?.clientWidth as number) - 40)
  }, [width])
  return (
    <div className="h-full w-full" ref={barChartRef}>
      <WrapTable
        icon={<SmartMoneyTopPerformingIcon />}
        title={
          <div className="flex items-center gap-2">Top Performing Tokens</div>
        }
        info="Top tokens bought by Smart Traders ranked by PnL earned."
        moreInfo={
          <div className="flex items-center gap-2">
            <SelectDurationLeaderboard
              duration={currentDuration}
              setDuration={setFilterDate}
              type="option3"
            />
          </div>
        }
      >
        <Suspense fallback={<div>loading...</div>}>
          <BarChartTopPerformingTokens
            data={dataTopTokenProfit}
            width={widthChart}
          />
        </Suspense>
      </WrapTable>
    </div>
  )
}
