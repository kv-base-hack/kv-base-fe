import { getTokenInspectBuySell } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_INSPECT_BUY_SELL = 'GET_TOKEN_INSPECT_BUY_SELL'

export const useTokenInspectBuySellQuery = ({
  duration,
  address,
  chain,
}: {
  duration: string
  address: string
  chain: string
}) =>
  useQuery({
    queryKey: [
      GET_TOKEN_INSPECT_BUY_SELL,
      {
        duration,
        address,
        chain,
      },
    ],
    queryFn: () =>
      getTokenInspectBuySell({
        duration,
        address,
        chain,
      }),
  })
