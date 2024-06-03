import { getTrendingToken } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TRENDING_TOKEN = 'GET_TRENDING_TOKEN'
export const useTrendingTokenQuery = ({ chain, search = '', limit = 5 }: { chain: string; search?: string, limit?: number }) =>
  useQuery({
    queryKey: [GET_TRENDING_TOKEN, { chain, search, limit }],
    queryFn: () => getTrendingToken({ chain, search, limit }),
  })
