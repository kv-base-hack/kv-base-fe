import { getTopTokenBuy } from '@/services/api'

const GET_TOP_TOKEN_BUY = 'GET_TOP_TOKEN_BUY'

interface TopTokenBuy {
  limit?: number
  duration?: string
  start?: number
  chain?: string
  action?: string
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
}

export const useGetTopTokenBuy = ({
  limit = 10,
  duration = '24h',
  start = 1,
  chain = 'solana',
  action = 'buying',
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
  sort_by,
}: TopTokenBuy = {}) => ({
  queryKey: [
    GET_TOP_TOKEN_BUY,
    {
      limit,
      duration,
      start,
      chain,
      action,
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
    },
  ],
  queryFn: async () => {
    const data = await getTopTokenBuy({
      limit,
      duration,
      start,
      chain,
      action,
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
    })
    return data.data
  },
})
