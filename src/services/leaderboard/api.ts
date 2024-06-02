import { InsiderBuyResponse } from "@/types/insiderBuy";
import { NewListingBuyResponse } from "@/types/new-listing-buy";
import { TopSmartMoneyTradeUsersListProps } from "@/types/smartmoney";
import { TopTokenBuyResponse } from "@/types/top-token-buy";
import { TopTokenProfitResponse } from "@/types/topTokenProfit";
import { DexTradingSignalResponse } from "@/types/tradingSignal";
import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.boltrade.ai/onchain',
})

const signalApi = axios.create({
  baseURL: 'https://api-signals.boltrade.ai',
})

const chatApi = axios.create({
  baseURL: 'https://api-chat.boltrade.ai',
})

const solanaApi = axios.create({
  baseURL: 'https://api-solana.boltrade.ai',
})

const userApi = axios.create({
  baseURL: 'https://api.boltrade.ai/user-onchain',
})

const api_1 = axios.create({
  baseURL: 'https://academy.kai.13thstation.xyz',
})

export const getDexTradingSignal = async ({
  start,
  limit,
  type,
}: {
  start: number
  limit: number
  type?: string
}): Promise<DexTradingSignalResponse> => {
  return await signalApi.get(`/dex-signals`, {
    params: {
      page: start,
      perPage: limit,
      type,
    },
  })
}

export const getTopTokenProfit = async ({
  limit = 10,
  duration = '24h',
  start = 1,
  chain,
  sort_by,
}: {
  limit?: number
  start?: number
  duration?: string
  chain: string
  sort_by?: string
}): Promise<TopTokenProfitResponse> => {
  return await api.get('/v1/token/smart_money_token_profit', {
    params: {
      limit,
      start,
      chain,
      duration,
      sort_by: sort_by,
    },
  })
}

export const getTopTokenBuy = async ({
  limit = 5,
  start = 1,
  duration = '24h',
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
}: {
  limit?: number
  start?: number
  duration?: string
  chain: string
  action: string
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
}): Promise<TopTokenBuyResponse> => {
  return await api.get('/v1/token/top_smart_money_trade', {
    params: {
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
  })
}

///// TODO: need to update 
export const getInsiderBuy = async ({
  start,
  limit,
  chain,
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
}: {
  start: number
  limit: number
  chain: string
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
  duration: string
}): Promise<InsiderBuyResponse> => {
  return await api.get('v1/token/unusual_token_buy', {
    params: {
      start,
      limit,
      chain,
      duration,
      price_change_24h_min: price_change_24h_min ? price_change_24h_min : null,
      price_change_24h_max: price_change_24h_max ? price_change_24h_max : null,
      market_cap_min: market_cap_min ? market_cap_min : null,
      market_cap_max: market_cap_max ? market_cap_max : null,
      fdv_min: fdv_min ? fdv_min : null,
      fdv_max: fdv_max ? fdv_max : null,
      volume_24h_min: volume_24h_min ? volume_24h_min : null,
      volume_24h_max: volume_24h_max ? volume_24h_max : null,
      cex_net_flow_min: cex_net_flow_min ? cex_net_flow_min : null,
      cex_net_flow_max: cex_net_flow_max ? cex_net_flow_max : null,
      sort_by,
    },
  })
}

export const getSMNewListingBuys = async ({
  limit = 5,
  start = 1,
  duration = '24h',
  chain,
  sort_by,
}: {
  limit?: number
  start?: number
  duration?: string
  chain: string
  sort_by: string
}): Promise<NewListingBuyResponse> => {
  return await api.get('/v1/token/smart_money_new_listing_buy', {
    params: {
      limit,
      duration,
      start,
      chain,
      sort_by,
    },
  })
}

export const getTopSmartMoneyTradeUsersList = ({
  chain,
  limit,
  start,
  address,
  duration,
  type,
}: TopSmartMoneyTradeUsersListProps) => {
  switch (type) {
    case 'trade':
      return api.get('/v1/token/top_smart_money_trade_users_list', {
        params: {
          chain,
          limit,
          start,
          address,
          duration,
        },
      })
    case 'unusual_buy':
      return api.get('/v1/token/unusual_token_buy_users_list', {
        params: {
          chain,
          limit,
          start,
          address,
          duration,
        },
      })
    case 'new_listing_buy':
      return api.get('/v1/token/smart_money_new_listing_buy_users_list', {
        params: {
          chain,
          limit,
          start,
          address,
          duration,
        },
      })
    case 'profit':
      return api.get('/v1/token/smart_money_token_profit_users_list', {
        params: {
          chain,
          limit,
          start,
          address,
          duration,
        },
      })
    case 'find-gems-sm-holding':
      return api.get('/v1/findgems/smart_money_holding_users_list', {
        params: {
          chain,
          limit,
          start,
          address,
          duration,
        },
      })
    default:
      return api.get('/v1/token/smart_money_token_profit_users_list', {
        params: {
          chain,
          limit,
          start,
          address,
          duration,
        },
      })
  }
}