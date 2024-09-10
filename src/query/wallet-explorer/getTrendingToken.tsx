import { getTrendingToken } from '@/services/api'

export const GET_TRENDING_TOKEN = 'GET_TRENDING_TOKEN'
export const useTrendingTokenQuery = ({
  chain,
  search = '',
  limit = 5,
  enabled = true,
}: {
  chain: string
  search?: string
  limit?: number
  enabled?: boolean
}) => ({
  queryKey: [GET_TRENDING_TOKEN, { chain, search, limit, enabled }],
  enabled,
  queryFn: async () => {
    const result = await getTrendingToken({ chain, search, limit })
    return result.data
  },
})
