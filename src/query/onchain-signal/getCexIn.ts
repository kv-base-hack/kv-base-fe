import { getCexIn } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_CEX_IN = 'GET_CEX_IN'

export const useCexInQuery = ({
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
    queryKey: [GET_CEX_IN, { limit, duration, start, chain }],
    queryFn: () => getCexIn({ limit, duration, start, chain }),
  })
