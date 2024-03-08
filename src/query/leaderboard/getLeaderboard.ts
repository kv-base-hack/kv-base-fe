import { getLeaderboard } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_LEADERBOARD = 'GET_LEADERBOARD'

export const useLeaderboardQuery = ({
  chain,
  limit,
  start,
}: {
  chain: string
  limit: number
  start: number
}) =>
  useQuery({
    queryKey: [
      GET_LEADERBOARD,
      {
        chain,
        limit,
        start,
      },
    ],
    queryFn: () =>
      getLeaderboard({
        chain,
        limit,
        start,
      }),
  })
