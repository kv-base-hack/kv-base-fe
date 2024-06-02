import { getDexTradingSignal } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_DEX_TRADING_SIGNAL = 'GET_DEX_TRADING_SIGNAL'

export const useGetDexTradingSignalQuery = ({
  start,
  limit,
  type,
}: {
  start: number
  limit: number
  type?: string
}) =>
  useQuery({
    queryKey: [GET_DEX_TRADING_SIGNAL, { start, limit, type }],
    queryFn: () => getDexTradingSignal({ start, limit, type }),
  })
