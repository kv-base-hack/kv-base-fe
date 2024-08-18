'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { FindGemsTabs } from './find-gems-tabs'
import {
  ActiveTab,
  tabs,
  tabToURLMapping,
  URLToTabMapping,
} from '@/types/find-gems'
import { FindGemsTabHeader } from '../gem-analytics/tabs/FindGemsTabHeader'

export const FindGemsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const router = useRouter()
  const currentCat = searchParams?.category?.toString()

  const activeTab: ActiveTab =
    currentCat && currentCat in URLToTabMapping
      ? URLToTabMapping[currentCat]
      : tabs[0]

  useEffect(() => {
    if (!currentCat || !(currentCat in URLToTabMapping)) {
      router.replace(`?category=${tabToURLMapping[tabs[0]]}`)
    }
  }, [currentCat, router])

  const handleActiveTab = (value: ActiveTab) => {
    router.push(`?category=${tabToURLMapping[value]}`)
  }

  return (
    <div className="mx-4 mt-2 h-full rounded-2xl border border-solid border-white/10 bg-black/50 p-6">
      <FindGemsTabHeader {...{ activeTab, handleActiveTab }} />
      <FindGemsTabs searchParams={searchParams} {...{ activeTab }} />
    </div>
  )
}
