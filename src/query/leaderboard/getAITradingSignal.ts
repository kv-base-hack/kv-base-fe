
import { getDexTradingSignal } from '@/services/leaderboard/api'

const GET_AI_TRADING_SIGNAL = 'GET_AI_TRADING_SIGNAL'

export const useGetAITradingSignalQuery = ({
  start = 1,
  limit = 2,
  type,
}: {
  start: number
  limit: number
  type?: string
}) => ({
  queryKey: [GET_AI_TRADING_SIGNAL, { start, limit, type }],
  queryFn: async () => {
    const data = await getDexTradingSignal({ start, limit, type })
    return data.data
  }
})
