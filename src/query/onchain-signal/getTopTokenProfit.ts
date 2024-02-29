import { getTopTokenProfit } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_TOKEN_PROFIT = 'GET_TOP_TOKEN_PROFIT'

export const useTopTokenProfitQuery = ({
  duration,
  limit,
  start,
  chain,
}: {
  duration: string
  limit: number
  start: number
  chain: string
}) =>
  useQuery({
    queryKey: [GET_TOP_TOKEN_PROFIT, { duration, limit, start, chain }],
    queryFn: () => getTopTokenProfit({ duration, limit, start, chain }),
  })
