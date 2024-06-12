import { CHAIN_X } from '@/constant/chain'
import { getFindGemsDeposit } from '@/services/api'

const GET_FIND_GEMS_DEPOSIT = 'GET_FIND_GEMS_DEPOSIT'

interface FindGemsDeposit {
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
  duration: string
}

export const useFindGemsDepositQuery = ({
  chain = CHAIN_X,
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
  duration = '24h',
}: FindGemsDeposit) => ({
  queryKey: [
    GET_FIND_GEMS_DEPOSIT,
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
      duration,
    },
  ],
  queryFn: async () => {
    const data = await getFindGemsDeposit({
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
      duration,
    })
    return data.data
  },
})
