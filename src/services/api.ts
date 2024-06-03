import { TopSmartMoneyTradeUsersListProps } from '@/types'
import { ActivitySmartMoneyOfTokenResponse } from '@/types/activitySmartMoneyOfToken'
import { CexDepositResponse } from '@/types/cexDeposit'
import { CexWithdrawResponse } from '@/types/cexWithdraw'
import { CourseResponse } from '@/types/course'
import { DexTradingSignalResponse } from '@/types/trading-signal/dexTradingSignal'
import { FindGemsDepositResponse } from '@/types/find-gems/deposit'
import { FindGemsSmartMoneyHoldingResponse } from '@/types/find-gems/smartMoneyHolding'
import { FindGemsUnusualCexResponse } from '@/types/find-gems/unusual-cex'
import { FindGemsWithdrawResponse } from '@/types/find-gems/withdraw'
import { LeaderboardResponse } from '@/types/leaderboard'
import { ChannelResponse, ListChannelResponse } from '@/types/listChannel'
import { NewListingBuyResponse } from '@/types/newListingBuy'
import { PriceWithTransferResponse } from '@/types/priceWithTransfer'
import { TradingSignalResponse } from '@/types/signal'
import { SmartMoneyForTokenResponse } from '@/types/smartMoneyForToken'
import { SmartMoneyTransactionResponse } from '@/types/smartMoneyTransaction'
import { TokenExplorerTradingSignalResponse } from '@/types/token-explorer/tradingSignal'
import { TokenInfoResponse } from '@/types/tokenInfo'
import { TokenInspectActivityResponse } from '@/types/tokenInspectActivity'
import { TokenInspectBuySellResponse } from '@/types/tokenInspectBuySell'
import { TokenInspectDepositWithdrawResponse } from '@/types/tokenInspectDepositWithdraw'
import { TokenListResponse } from '@/types/tokenList'
import { TopActivityResponse } from '@/types/topActivity'
import { TopSmartMoneyRankingResponse } from '@/types/topSmartMoneyRanking'
import { TopTokenBuyResponse } from '@/types/topTokenBuy'
import { TopTokenProfitResponse } from '@/types/topTokenProfit'
import { TopTokenSellResponse } from '@/types/topTokenSell'
import { TopUserProfitResponse } from '@/types/topUserProfit'
import { TotalSignalROIResponse } from '@/types/totalSignalROI'
import { TotalWinRateResponse } from '@/types/totalWinRate'
import { TrackResponse } from '@/types/track'
import { TradeStatisticResponse } from '@/types/tradeStatistic'
import { TradeStatisticTokensResponse } from '@/types/tradeStatisticTokens'
import { OnGoingSignalResponse } from '@/types/trading-signal/OngoingSignal'
import { SignalTriggeredResponse } from '@/types/trading-signal/SignalTriggered'
import { TrendingTokenResponse } from '@/types/trendingToken'
import { UnusualBuyResponse } from '@/types/unusualBuy'
import { UserBalanceResponse } from '@/types/userBalance'
import { UserInfoResponse } from '@/types/userInfo'
import axios from 'axios'

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

export const activity = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'WITHDRAW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '2',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'WITHDRAW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '3',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'WITHDRAW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '4',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'WITHDRAW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '5',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'WITHDRAW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
  ]
}

export const tradeStatistic = async ({
  address,
  chain,
  duration,
  token_address,
}: {
  address: string
  chain: string
  duration: string
  token_address: string
}): Promise<TradeStatisticResponse> => {
  return await userApi.get('v1/user/user_trade_stats', {
    params: {
      address,
      chain,
      duration,
      token_address,
    },
  })
}

export const tradeStatisticTokens = async ({
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
}): Promise<TradeStatisticTokensResponse> => {
  return await userApi.get('v1/user/user_trade_stats_for_tokens', {
    params: {
      address,
      chain,
      duration,
      token_address,
      sort_by,
    },
  })
}

