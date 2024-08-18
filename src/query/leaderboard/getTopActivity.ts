import { getTopActivity } from '@/services/leaderboard/api'

const GET_TOP_ACTIVITY = 'GET_TOP_ACTIVITY'

export const useTopActivityQuery = ({
  action,
  limit,
  start,
  chain,
  amount_filter,
  token_addresses,
  sort_by,
}: {
  action: string
  limit: number
  start: number
  chain: string
  amount_filter: string
  token_addresses: string
  sort_by: string
}) => ({
  queryKey: [
    GET_TOP_ACTIVITY,
    { action, limit, start, chain, amount_filter, token_addresses, sort_by },
  ],
  queryFn: () =>
    getTopActivity({
      action,
      limit,
      start,
      chain,
      amount_filter,
      token_addresses,
      sort_by,
    }),
})
