'use client'
import React from 'react'
import { FindGemsTabHeader } from '../gem-analytics/tabs/FindGemsTabHeader'
import { FindGemsTabs } from './find-gems-tabs'

export const FindGemsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <div className="mx-4 mt-2 h-full rounded-2xl border border-solid border-white/10 bg-black/50 p-6">
      <FindGemsTabHeader searchParams={searchParams} />
      <FindGemsTabs searchParams={searchParams} />
    </div>
  )
}
