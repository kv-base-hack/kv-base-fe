import { tradeStatisticTokens } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TRADE_STATISTIC_TOKENS = 'GET_TRADE_STATISTIC_TOKENS'

export const useTradeStatisticTokensQuery = ({
  address,
  chain,
  duration,
  token_address,
  sort_by,
  page = 1,
  perPage = 10,
}: {
  address: string
  chain: string
  duration: string
  token_address: string
  sort_by: string
  page?: number
  perPage?: number
}) => ({
  queryKey: [
    GET_TRADE_STATISTIC_TOKENS,
    { address, chain, duration, token_address, sort_by, page, perPage },
  ],
  queryFn: async () => {
    const data = await tradeStatisticTokens({
      address,
      chain,
      duration,
      token_address,
      sort_by,
    })
    return data.data
  },
})
