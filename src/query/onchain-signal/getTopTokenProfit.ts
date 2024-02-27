import { getTopTokenProfit } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOP_TOKEN_PROFIT = 'GET_TOP_TOKEN_PROFIT'

export const useTopTokenProfitQuery = ({
  limitTokenAddress,
  duration,
}: {
  limitTokenAddress: number
  duration: string
}) =>
  useQuery({
    queryKey: [GET_TOP_TOKEN_PROFIT, { limitTokenAddress, duration }],
    queryFn: () => getTopTokenProfit({ limitTokenAddress, duration }),
  })
