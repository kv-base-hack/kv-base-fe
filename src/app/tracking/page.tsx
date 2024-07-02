'use client'

import { ActivitySpotlight } from '@/components/Leaderboard/ActivitySpotlight'
import { TableSMActivity } from '@/components/Leaderboard/Table/TableSMActivity'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { useEffect, useState } from 'react'

export default function TrackingPae() {
  const [limit, setLimit] = useState(5)

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth

      if (newWidth > 1440) {
        setLimit(5)
      } else if (newWidth > 1080 && newWidth <= 1440) {
        setLimit(4)
      } else if (newWidth > 800 && newWidth <= 1080) {
        setLimit(3)
      } else {
        setLimit(2)
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <ActivitySpotlight limit={limit} />
      <CardCommon>
        <TableSMActivity />
      </CardCommon>
    </div>
  )
}
