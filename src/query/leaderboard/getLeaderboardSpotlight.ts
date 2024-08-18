import { getLeaderboardSpotlight } from "@/services/leaderboard/api"


const GET_LEADERBOARD_SPOTLIGHT = 'GET_LEADERBOARD_SPOTLIGHT'

export const useLeaderboardSpotlightQuery = ({
  chain,
  duration,
}: {
  chain: string
  duration: string
}) => ({
  queryKey: [
    GET_LEADERBOARD_SPOTLIGHT,
    {
      chain,
      duration,
    },
  ],
  queryFn: async () => {
    const result = await getLeaderboardSpotlight({
      chain,
      duration,
    })

    return result.data
  },
})
