import { getRoiAnalyst } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_ROI_ANALYST = 'GET_ROI_ANALYST'

export const useGetRoiAnalystQuery = ({
  id,
  page,
  perPage,
}: {
  id: string
  page: number
  perPage: number
}) =>
  useQuery({
    queryKey: [GET_ROI_ANALYST, { id, page, perPage }],
    enabled: Boolean(id),
    queryFn: () => getRoiAnalyst({ id, page, perPage }),
  })
