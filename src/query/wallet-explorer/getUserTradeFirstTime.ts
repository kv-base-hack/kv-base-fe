import { userTradeFirstTimeBuy } from '@/services/api'

const GET_USER_TRADE_FIRST_TIME = 'GET_USER_TRADE_FIRST_TIME'

export const useTradeFirstTimeQuery = ({
  address,
  chain,
  duration,
  token_address,
  sort_by,
}: {
  address: string
  chain: string
  duration: string
  token_address: string
  sort_by: string
}) => ({
  queryKey: [
    GET_USER_TRADE_FIRST_TIME,
    { address, chain, duration, token_address, sort_by },
  ],
  queryFn: async () => {
    const data = await userTradeFirstTimeBuy({
      address,
      chain,
      duration,
      token_address,
      sort_by,
    })
    return data.data
  },
})
