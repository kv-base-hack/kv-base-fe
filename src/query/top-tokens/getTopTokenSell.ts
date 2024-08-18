import { getTopTokenSell } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_TOKEN_SELL = 'GET_TOP_TOKEN_SELL'

export const useGetTopTokenSell = ({
  limit,
  duration,
  start,
  chain,
  action,
  enabled = true,
}: {
  limit: number
  duration: string
  start: number
  chain: string
  action: string
  enabled?: boolean
}) =>
  useQuery({
    queryKey: [
      GET_TOP_TOKEN_SELL,
      { limit, duration, start, chain, action, enabled },
    ],
    enabled,
    queryFn: () => getTopTokenSell({ limit, duration, start, chain, action }),
  })
