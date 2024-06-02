import { getCexWithdraw } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_CEX_WITHDRAW = 'GET_CEX_WITHDRAW'

export const useCexWithdrawQuery = ({
  limit,
  duration,
  start,
  chain,
}: {
  limit: number
  duration: string
  start: number
  chain: string
}) =>
  useQuery({
    queryKey: [GET_CEX_WITHDRAW, { limit, duration, start, chain }],
    queryFn: () => getCexWithdraw({ limit, duration, start, chain }),
  })
