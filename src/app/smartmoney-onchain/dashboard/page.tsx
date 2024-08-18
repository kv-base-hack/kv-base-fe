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
    <div className="flex h-full w-full flex-col gap-2">
      <SMMoneyOverview />
      <div className="items-ceter flex flex-col gap-2 xl:flex-row">
        <LastestAiSignal />
        <ActivitySpotlight limit={2} />
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
        <TableInsiderBuy limit={5} />
        <TableNewListingBuy limit={5} />
        <TableTopBuy limit={5} />
      </div>

      <TablePerformanceToken />
    </div>
  )
}
