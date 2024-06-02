import { getTotalWinRate } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOTAL_WIN_RATE = 'GET_TOTAL_WIN_RATE'

export const useGetTotalWinrateQuery = () =>
  useQuery({
    queryKey: [GET_TOTAL_WIN_RATE],
    queryFn: () => getTotalWinRate(),
  })
