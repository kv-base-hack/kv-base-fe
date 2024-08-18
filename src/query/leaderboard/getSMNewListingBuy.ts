import { getSMNewListingBuys } from '@/services/leaderboard/api'

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
}: SMNewListingBuy) => ({
  queryKey: [
    GET_SM_NEW_LISTING_BUY,
    { limit, duration, start, chain, sort_by },
  ],
  queryFn: async () => {
    const data = await getSMNewListingBuys({
      limit,
      duration,
      start,
      chain,
      sort_by,
    })
    return data.data
  },
})
