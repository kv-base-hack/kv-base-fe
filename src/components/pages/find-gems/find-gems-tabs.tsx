'use client'

import React from 'react'
import { FindGemsTabSmartHolding } from '../gem-analytics/tabs/FindGemsTabSmartHolding'
import { FindGemsTabSMNewListingsBuy } from './tables/table-find-gems-new-listing-buy'
import { FindGemsTabTopBuys } from './tables/table-find-gems-top-buys'
import { FindGemsFirstTimeBuy } from './tables/table-first-time-buy'
import { FindGemsTabFreshWalletUnusual } from './tables/table-unusual-buy'
import { FindGemsTopAiScore } from './tables/table-top-ai-score'

interface FindGemsTabsProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabs: React.FunctionComponent<FindGemsTabsProps> = ({
  searchParams,
}) => {
  const currentCategory = searchParams?.category?.toString() || ''

  switch (currentCategory) {
    case 'unusual-buying':
      return (
        <FindGemsTabFreshWalletUnusual
          tab={currentCategory}
          searchParams={searchParams}
        />
      )
    case 'st-new-listing-buys':
      return (
        <FindGemsTabSMNewListingsBuy
          tab={currentCategory}
          searchParams={searchParams}
        />
      )
    case 'st-holding':
      return (
        <FindGemsTabSmartHolding
          tab={currentCategory}
          searchParams={searchParams}
        />
      )
    case 'st-top-buy':
      return (
        <FindGemsTabTopBuys tab={currentCategory} searchParams={searchParams} />
      )
    case 'st-first-time-buy':
      return (
        <FindGemsFirstTimeBuy
          tab={currentCategory}
          searchParams={searchParams}
        />
      )
    case 'top-score-by-ai':
      return (
        <FindGemsTopAiScore tab={currentCategory} searchParams={searchParams} />
      )
    default:
      return null
  }
}
