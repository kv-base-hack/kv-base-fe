'use client'

import { LastestAiSignal } from '@/components/Leaderboard/LastestAiSignal'
import { ActivitySpotlight } from '@/components/Leaderboard/ActivitySpotlight'
import { TableInsiderBuy } from '@/components/Leaderboard/Table/TableInsiderBuy'
import { TableNewListingBuy } from '@/components/Leaderboard/Table/TableNewListingBuy'
import { TableTopBuy } from '@/components/Leaderboard/Table/TableTopBuy'
import { TablePerformanceToken } from '@/components/Leaderboard/Table/TableTopPerformingTokens'
import { SMMoneyOverview } from '@/components/Dashboard/SMOverView'

export default function Leaderboard() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <SMMoneyOverview />
      <div className="flex flex-col xl:flex-row items-ceter gap-2">
        <LastestAiSignal />
        <ActivitySpotlight limit={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <TableInsiderBuy limit={5} />
        <TableNewListingBuy limit={5} />
        <TableTopBuy limit={5} />
      </div>

      <TablePerformanceToken />
    </div>
  )
}
