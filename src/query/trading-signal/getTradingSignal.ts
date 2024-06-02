import { getTradingSignal } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TRADING_SIGNAL = 'GET_TRADING_SIGNAL'

export const useGetTradingSignalQuery = ({
  start,
  limit,
  chain,
}: {
  start: number
  limit: number
  chain: string
}) =>
  useQuery({
    queryKey: [GET_TRADING_SIGNAL, { start, limit, chain }],
    queryFn: () => getTradingSignal({ start, limit, chain }),
  })
