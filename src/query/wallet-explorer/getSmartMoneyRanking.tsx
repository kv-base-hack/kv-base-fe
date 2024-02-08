import { fetchSmartMoneyRanking } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const SMART_MONEY_RANKING = 'SMART_MONEY_RANKING'
export const smartMoneyRankingQueryOptions = queryOptions({
  queryKey: [SMART_MONEY_RANKING],
  queryFn: () => fetchSmartMoneyRanking(),
})
