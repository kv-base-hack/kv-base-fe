import { getTotalScore } from "@/services/leaderboard/api"

const TOTAL_SCORE = 'TOTAL_SCORE'

export const useGetTotalScore = ({ chain }: { chain: string }) => ({
  queryKey: [TOTAL_SCORE],
  queryFn: async () => {
    const data = await getTotalScore({ chain })
    try {
      return data.data
    } catch (error) {
      console.log('error', error)
      throw error
    }
  },
})