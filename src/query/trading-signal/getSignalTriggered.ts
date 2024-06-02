import { getSignalTriggered } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_SIGNAL_TRIGGERED = 'GET_SIGNAL_TRIGGERED'

export const useGetSignalTriggeredQuery = ({
  id,
  page,
  perPage,
}: {
  id: string
  page: number
  perPage: number
}) =>
  useQuery({
    queryKey: [GET_SIGNAL_TRIGGERED, { id, page, perPage }],
    enabled: Boolean(id),
    queryFn: () => getSignalTriggered({ id, page, perPage }),
  })
