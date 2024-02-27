import { getTopActivity } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_ACTIVITY = 'GET_TOP_ACTIVITY'

export const useTopActivityQuery = ({ action }: { action: string }) =>
  useQuery({
    queryKey: [GET_TOP_ACTIVITY, { action }],
    queryFn: () => getTopActivity({ action }),
  })
