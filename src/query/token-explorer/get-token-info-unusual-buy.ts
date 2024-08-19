
import { getTokenInfoUnusualBuy } from '@/services/leaderboard/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_INFO_UNUSUAL_BUY = 'GET_TOKEN_INFO_UNUSUAL_BUY'

export const useTokenInfoUnusualBuyQuery = ({
  chain,
  address,
  duration,
}: {
  chain: string
  address: string
  duration: string
}) =>
  useQuery({
    queryKey: [GET_TOKEN_INFO_UNUSUAL_BUY, { chain, address, duration }],
    queryFn: () => getTokenInfoUnusualBuy({ chain, address, duration }),
  })
