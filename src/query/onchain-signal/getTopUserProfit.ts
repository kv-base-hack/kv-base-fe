import { getTopUserProfit } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_USER_PROFIT = 'GET_TOP_USER_PROFIT'

export const useTopUserProfitQuery = ({
  limitTopAddress,
  duration,
}: {
  limitTopAddress: number
  duration: string
}) =>
  useQuery({
    queryKey: [GET_TOP_USER_PROFIT, { limitTopAddress, duration }],
    queryFn: () => getTopUserProfit({ limitTopAddress, duration }),
  })
