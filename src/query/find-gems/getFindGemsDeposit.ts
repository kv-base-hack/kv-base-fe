import { getFindGemsDeposit } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_FIND_GEMS_DEPOSIT = 'GET_FIND_GEMS_DEPOSIT'

export const useFindGemsDepositQuery = ({
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
      GET_FIND_GEMS_DEPOSIT,
      {
        chain,
        limit,
        start,
        enabled,
      },
    ],
    enabled,
    queryFn: () =>
      getFindGemsDeposit({
        chain,
        limit,
        start,
      }),
  })
