import { portfolio } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_PORTFOLIO = 'GET_PORTFOLIO'

export const usePortfolioQuery = (groupId: string) =>
  useQuery({
    queryKey: [GET_PORTFOLIO, { groupId }],
    queryFn: () => portfolio(groupId),
  })
