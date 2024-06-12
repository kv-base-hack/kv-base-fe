import { getTotalEarning } from "@/services/leaderboard/api"

const GET_TOTAL_EARNING = 'GET_TOTAL_EARNING'

export const useGetTotalEarning = ({ chain }: { chain: string }) => ({
  queryKey: [GET_TOTAL_EARNING, { chain }],
  queryFn: async () => {
    const data = await getTotalEarning({ chain })
    return data.data
  },
})