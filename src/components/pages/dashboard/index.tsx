'use client'

import { useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'react-use'
import { SmartMoneyOverview } from './smart-money-overview'
import { LastestSpotlight } from './lastest-signal/lastest-spotlight'
import { LastestSignal } from './lastest-signal/lastest-signal'
import { TopCoin } from './top-coin'

export default function Dashboard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { width } = useWindowSize()

  const [tab, setTab] = useState('cex_withdraw_and_deposit')
  const barChartSmartTraderRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)
  const [, setWidthChartSmartTrader] = useState(0)
  const [, setWidthChart] = useState(0)

  useEffect(() => {
    if (width <= 425) {
      setTab('cex_withdraw')
    } else if (width <= 834) {
      setTab('cex_withdraw_and_deposit')
    } else {
      setTab('')
    }
  }, [width])

  useEffect(() => {
    setWidthChart((barChartRef?.current?.clientWidth as number) - 40)
    setWidthChartSmartTrader(
      (barChartSmartTraderRef?.current?.clientWidth as number) - 40,
    )
  }, [width])
  //

  return (
    <div className="h-full w-full">
      {/* sm overview */}
      <SmartMoneyOverview searchParams={searchParams} />

      {/* lastest signal */}
      <div className="mx-4 mt-2 flex flex-col gap-2 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <LastestSpotlight />
        </div>
        <div className="w-full lg:w-1/2">
          <LastestSignal />
        </div>
      </div>

      {/* top coin */}
      <TopCoin
        width={width}
        tab={tab}
        searchParams={searchParams}
        className="m-0 lg:mx-4 lg:mt-2"
      />
    </div>
  )
}
