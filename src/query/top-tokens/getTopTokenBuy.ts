import { getTopTokenBuy } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_TOKEN_BUY = 'GET_TOP_TOKEN_BUY'

export const useGetTopTokenBuy = ({
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
      GET_TOP_TOKEN_BUY,
      { limit, duration, start, chain, action, enabled },
    ],
    enabled,
    queryFn: () => getTopTokenBuy({ limit, duration, start, chain, action }),
  })