export const portfolio = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      symbol: 'SOL',
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      amount: 39939.33,
      percent_24h: 21,
      balance: 3122939.33,
      price: 12.33,
    },
    {
      id: '2',
      symbol: 'USDC',
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      amount: 69939.33,
      percent_24h: 12.5,
      balance: 9122939.33,
      price: 0.99,
    },
    {
      id: '3',
      symbol: 'GMT',
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      amount: 24939.33,
      percent_24h: 55,
      balance: 6122939.33,
      price: 2.33,
    },
    {
      id: '4',
      symbol: 'HNT',
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      amount: 79239.33,
      percent_24h: -20.5,
      balance: 922939.33,
      price: 0.33,
    },
    {
      id: '5',
      symbol: 'JUP',
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      amount: 322939.33,
      percent_24h: -0.5,
      balance: 4322939.33,
      price: 5.33,
    },
  ]
}

export const getTrendingToken = async ({
  chain,
  search,
  limit,
}: {
  chain: string
  search?: string
  limit: number
}): Promise<TrendingTokenResponse> => {
  return await api.get('/v1/token/trending', {
    params: {
      chain,
      search,
      limit,
    },
  })
}

export const getCexDeposit = async ({
  limit = 5,
  start = 1,
  duration = '24h',
  chain,
}: {
  limit?: number
  start?: number
  duration?: string
  chain: string
}): Promise<CexDepositResponse> => {
  return await api.get('/v1/token_cex_in', {
    params: {
      limit,
      duration,
      start,
      chain,
    },
  })
}

