import { getFindGemsTrending } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_FIND_GEMS_TRENDING = 'GET_FIND_GEMS_TRENDING'

export const useFindGemsTrendingQuery = ({
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
      GET_FIND_GEMS_TRENDING,
      {
        chain,
        limit,
        start,
        enabled,
      },
    ],
    enabled,
    queryFn: () =>
      getFindGemsTrending({
        chain,
        limit,
        start,
      }),
  })
