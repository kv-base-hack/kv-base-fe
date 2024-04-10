import { getFindGemsWithdraw } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_FIND_GEMS_WITHDRAW = 'GET_FIND_GEMS_WITHDRAW'

export const useFindGemsWithdrawQuery = ({
  chain,
  limit,
  start,
  enabled,
}: {
  chain: string
  limit: number
  start: number
  enabled?: boolean
}) =>
  useQuery({
    queryKey: [
      GET_FIND_GEMS_WITHDRAW,
      {
        chain,
        limit,
        start,
        enabled,
      },
    ],
    enabled,
    queryFn: () =>
      getFindGemsWithdraw({
        chain,
        limit,
        start,
      }),
  })
