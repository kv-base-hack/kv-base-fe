import { getTradeActivity } from '@/services/api'

const GET_TRADE_ACTIVITY = 'GET_TRADE_ACTIVITY'

export const useTradeActivityQuery = ({
  action,
  limit,
  start,
  chain,
  address,
  is_big_trade_only,
  token_address,
  amount_filter,
}: {
  action: string
  limit: number
  start: number
  chain: string
  address: string
  is_big_trade_only: boolean
  token_address: string
  amount_filter: string
}) => ({
  queryKey: [
    GET_TRADE_ACTIVITY,
    {
      action,
      limit,
      start,
      chain,
      address,
      is_big_trade_only,
      token_address,
      amount_filter,
    },
  ],
  staleTime: 0,
  queryFn: async () => {
    const result = await getTradeActivity({
      action,
      limit,
      start,
      chain,
      address,
      is_big_trade_only,
      token_address,
      amount_filter,
    })

    return result.data
  },
})
