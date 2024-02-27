import { getLeaderboard } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_LEADERBOARD = 'GET_LEADERBOARD'

export const useLeaderboardQuery = () =>
  useQuery({
    queryKey: [GET_LEADERBOARD],
    queryFn: () => getLeaderboard(),
  })
