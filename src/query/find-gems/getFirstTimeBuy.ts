import { getFirstTimeBuy } from '@/services/api'

const GET_FIRST_TIME_BUY = 'GET_FIRST_TIME_BUY'

export const useFirstTimeBuyQuery = ({
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
}) => ({
  queryKey: [GET_FIRST_TIME_BUY, { limit, duration, start, chain, sort_by }],
  queryFn: async () => {
    const result = await getFirstTimeBuy({
      limit,
      duration,
      start,
      chain,
      sort_by,
    })

    return result.data
  },
})
