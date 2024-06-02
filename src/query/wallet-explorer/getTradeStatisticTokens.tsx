import { tradeStatisticTokens } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TRADE_STATISTIC_TOKENS = 'GET_TRADE_STATISTIC_TOKENS'

export const useTradeStatisticTokensQuery = ({
  address,
  chain,
  duration,
  token_address,
  sort_by,
}: {
  address: string
  chain: string
  duration: string
  token_address: string
  sort_by: string
}) =>
  useQuery({
    queryKey: [
      GET_TRADE_STATISTIC_TOKENS,
      { address, chain, duration, token_address, sort_by },
    ],
    queryFn: () =>
      tradeStatisticTokens({
        address,
        chain,
        duration,
        token_address,
        sort_by,
      }),
  })
