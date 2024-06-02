import { getInsiderBuy } from "@/services/leaderboard/api"

const GET_INSIDER_BUY = 'GET_INSIDER_BUY'

export const useGetInsiderBuyQuery = ({
  limit,
  duration,
  start,
  chain,
  sort_by,
}: {
  limit: number
  duration: string
  start: number
  chain: string
  sort_by: string
}) => ({
  queryKey: [GET_INSIDER_BUY, { limit, duration, start, chain, sort_by }],
  queryFn: async () => {
    const data = await getInsiderBuy({ limit, duration, start, chain, sort_by })
    return data.data
  }
})