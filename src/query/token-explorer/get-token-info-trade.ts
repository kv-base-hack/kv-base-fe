
import { getTokenInfoTrade } from '@/services/leaderboard/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_INFO_TRADE = 'GET_TOKEN_INFO_TRADE'

export const useTokenInfoTradeQuery = ({
  chain,
  address,
  duration,
}: {
  chain: string
  address: string
  duration: string
}) =>
  useQuery({
    queryKey: [GET_TOKEN_INFO_TRADE, { chain, address, duration }],
    queryFn: () => getTokenInfoTrade({ chain, address, duration }),
  })
