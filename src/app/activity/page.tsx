'use client'

import { ActivitySpotlight } from '@/components/Leaderboard/ActivitySpotlight'
import { TableSMActivity } from '@/components/Leaderboard/Table/TableSMActivity'
import { ActivityTabHeader } from '@/components/Leaderboard/Tabs/ActivityTabHeader'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { ActiveTab } from '@/types/tabs/TabActivityHeader'
import { useState } from 'react'

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Smart Money Activity')
  const handleActiveTab = (value: ActiveTab) => {
    setActiveTab(value)
  }

  return (
    <div className="flex flex-col gap-4">
      <ActivitySpotlight limit={4} />
      <CardCommon>
        <ActivityTabHeader {...{ activeTab, handleActiveTab }} />
        <TableSMActivity />
      </CardCommon>
    </div>
  )
}
