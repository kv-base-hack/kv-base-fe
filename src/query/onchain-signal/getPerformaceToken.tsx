import { performanceTokenOnchain } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_PERFORMANCE_TOKEN = 'GET_PERFORMANCE_TOKEN'

export const performanceTokenQueryOptions = () =>
  queryOptions({
    queryKey: [GET_PERFORMANCE_TOKEN],
    queryFn: () => performanceTokenOnchain(),
  })
