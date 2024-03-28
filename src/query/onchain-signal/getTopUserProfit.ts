import { getTopUserProfit } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_USER_PROFIT = 'GET_TOP_USER_PROFIT'

export const useTopUserProfitQuery = ({
  limit,
  duration,
  chain,
  start,
}: {
  duration: string
  chain: string
  start: number
  limit: number
}) =>
  useQuery({
    queryKey: [GET_TOP_USER_PROFIT, { limit, duration, chain, start }],
    queryFn: () => getTopUserProfit({ limit, duration, chain, start }),
  })
