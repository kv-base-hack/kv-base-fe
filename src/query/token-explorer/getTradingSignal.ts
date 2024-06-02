import { getTokenExplorerTradingSignal } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_EXPLORER_TRADING_SIGNAL = 'GET_TOKEN_EXPLORER_TRADING_SIGNAL'

export const useTokenExplorerTradingSignalQuery = ({
  perPage,
  page,
  address,
}: {
  perPage: number
  page: number
  address: string
}) =>
  useQuery({
    queryKey: [
      GET_TOKEN_EXPLORER_TRADING_SIGNAL,
      {
        perPage,
        page,
        address,
      },
    ],
    queryFn: () =>
      getTokenExplorerTradingSignal({
        perPage,
        page,
        address,
      }),
  })
