import { getTopTokenProfit } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_TOKEN_PROFIT = 'GET_TOP_TOKEN_PROFIT'

export const useTopTokenProfitQuery = ({
  duration,
  limit,
  start,
  chain,
  sort_by,
}: {
  duration: string
  limit: number
  start: number
  chain: string
  sort_by?: string
}) =>
  useQuery({
    queryKey: [GET_TOP_TOKEN_PROFIT, { duration, limit, start, chain, sort_by }],
    queryFn: () => getTopTokenProfit({ duration, limit, start, chain, sort_by }),
  })
