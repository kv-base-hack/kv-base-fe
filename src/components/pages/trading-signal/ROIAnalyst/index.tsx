import { useGetRoiAnalystQuery } from '@/query/trading-signal/getROIAnalyst'
import { useState } from 'react'

export const ROIAlanyst = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const dataSignalQuery: any = useGetRoiAnalystQuery({ id, page, perPage })

  console.log({ dataSignalQuery })

  return (
    <div className="w-full text-center">
      <div className="">Coming Soon</div>
    </div>
  )
}
