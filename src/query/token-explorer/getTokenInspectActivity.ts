import { getTokenInspectActivity } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_INSPECT_ACTIVITY = 'GET_TOKEN_INSPECT_ACTIVITY'

export const useTokenInspectActivityQuery = ({
  limit,
  start,
  action,
  address,
  chain,
}: {
  limit: number
  action: string
  start: number
  address: string
  chain: string
}) =>
  useQuery({
    queryKey: [
      GET_TOKEN_INSPECT_ACTIVITY,
      {
        limit,
        start,
        action,
        address,
        chain,
      },
    ],
    queryFn: () =>
      getTokenInspectActivity({
        limit,
        start,
        action,
        address,
        chain,
      }),
  })
