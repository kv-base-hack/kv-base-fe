import { getTopSmartMoneyForToken } from '@/services/api'

const GET_TOP_SMART_MONEY_FOR_TOKEN = 'GET_TOP_SMART_MONEY_FOR_TOKEN'

export const useTopSmartMoneyForTokenQuery = ({
  limit,
  start,
  address,
  chain,
}: {
  limit: number
  start: number
  address: string
  chain: string
}) => ({
  queryKey: [
    GET_TOP_SMART_MONEY_FOR_TOKEN,
    {
      limit,
      start,
      address,
      chain,
    },
  ],
  queryFn: async () => {
    const result = await getTopSmartMoneyForToken({
      limit,
      start,
      address,
      chain,
    })

    return result.data
  },
})
