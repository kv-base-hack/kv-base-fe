import { getLeaderboard } from '@/services/api'

const GET_LEADERBOARD = 'GET_LEADERBOARD'

export const useLeaderboardQuery = ({
  chain,
  limit,
  start,
  sortBy,
  token_addresses = '',
  duration,
  enabled = true,
}: {
  chain: string
  limit: number
  start: number
  sortBy?: string
  token_addresses?: string
  duration?: string
  enabled?: boolean
}) => ({
  queryKey: [
    GET_LEADERBOARD,
    {
      chain,
      limit,
      start,
      sortBy,
      token_addresses,
      duration,
      enabled,
    },
  ],
  enabled,
  queryFn: async () => {
    const result = await getLeaderboard({
      chain,
      limit,
      start,
      sortBy,
      token_addresses,
      duration,
    })

    return result.data
  },
})
