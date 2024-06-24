'use client'

import { ActivitySpotlight } from '@/components/Leaderboard/ActivitySpotlight'
import { TableSMActivity } from '@/components/Leaderboard/Table/TableSMActivity'
import { CardCommon } from '@/components/common/Card/CardCommon'

export default function TrackingPae() {
  return (
    <div className="flex flex-col gap-4">
      <ActivitySpotlight limit={4} />
      <CardCommon>
        <TableSMActivity />
      </CardCommon>
    </div>
  )
}
