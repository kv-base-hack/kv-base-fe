import { CexInResponse } from '@/types/cexIn'
import { CexOutResponse } from '@/types/cexOut'
import { CourseResponse } from '@/types/course'
import { LeaderboardResponse } from '@/types/leaderboard'
import { TokenListResponse } from '@/types/tokenList'
import { TopActivityResponse } from '@/types/topActivity'
import { TopTokenProfitResponse } from '@/types/topTokenProfit'
import { TopUserProfitResponse } from '@/types/topUserProfit'
import { TrackResponse } from '@/types/track'
import { TrendingTokenResponse } from '@/types/trendingToken'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://onchain.kai.13thstation.xyz',
})

const api_1 = axios.create({
  baseURL: 'https://academy.kai.13thstation.xyz',
})

export const fetchSmartMoneyRanking = async () => {
  console.log(`Fetching ...`)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '2',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '3',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '4',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '5',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
  ]
}

export const activity = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
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
      movements: 'OUTFLOW',
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
      movements: 'OUTFLOW',
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
      movements: 'OUTFLOW',
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
      movements: 'OUTFLOW',
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

export const tradeStatistic = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
    {
      id: '2',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
    {
      id: '3',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
    {
      id: '4',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
  ]
}

export const portfolio = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '2',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '3',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '4',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '5',
      symbol: 'USDT',
      amount: 39939.33,
    },
  ]
}

export const getTrendingToken = async (): Promise<TrendingTokenResponse> => {
  return await api.get('/v1/token/trending')
}

export const getCexIn = async ({
  limit = 5,
  start = 1,
  duration = '24h',
  chain = 'eth',
}): Promise<CexInResponse> => {
  return await api.get('/v1/token_cex_in', {
    params: {
      limit,
      duration,
      start,
      chain,
    },
  })
}

export const getCexOut = async ({
  limit = 5,
  start = 1,
  duration = '24h',
  chain = 'eth',
}): Promise<CexOutResponse> => {
  return await api.get('/v1/token_cex_out', {
    params: {
      limit,
      duration,
      start,
      chain,
    },
  })
}

export const getTopTokenProfit = async ({
  limit = 10,
  duration = '24h',
  start = 1,
  chain = 'eth',
}): Promise<TopTokenProfitResponse> => {
  return await api.get('/v1/token/profit', {
    params: {
      limit,
      start,
      chain,
      duration,
    },
  })
}

export const getTopUserProfit = async ({
  limitTopAddress = 5,
  duration = '24h',
}): Promise<TopUserProfitResponse> => {
  return await api.get('/v1/user/profit', {
    params: {
      limitTopAddress,
      duration,
    },
  })
}
export const getTopActivity = async ({
  action = 'all',
  limit = 10,
  start = 1,
  chain = 'eth',
}): Promise<TopActivityResponse> => {
  return await api.get('/v1/activities', {
    params: {
      chain,
      action,
      limit,
      start,
    },
  })
}

export const getLeaderboard = async ({
  limit = 5,
  start = 1,
  chain = 'eth',
}): Promise<LeaderboardResponse> => {
  return await api.get('/v1/leaderboard', {
    params: {
      chain,
      limit,
      start,
    },
  })
}

export const getTokenList = async ({
  symbol_search,
}: {
  symbol_search: string
}): Promise<TokenListResponse> => {
  return await api.get('/v1/token/list', {
    params: {
      symbol_search,
      chain: 'eth',
    },
  })
}

export const getTrack = async (): Promise<TrackResponse> => {
  return await api_1.get('/track')
}

export const getCourse = async ({ id }: { id: string }): Promise<CourseResponse> => {
  return await api_1.get(`/course/${id}`)
}

export const getArticleTopic = async (): Promise<any> => {
  return await api_1.get('/article/topics')
}

export const getArticle = async (): Promise<any> => {
  return await api_1.get('/article')
}
export const getArticleDetail = async ({ id }: { id: string }): Promise<any> => {
  return await api_1.get(`/article/${id}`)
}
