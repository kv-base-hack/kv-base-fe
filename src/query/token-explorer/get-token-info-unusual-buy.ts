import { getTokenInfoUnusualBuy } from "@/services/leaderboard/api"


const GET_TOKEN_INFO_UNUSUAL_BUY = 'GET_TOKEN_INFO_UNUSUAL_BUY'

export const useTokenInfoUnusualBuyQuery = ({
  chain,
  address,
  duration,
}: {
  chain: string
  address: string
  duration: string
}) => ({
  queryKey: [GET_TOKEN_INFO_UNUSUAL_BUY, { chain, address, duration }],
  queryFn: async () => {
    const result = await getTokenInfoUnusualBuy({ chain, address, duration })
    return result.data
  },
})
