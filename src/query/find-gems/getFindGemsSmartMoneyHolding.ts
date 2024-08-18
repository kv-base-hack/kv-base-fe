
import { CHAIN } from '@/constant/chain'
import { getFindGemsSmartMoneyHolding } from '@/services/api'

const GET_FIND_GEMS_SMART_MONEY_HOLDING = 'GET_FIND_GEMS_SMART_MONEY_HOLDING'

type FindGemsSmartMoneyHolding = {
  chain?: string
  limit?: number
  start?: number
  price_change_24h_min?: number
  price_change_24h_max?: number
  market_cap_min?: number
  market_cap_max?: number
  fdv_min?: number
  fdv_max?: number
  volume_24h_min?: number
  volume_24h_max?: number
  cex_net_flow_min?: number
  cex_net_flow_max?: number
  sort_by?: string
  duration?: string
}

export const useFindGemsSmartMoneyHoldingQuery = ({
  chain = CHAIN,
  limit = 10,
  start = 1,
  price_change_24h_min = 0,
  price_change_24h_max = 0,
  market_cap_min = 0,
  market_cap_max = 0,
  fdv_min = 0,
  fdv_max = 0,
  volume_24h_min = 0,
  volume_24h_max = 0,
  cex_net_flow_min = 0,
  cex_net_flow_max = 0,
  sort_by = '',
  duration = '24h',
}: FindGemsSmartMoneyHolding = {}) => ({
  queryKey: [
    GET_FIND_GEMS_SMART_MONEY_HOLDING,
    {
      chain,
      limit,
      start,
      price_change_24h_min,
      price_change_24h_max,
      market_cap_min,
      market_cap_max,
      fdv_min,
      fdv_max,
      volume_24h_min,
      volume_24h_max,
      cex_net_flow_min,
      cex_net_flow_max,
      sort_by,
      duration,
    },
  ],
  queryFn: async () => {
    const data = await getFindGemsSmartMoneyHolding({
      chain,
      limit,
      start,
      price_change_24h_min,
      price_change_24h_max,
      market_cap_min,
      market_cap_max,
      fdv_min,
      fdv_max,
      volume_24h_min,
      volume_24h_max,
      cex_net_flow_min,
      cex_net_flow_max,
      sort_by,
      duration,
    })

    return data.data
  },
})
