import { getSMNewListingBuys } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_SM_NEW_LISTING_BUY = 'GET_SM_NEW_LISTING_BUY'

interface SMNewListingBuy {
  limit: number
  duration: string
  start: number
  chain: string
  sort_by: string
}

export const useSMNewListingBuyQuery = ({
  limit,
  duration,
  start,
  chain,
  sort_by,
}: SMNewListingBuy) =>
  queryOptions({
    queryKey: [
      GET_SM_NEW_LISTING_BUY,
      { limit, duration, start, chain, sort_by },
    ],
    queryFn: async () => {
      try {
        const result = await getSMNewListingBuys({
          limit,
          duration,
          start,
          chain,
          sort_by,
        })
        return result.data
      } catch (error) {
        return {
          smart_money_new_listing_buy: [],
          total: 0,
        }
      }
    },
  })
