import { getTopActivity } from '@/services/api'

const GET_TOP_ACTIVITY = 'GET_TOP_ACTIVITY'

export const useTopActivityQuery = ({
  action,
  limit,
  start,
  chain,
  amount_filter,
  token_addresses,
  sort_by,
  user_address,
  ranking,
  badges,
}: {
  action: string
  limit: number
  start: number
  chain: string
  amount_filter: string
  token_addresses: string
  sort_by: string
  user_address?: string
  ranking?: string
  badges?: string
}) => ({
  queryKey: [
    GET_TOP_ACTIVITY,
    action,
    limit,
    start,
    chain,
    amount_filter,
    token_addresses,
    sort_by,
    user_address,
    ranking,
    badges,
  ],
  queryFn: async () => {
    const result = await getTopActivity({
      action,
      limit,
      start,
      chain,
      amount_filter,
      token_addresses,
      sort_by,
      user_address,
      ranking,
      badges,
    })
    return result.data
  },
})
