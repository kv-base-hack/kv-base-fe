import { getTopSmartMoneyTradeUsersList } from '@/services/api'
import { TopSmartMoneyTradeUsersListProps } from '@/types'

const GET_TOP_SMART_MONEY_TRADE = 'GET_TOP_SMART_MONEY_TRADE'

export const useGetTopSmartMoneyTradeQuery = ({
  chain,
  limit,
  start,
  address,
  duration,
  enabled,
  type,
}: TopSmartMoneyTradeUsersListProps) => ({
  queryKey: [
    GET_TOP_SMART_MONEY_TRADE,
    {
      chain,
      limit,
      start,
      address,
      duration,
      type,
    },
  ],
  queryFn: async () => {
    const data = await getTopSmartMoneyTradeUsersList({
      chain,
      limit,
      start,
      address,
      duration,
      type,
    })

    return data.data
  },
  enabled,
})
