import { getTrendingToken } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TRENDING_TOKEN = 'GET_TRENDING_TOKEN'
export const useTrendingTokenQuery = () =>
  useQuery({
    queryKey: [GET_TRENDING_TOKEN],
    queryFn: () => getTrendingToken(),
  })
