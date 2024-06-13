import { getDexTradingSignal } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_DEX_TRADING_SIGNAL = 'GET_DEX_TRADING_SIGNAL'

export const useGetDexTradingSignalQuery = ({
  start,
  limit,
  type,
  addresses,
}: {
  start: number
  limit: number
  type?: string
  addresses?: string
}) =>
({
  queryKey: [GET_DEX_TRADING_SIGNAL, { start, limit, type, addresses }],
  queryFn: async () => {
    const data = getDexTradingSignal({ start, limit, type, addresses })
    return data
  },
})
