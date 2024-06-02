
import { getLeaderboard } from '@/services/leaderboard/api'
import { useQuery } from '@tanstack/react-query'

const GET_LEADERBOARD = 'GET_LEADERBOARD'

export const useLeaderboardQuery = ({
  chain,
  limit,
  start,
  sortBy,
  token_addresses = '',
}: {
  chain: string
  limit: number
  start: number
  sortBy: string
  token_addresses?: string
}) => ({
  queryKey: [GET_LEADERBOARD, { chain, limit, start, sortBy, token_addresses }],
  queryFn: async () => {
    const data = await getLeaderboard({ chain, limit, start, sortBy, token_addresses })
    return data.data
  }
})
