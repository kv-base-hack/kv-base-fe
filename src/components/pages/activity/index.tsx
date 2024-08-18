'use client'

import { SpotlightByAI } from './spotlight-by-ai'
import { TraderActivity } from './trader-activity'

export const Activity = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  //
  return (
    <div className="h-full w-full px-4">
      <SpotlightByAI searchParams={searchParams} />
      <TraderActivity searchParams={searchParams} />
    </div>
  )
}
