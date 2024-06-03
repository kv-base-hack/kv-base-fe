import React from 'react'
import { ActiveTab } from './types'
import { FindGemsTabTopCexWithdraw } from './FindGemsTabTopCexWithdraw'
import { FindGemsTabSmartHolding } from './FindGemsTabSmartHolding'
import { FindGemsTabTopBuys } from './FindGemsTabTopBuys'
import { FindGemsTabTopSells } from './FindGemsTabTopSells'
import { FindGemsTabSMNewListingsBuy } from './FindGemsTabSMNewListingsBuy'
import { FindGemsTabFreshWalletUnusual } from './FindGemsTabFreshWalletUnusual'
import { FindGemsTabTopCexDeposit } from './FindGemsTabTopCexDeposit'
import { FindGemsTabUnusualCex } from './FindGemsTabUnusualCex'

interface FindGemsTabsProps {
  activeTab: ActiveTab
}

export const FindGemsTabs: React.FunctionComponent<FindGemsTabsProps> = ({
  activeTab,
}) => {
  switch (activeTab) {
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
    case 'Top CEX Withdraw':
      return <FindGemsTabTopCexWithdraw tab={activeTab} />
    case 'Top CEX Deposit':
      return <FindGemsTabTopCexDeposit tab={activeTab} />
    case 'Unusual CEX':
      return <FindGemsTabUnusualCex tab={activeTab} />
    default:
      return <FindGemsTabSmartHolding tab={activeTab} />
  }
}
