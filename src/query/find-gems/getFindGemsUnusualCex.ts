import { getFindGemsUnusualCex } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_FIND_GEMS_UNUSUAL_CEX = 'GET_FIND_GEMS_UNUSUAL_CEX'

export const useFindGemsUnusualCexQuery = ({
  chain,
  limit,
  start,
  enabled,
}: {
  chain: string
  limit: number
  start: number
  enabled?: boolean
}) =>
  useQuery({
    queryKey: [
      GET_FIND_GEMS_UNUSUAL_CEX,
      {
        chain,
        limit,
        start,
        enabled,
      },
    ],
    enabled,
    queryFn: () =>
      getFindGemsUnusualCex({
        chain,
        limit,
        start,
      }),
  })
