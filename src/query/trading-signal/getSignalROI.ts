import { getTotalSignalROI } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOTAL_SIGNAL_ROI = 'GET_TOTAL_SIGNAL_ROI'

export const useGetTotalSignalROIQuery = () =>
  useQuery({
    queryKey: [GET_TOTAL_SIGNAL_ROI],
    queryFn: () => getTotalSignalROI(),
  })
