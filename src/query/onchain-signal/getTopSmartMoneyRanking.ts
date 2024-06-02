import { getTopSmartMoneyRanking } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_SMART_MONEY_RANKING = 'GET_TOP_SMART_MONEY_RANKING'

export const useTopSmartMoneyRankingQuery = ({
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
    queryKey: [GET_TOP_SMART_MONEY_RANKING, { limit, duration, chain, start }],
    queryFn: () => getTopSmartMoneyRanking({ limit, duration, chain, start }),
  })
