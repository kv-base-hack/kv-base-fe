import { tradeStatistic } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_TRADE_STATISTIC = 'GET_TRADE_STATISTIC'

export const tradeStatisticQueryOptions = (groupId: string) =>
  queryOptions({
    queryKey: [GET_TRADE_STATISTIC, { groupId }],
    queryFn: () => tradeStatistic(groupId),
  })
