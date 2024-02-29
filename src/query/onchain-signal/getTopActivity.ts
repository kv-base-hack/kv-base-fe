import { getTopActivity } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_ACTIVITY = 'GET_TOP_ACTIVITY'

export const useTopActivityQuery = ({
  action,
  limit,
  start,
  chain,
}: {
  action: string
  limit: number
  start: number
  chain: string
}) =>
  useQuery({
    queryKey: [GET_TOP_ACTIVITY, { action, limit, start, chain }],
    queryFn: () => getTopActivity({ action, limit, start, chain }),
  })
