'use client'

import { categoryAtom } from '@/atom/category'
import { TableInsiderBuy } from '@/components/Leaderboard/Table/TableInsiderBuy'
import { TableNewListingBuy } from '@/components/Leaderboard/Table/TableNewListingBuy'
import { TableTopBuy } from '@/components/Leaderboard/Table/TableTopBuy'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { FindGemsTabHeader } from '@/components/pages/gem-analytics/tabs/FindGemsTabHeader'
import { FindGemsTabs } from '@/components/pages/gem-analytics/tabs/FindGemsTabs'
import { ActiveTab } from '@/components/pages/gem-analytics/tabs/types'
import { useAtom } from 'jotai'

export default function FindGems() {
  const [activeTab, setActiveTab] = useAtom<ActiveTab>(categoryAtom)

  const handleActiveTab = (value: ActiveTab) => {
    setActiveTab(value)
  }

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-2">
        <TableInsiderBuy limit={3} pagination={false} detail={false} />
        <TableNewListingBuy limit={3} pagination={false} detail={false} />
        <TableTopBuy limit={3} pagination={false} detail={false} />
      </div>
      <CardCommon className="mt-2">
        <FindGemsTabHeader {...{ activeTab, handleActiveTab }} />
        <FindGemsTabs {...{ activeTab }} />
      </CardCommon>
    </div>
  )
}
