import { getSpotlight } from "@/services/leaderboard/api"

export const GET_SPOTLIGHT = 'GET_SPOTLIGT'

export const useGetSpotlight = ({ chain, limit, start }: { chain: string, limit: number, start: number }) => ({
  queryKey: [GET_SPOTLIGHT, { limit, start, chain }],
  queryFn: async () => {
    const data = await getSpotlight({ limit, start, chain })
    return data.data
  }
})