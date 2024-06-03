'use client'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TableFindGemsInsiderBuy } from '@/components/pages/find-gems/FindGemsInsiderBuy'
import { TableFindGemsSMNewListingBuy } from '@/components/pages/find-gems/FindGemsSMNewListingBuy'
import { TableFindGemsSMTopBuys } from '@/components/pages/find-gems/FindGemsSMTopBuys'
import { FindGemsTabHeader } from '@/components/pages/gem-analytics/tabs/FindGemsTabHeader'
import { FindGemsTabs } from '@/components/pages/gem-analytics/tabs/FindGemsTabs'
import { ActiveTab } from '@/components/pages/gem-analytics/tabs/types'
import { useState } from 'react'

export default function FindGems() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('SM Holding')

  const handleActiveTab = (value: ActiveTab) => {
    setActiveTab(value)
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-2">
        <TableFindGemsInsiderBuy />
        <TableFindGemsSMNewListingBuy />
        <TableFindGemsSMTopBuys />
      </div>
      <CardCommon className="mt-2">
        <FindGemsTabHeader {...{ activeTab, handleActiveTab }} />
        <FindGemsTabs {...{ activeTab }} />
      </CardCommon>
    </div>
  )
}
