import { getOngoingSignal } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_ON_GOGING_SIGNAL = 'GET_ON_GOGING_SIGNAL'

export const useGetOnGoingSignalQuery = ({
  id,
  page,
  perPage,
}: {
  id: string
  page: number
  perPage: number
}) =>
  useQuery({
    queryKey: [GET_ON_GOGING_SIGNAL, { id, page, perPage }],
    enabled: Boolean(id),
    queryFn: () => getOngoingSignal({ id, page, perPage }),
  })
