import { getSpotlight } from "@/services/leaderboard/api"

export const GET_SPOTLIGHT = 'GET_SPOTLIGT'

export const useGetSpotlight = ({
  chain,
  limit,
  start,
  token_addresses,
  ranking,
  badges,
  action,
}: {
  chain: string
  limit: number
  start: number
  token_addresses?: string
  ranking?: string
  badges?: string
  action?: string
}) => ({
  queryKey: [
    GET_SPOTLIGHT,
    { limit, start, chain, token_addresses, ranking, action, badges },
  ],
  queryFn: async () => {
    try {
      const result = await getSpotlight({
        limit,
        start,
        chain,
        token_addresses,
        ranking,
        badges,
        action,
      })
      return result.data
    } catch (error) {
      return {
        spot_light: [],
        total: 0,
      }
    }
  },
})
