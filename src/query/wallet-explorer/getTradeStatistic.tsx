import { tradeStatistic } from '@/services/api'

const GET_TRADE_STATISTIC = 'GET_TRADE_STATISTIC'

export const useTradeStatisticQuery = ({
  address,
  chain,
  duration,
  token_address,
}: {
  address: string
  chain: string
  duration: string
  token_address: string
}) => ({
  queryKey: [GET_TRADE_STATISTIC, { address, chain, duration, token_address }],
  queryFn: async () => {
    const result = await tradeStatistic({
      address,
      chain,
      duration,
      token_address,
    })
    return result.data
  },
})
