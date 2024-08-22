import React from 'react'
import { ActiveTab } from '@/types/find-gems'
import { FindGemsTabSmartHolding } from '../gem-analytics/tabs/FindGemsTabSmartHolding'
import { FindGemsTabTopBuys } from './tables/table-find-gems-top-buys'
import { FindGemsTabSMNewListingsBuy } from './tables/table-find-gems-new-listing-buy'
import { FindGemsTabFreshWalletUnusual } from './tables/table-unusual-buy'
import { FindGemsFirstTimeBuy } from './tables/table-first-time-buy'
import { FindGemsTopAiScore } from './tables/table-top-ai-score'

interface FindGemsTabsProps {
  activeTab: ActiveTab
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabs: React.FunctionComponent<FindGemsTabsProps> = ({
  activeTab,
  searchParams,
}) => {
  switch (activeTab) {
    case 'ST Holding':
      return (
        <FindGemsTabSmartHolding tab={activeTab} searchParams={searchParams} />
      )
    case 'ST Top Buy':
      return <FindGemsTabTopBuys tab={activeTab} searchParams={searchParams} />
    case 'ST New Listing Buys':
      return (
        <FindGemsTabSMNewListingsBuy
          tab={activeTab}
          searchParams={searchParams}
        />
      )
    case 'Unusual Buying':
      return (
        <FindGemsTabFreshWalletUnusual
          tab={activeTab}
          searchParams={searchParams}
        />
      )
    case 'ST First Time Buy':
      return (
        <FindGemsFirstTimeBuy tab={activeTab} searchParams={searchParams} />
      )
    case 'Top AI Score':
      return <FindGemsTopAiScore tab={activeTab} searchParams={searchParams} />
    default:
      return (
        <FindGemsTabFreshWalletUnusual
          tab={activeTab}
          searchParams={searchParams}
        />
      )
  }
}
