import { getTopTokenProfit } from '@/services/api'

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
}) => ({
  queryKey: [GET_TOP_TOKEN_PROFIT, { duration, limit, start, chain, sort_by }],
  queryFn: async () => {
    const result = await getTopTokenProfit({
      duration,
      limit,
      start,
      chain,
      sort_by,
    })
    return result.data
  },
})
