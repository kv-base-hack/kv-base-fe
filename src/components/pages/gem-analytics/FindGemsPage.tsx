'use client'
import { GroupHeader } from '@/components/common/GroupHeader'
import React, { useState } from 'react'
import { FindGemsTabs } from './tabs/FindGemsTabs'
import { ActiveTab } from './tabs/types'
import { FindGemsTabHeader } from './tabs/FindGemsTabHeader'

export const FindGemsPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Dashboard')

  const handleActiveTab = (value: ActiveTab) => {
    setActiveTab(value)
  }

  return (
    <div className="w-full h-full pt-4">
      <GroupHeader className="mx-2 md:mx-10" title="Gem Analytics" />
      <FindGemsTabHeader {...{ activeTab, handleActiveTab }} />
      <FindGemsTabs {...{ activeTab }} />
    </div>
  )
}
