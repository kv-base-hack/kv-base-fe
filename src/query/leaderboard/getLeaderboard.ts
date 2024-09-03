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
  ranking,
  badges,
}: {
  chain: string
  limit: number
  start: number
  sortBy?: string
  token_addresses?: string
  duration?: string
  enabled?: boolean
  ranking?: string
  badges?: string
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
      ranking,
      badges,
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
      ranking,
      badges,
    })

    return result.data
  },
})
