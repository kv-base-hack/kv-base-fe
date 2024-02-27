import { tradeStatistic } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TRADE_STATISTIC = 'GET_TRADE_STATISTIC'

export const useTradeStatisticQuery = (groupId: string) =>
  useQuery({
    queryKey: [GET_TRADE_STATISTIC, { groupId }],
    queryFn: () => tradeStatistic(groupId),
  })
