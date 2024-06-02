import React from 'react'
import { ActiveTab } from './types'
import { FindGemsTabTopCexWithdraw } from './FindGemsTabTopCexWithdraw'
import { FilterValue } from '@/components/common/Dialog/DialogFilterSpecificToken'
import { FindGemsTabSmartHolding } from './FindGemsTabSmartHolding'
import { FindGemsTabTopBuys } from './FindGemsTabTopBuys'
import { FindGemsTabTopSells } from './FindGemsTabTopSells'
import { FindGemsTabSMNewListingsBuy } from './FindGemsTabSMNewListingsBuy'
import { FindGemsTabFreshWalletUnusual } from './FindGemsTabFreshWalletUnusual'
import FindGemsTabDashboard from './FindGemsTabDashboard'

interface FindGemsTabsProps {
  activeTab: ActiveTab
}

export const FindGemsTabs: React.FunctionComponent<FindGemsTabsProps> = ({
  activeTab,
}) => {
  switch (activeTab) {
    case 'Dashboard':
      return <FindGemsTabDashboard />
    case 'SM Holding':
      return <FindGemsTabSmartHolding tab={activeTab} />
    case 'SM Top Buys':
      return <FindGemsTabTopBuys tab={activeTab} />
    case 'SM Top Sells':
      return <FindGemsTabTopSells tab={activeTab} />
    case 'SM New Listing Buys':
      return <FindGemsTabSMNewListingsBuy tab={activeTab} />
    case 'Unusual Buying':
      return <FindGemsTabFreshWalletUnusual tab={activeTab} />
    case 'SM CEX Withdraw':
      return <FindGemsTabTopCexWithdraw tab={activeTab} />
    default:
      return <FindGemsTabSmartHolding tab={activeTab} />
  }
}
