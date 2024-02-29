import { getCexOut } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_CEX_OUT = 'GET_CEX_OUT'

export const useCexOutQuery = ({
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
    queryKey: [GET_CEX_OUT, { limit, duration, start, chain }],
    queryFn: () => getCexOut({ limit, duration, start, chain }),
  })
