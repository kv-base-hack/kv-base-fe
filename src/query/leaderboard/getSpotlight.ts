import { getSpotlight } from '@/services/leaderboard/api'

export const GET_SPOTLIGHT = 'GET_SPOTLIGT'

export const useGetSpotlight = ({
  chain,
  limit,
  start,
  token_addresses,
  ranking,
  badges,
}: {
  chain: string
  limit: number
  start: number
  token_addresses?: string
  ranking?: string
  badges?: string
}) => ({
  queryKey: [GET_SPOTLIGHT, { limit, start, chain, token_addresses, ranking, badges }],
  queryFn: async () => {
    const data = await getSpotlight({ limit, start, chain, token_addresses, ranking, badges })
    return data.data
  },
})
