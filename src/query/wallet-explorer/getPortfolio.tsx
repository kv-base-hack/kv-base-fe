import { portfolio } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_PORTFOLIO = 'GET_PORTFOLIO'

export const portfolioQueryOptions = (groupId: string) =>
  queryOptions({
    queryKey: [GET_PORTFOLIO, { groupId }],
    queryFn: () => portfolio(groupId),
  })
