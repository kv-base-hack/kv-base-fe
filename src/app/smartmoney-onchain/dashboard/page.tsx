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
      <div className="flex items-ceter gap-2">
        <LastestAiSignal />
        <ActivitySpotlight limit={2} />
      </div>

      <div className="flex gap-2">
        <TableInsiderBuy />
        <TableNewListingBuy />
        <TableTopBuy />
      </div>

      <TablePerformanceToken />
    </div>
  )
}
