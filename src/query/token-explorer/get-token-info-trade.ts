import { getTokenInfoTrade } from "@/services/leaderboard/api"


const GET_TOKEN_INFO_TRADE = 'GET_TOKEN_INFO_TRADE'

export const useTokenInfoTradeQuery = ({
  chain,
  address,
  duration,
}: {
  chain: string
  address: string
  duration: string
}) => ({
  queryKey: [GET_TOKEN_INFO_TRADE, { chain, address, duration }],
  queryFn: async () => {
    const result = await getTokenInfoTrade({ chain, address, duration })
    return result.data
  },
})
