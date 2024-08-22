import { getDexTradingSignal } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_DEX_TRADING_SIGNAL = 'GET_DEX_TRADING_SIGNAL'

export const useGetDexTradingSignalQuery = ({
  start,
  limit,
  type,
  token_addresses,
  chain,
}: {
  start: number
  limit: number
  type?: string
  token_addresses?: string
  chain?: string
}) => ({
  queryKey: [
    GET_DEX_TRADING_SIGNAL,
    { start, limit, type, token_addresses, chain },
  ],
  queryFn: async () => {
    const result = await getDexTradingSignal({ start, limit, type, token_addresses, chain })
    return result.data
  }
})
