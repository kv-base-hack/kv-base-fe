import { getActivitySmartMoneyOfToken } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_ACTIVITY_SMART_MONEY_OF_TOKEN = 'GET_ACTIVITY_SMART_MONEY_OF_TOKEN'

export const useActivitySmartMoneyOfTokenQuery = ({
  limit,
  start,
  address,
  chain,
  action,
  amount_filter,
}: {
  limit: number
  start: number
  address: string
  chain: string
  action: string
  amount_filter: string
}) => ({
  queryKey: [
    GET_ACTIVITY_SMART_MONEY_OF_TOKEN,
    {
      limit,
      start,
      address,
      chain,
      action,
      amount_filter,
    },
  ],
  queryFn: async () => {
    const result = await getActivitySmartMoneyOfToken({
      limit,
      start,
      address,
      chain,
      action,
      amount_filter,
    })

    return result.data
  },
})
