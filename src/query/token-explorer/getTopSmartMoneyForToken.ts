import { getTopSmartMoneyForToken } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_SMART_MONEY_FOR_TOKEN = 'GET_TOP_SMART_MONEY_FOR_TOKEN'

export const useTopSmartMoneyForTokenQuery = ({
  limit,
  start,
  address,
  chain,
}: {
  limit: number
  start: number
  address: string
  chain: string
}) =>
  useQuery({
    queryKey: [
      GET_TOP_SMART_MONEY_FOR_TOKEN,
      {
        limit,
        start,
        address,
        chain,
      },
    ],
    queryFn: () =>
      getTopSmartMoneyForToken({
        limit,
        start,
        address,
        chain,
      }),
  })
