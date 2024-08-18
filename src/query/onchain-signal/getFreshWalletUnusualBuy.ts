import { getFreshWalletUnusualBuy } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_FRESH_WALLET_UNUSUAL_BUY = 'GET_FRESH_WALLET_UNUSUAL_BUY'

export const useFreshUnusualBuyQuery = ({
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
}) =>
  useQuery({
    queryKey: [
      GET_FRESH_WALLET_UNUSUAL_BUY,
      { limit, duration, start, chain, sort_by },
    ],
    queryFn: () =>
      getFreshWalletUnusualBuy({ limit, duration, start, chain, sort_by }),
  })