export const getCexWithdraw = async ({
  limit = 5,
  start = 1,
  duration = '24h',
  chain,
}: {
  limit?: number
  start?: number
  duration?: string
  chain: string
}): Promise<CexWithdrawResponse> => {
  return await api.get('/v1/token_cex_out', {
    params: {
      limit,
      duration,
      start,
      chain,
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

export const getFreshWalletUnusualBuy = async ({
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
}): Promise<UnusualBuyResponse> => {
  return await api.get('/v1/token/unusual_token_buy', {
    params: {
      limit,
      duration,
      start,
      chain,
      sort_by,
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

export const getTopTokenSell = async ({
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
}): Promise<TopTokenSellResponse> => {
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

export const getTopUserProfit = async ({
  duration = '24h',
  chain,
  start,
  limit,
}: {
  duration: string
  chain: string
  start: number
  limit: number
}): Promise<TopUserProfitResponse> => {
  return await api.get('/v1/user/profit', {
    params: {
      duration,
      chain,
      start,
      limit,
    },
  })
}

export const getTopSmartMoneyForToken = async ({
  address,
  chain,
  start,
  limit,
}: {
  address: string
  chain: string
  start: number
  limit: number
}): Promise<SmartMoneyForTokenResponse> => {
  return await api.get('/v1/token/top_smart_money_for_token', {
    params: {
      address,
      chain,
      start,
      limit,
    },
  })
}

export const getTopSmartMoneyRanking = async ({
  duration = '24h',
  chain,
  start,
  limit,
}: {
  duration: string
  chain: string
  start: number
  limit: number
}): Promise<TopSmartMoneyRankingResponse> => {
  return await api.get('/v1/user/profit', {
    params: {
      duration,
      chain,
      start,
      limit,
    },
  })
}
export const getTopActivity = async ({
  action = 'all',
  limit = 10,
  start = 1,
  chain,
  amount_filter,
  token_addresses = '',
  sort_by = '',
}: {
  action?: string
  limit?: number
  start?: number
  chain: string
  amount_filter: string
  token_addresses: string
  sort_by: string
}): Promise<TopActivityResponse> => {
  return await api.get('/v1/activities', {
    params: {
      chain,
      action,
      limit,
      start,
      amount_filter,
      token_addresses,
      sort_by,
    },
  })
}

export const getTradeActivity = async ({
  action = 'all',
  limit = 10,
  start = 1,
  chain,
  address,
  is_big_trade_only,
  token_address,
  amount_filter,
}: {
  action?: string
  limit?: number
  start?: number
  chain: string
  address: string
  is_big_trade_only: boolean
  token_address: string
  amount_filter: string
}): Promise<TopActivityResponse> => {
  return await userApi.get('v1/user/inspect/activities', {
    params: {
      chain,
      action,
      limit,
      start,
      address,
      is_big_trade_only,
      token_address,
      amount_filter,
    },
  })
}

export const getLeaderboard = async ({
  limit = 5,
  start = 1,
  chain,
  sortBy,
  token_addresses = '',
}: {
  limit?: number
  start?: number
  chain: string
  sortBy: string
  token_addresses: string
}): Promise<LeaderboardResponse> => {
  return await api.get('/v1/leaderboard', {
    params: {
      chain,
      limit,
      start,
      sort_by: sortBy,
      token_addresses,
    },
  })
}

export const getTokenInspectDepositWithdraw = async ({
  duration,
  address,
  chain,
}: {
  duration: string
  address: string
  chain: string
}): Promise<TokenInspectDepositWithdrawResponse> => {
  return await api.get('/v1/token/inspect/depositwithdraw', {
    params: {
      chain,
      duration,
      address,
    },
  })
}

export const getTokenInspectBuySell = async ({
  duration,
  address,
  chain,
}: {
  duration: string
  address: string
  chain: string
}): Promise<TokenInspectBuySellResponse> => {
  return await api.get('/v1/token/inspect/buysell', {
    params: {
      chain,
      duration,
      address,
    },
  })
}

export const getSmartMoneyTransaction = async ({
  limit = 5,
  start = 1,
  address,
  chain,
  action,
  amount_filter,
}: {
  limit: number
  start: number
  address: string
  chain: string
  action: string
  amount_filter: string
}): Promise<SmartMoneyTransactionResponse> => {
  return await userApi.get('/v1/token/smart_money_tx', {
    params: {
      chain,
      limit,
      start,
      address,
      action,
      amount_filter,
    },
  })
}

export const getActivitySmartMoneyOfToken = async ({
  limit = 5,
  start = 1,
  address,
  chain,
  action,
  amount_filter,
}: {
  limit: number
  start: number
  address: string
  chain: string
  action: string
  amount_filter: string
}): Promise<ActivitySmartMoneyOfTokenResponse> => {
  return await api.get('/v1/token/activity_smart_money_of_token', {
    params: {
      chain,
      limit,
      start,
      address,
      action,
      amount_filter,
    },
  })
}

export const getTokenInspectActivity = async ({
  limit = 5,
  start = 1,
  action,
  address,
  chain,
}: {
  limit: number
  start: number
  action: string
  address: string
  chain: string
}): Promise<TokenInspectActivityResponse> => {
  return await api.get('/v1/token/inspect/activities', {
    params: {
      chain,
      limit,
      start,
      action,
      address,
    },
  })
}

export const getTokenExplorerTradingSignal = async ({
  address,
  page,
  perPage,
}: {
  perPage: number
  page: number
  address: string
}): Promise<TokenExplorerTradingSignalResponse> => {
  return await signalApi.get(`address/${address}/signals`, {
    params: {
      page,
      perPage,
    }
  })
}

export const getTokenList = async ({
  symbol_search,
  chain,
}: {
  symbol_search: string
  chain: string
}): Promise<TokenListResponse> => {
  return await api.get('/v1/search', {
    params: {
      symbol_search,
      chain,
      limit: 10,
      start: 1,
    },
  })
}

export const getTokenInfo = async ({
  chain,
  address,
}: {
  chain: string
  address: string
}): Promise<TokenInfoResponse> => {
  return await api.get('/v1/token/info', {
    params: {
      address,
      chain,
    },
  })
}

export const getTrack = async (): Promise<TrackResponse> => {
  return await api_1.get('/track')
}

export const getCourse = async ({
  id,
}: {
  id: string
}): Promise<CourseResponse> => {
  return await api_1.get(`/course/${id}`)
}

export const getArticleTopic = async (): Promise<any> => {
  return await api_1.get('/article/topics')
}

export const getArticle = async (): Promise<any> => {
  return await api_1.get('/article')
}
export const getArticleDetail = async ({
  id,
}: {
  id: string
}): Promise<any> => {
  return await api_1.get(`/article/${id}`)
}

export const getPriceWithTransfer = async ({
  address,
  chain,
}: {
  address: string
  chain: string
}): Promise<PriceWithTransferResponse> => {
  return await api.get('v1/token/price_with_transfer', {
    params: {
      address,
      chain,
    },
  })
}
// find gems
export const getFindGemsWithdraw = async ({
  start,
  limit,
  chain,
  duration,
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
  start: number
  limit: number
  chain: string
  duration: string
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
}): Promise<FindGemsWithdrawResponse> => {
  return api.get('/v1/findgems/withdraw', {
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

export const getFindGemsDeposit = async ({
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
  duration: string
}): Promise<FindGemsDepositResponse> => {
  return await api.get('/v1/findgems/deposit', {
    params: {
      start,
      limit,
      chain,
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
      duration,
    },
  })
}

export const getFindGemsUnusualCex = async ({
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
}): Promise<FindGemsUnusualCexResponse> => {
  return await api.get('/v1/findgems/unusual_cex', {
    params: {
      start,
      limit,
      chain,
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
      duration,
    },
  })
}

export const getFindGemsSMNewListingsBuy = async ({
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
}): Promise<NewListingBuyResponse> => {
  return await api.get('/v1/token/smart_money_new_listing_buy', {
    params: {
      start,
      limit,
      chain,
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
      duration,
    },
  })
}

export const getFindGemsFreshWalletUnusual = async ({
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
}): Promise<UnusualBuyResponse> => {
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

export const getFindGemsSmartMoneyHolding = async ({
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
}): Promise<FindGemsSmartMoneyHoldingResponse> => {
  return await api.get('/v1/findgems/smart_money_holding', {
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
//
export const getTradingSignal = async ({
  start,
  limit,
  chain,
}: {
  start: number
  limit: number
  chain: string
}): Promise<TradingSignalResponse> => {
  return await chatApi.get(`/signals`, {
    params: {
      start,
      limit,
      chain,
    },
  })
}

export const getTradingSignalWinRate = async ({
  chain,
}: {
  chain: string
}): Promise<TradingSignalResponse> => {
  return await signalApi.get(`/total-win-rate`, {
    params: {
      chain,
    },
  })
}
export const getTotalWinRate = async (): Promise<TotalWinRateResponse> => {
  return await signalApi.get(`/total-win-rate`)
}

export const getTotalSignalROI = async (): Promise<TotalSignalROIResponse> => {
  return await signalApi.get(`/total-signal-roi`)
}

export const getListChanel = async (): Promise<ListChannelResponse> => {
  return await signalApi.get(`/channels`)
}

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

export const getChanelDetail = async ({
  id,
}: {
  id: string
}): Promise<ChannelResponse> => {
  return await signalApi.get(`/channels/${id}`)
}

export const getUserInfo = async ({
  address,
  chain,
}: {
  address: string
  chain: string
}): Promise<UserInfoResponse> => {
  return await userApi.get('/v1/user/info', {
    params: {
      chain,
      address,
    },
  })
}

export const getUserBalance = async ({
  addresses,
  address,
  chain,
}: {
  addresses?: string
  address?: string
  chain?: string
}): Promise<UserBalanceResponse> => {
  return await solanaApi.get(`/balance`, {
    params: {
      addresses,
      address,
      chain,
    },
  })
}
//
export const getOngoingSignal = async ({
  id,
  page,
  perPage,
}: {
  id: string
  page: number
  perPage: number
}): Promise<OnGoingSignalResponse> => {
  return await signalApi.get(`/channels/${id}/ongoing-signals`, {
    params: {
      page,
      perPage,
    },
  })
}

export const getSignalTriggered = async ({
  id,
  page,
  perPage,
}: {
  id: string
  page: number
  perPage: number
}): Promise<SignalTriggeredResponse> => {
  return await signalApi.get(`/channels/${id}/signals-triggered`, {
    params: {
      page,
      perPage,
    },
  })
}
export const getRoiAnalyst = async ({
  id,
  page,
  perPage,
}: {
  id: string
  page: number
  perPage: number
}): Promise<any> => {
  return await signalApi.get(`/channels/${id}/roi-analyst`, {
    params: {
      page,
      perPage,
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

export const getSmartMoneyTokenSummary = (chain: string, address: string) => {
  return userApi.get('/v1/token/smart_money_token_summary', {
    params: {
      chain,
      address,
    },
  })
}
