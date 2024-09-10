'use server'

import Dashboard from '@/components/pages/dashboard'
import { CHAIN } from '@/constant/chain'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useFirstTimeBuyQuery } from '@/query/find-gems/getFirstTimeBuy'
import { useGetSpotlight } from '@/query/leaderboard/getSpotlight'
import { useFreshUnusualBuyQuery } from '@/query/onchain-signal/getFreshWalletUnusualBuy'
import { useSMNewListingBuyQuery } from '@/query/onchain-signal/getSMNewListingBuys'
import { useGetTopTokenBuy } from '@/query/onchain-signal/getTopTokenBuy'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import { useGetTotalScore } from '@/query/total-score/getTotalScore'

import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

async function DashboardPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(
      useFindGemsSmartMoneyHoldingQuery({
        start: 1,
        limit: 5,
        chain: searchParams?.chain?.toString() || CHAIN,
        sort_by: 'hold_in_usdt',
        duration: '24h',
      }),
    ),
    queryClient.prefetchQuery(
      useGetSpotlight({
        start: 1,
        limit: 2,
        chain: CHAIN,
      }),
    ),
    queryClient.prefetchQuery(
      useGetDexTradingSignalQuery({
        start: 1,
        limit: 2,
        type: '',
        token_addresses: '',
        chain: CHAIN,
      }),
    ),
    queryClient.prefetchQuery(
      useTopTokenProfitQuery({
        start: 1,
        limit: 8,
        duration: searchParams?.ttp_duration?.toString() || '1d',
        sort_by: '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFreshUnusualBuyQuery({
        start: parseInt(searchParams?.fub_start?.toString() || '1'),
        limit: parseInt(searchParams?.fub_limit?.toString() || '5'),
        duration: searchParams?.fub_duration?.toString() || '24h',
        sort_by: searchParams?.fub_sort?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useSMNewListingBuyQuery({
        start: parseInt(searchParams?.nlb_start?.toString() || '1'),
        limit: parseInt(searchParams?.nlb_limit?.toString() || '5'),
        duration: searchParams?.nlb_duration?.toString() || '24h',
        sort_by: searchParams?.nlb_sort?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useGetTopTokenBuy({
        start: parseInt(searchParams?.ttb_start?.toString() || '1'),
        limit: parseInt(searchParams?.ttb_limit?.toString() || '5'),
        duration: searchParams?.ttb_duration?.toString() || '1d',
        sort_by: searchParams?.ttb_sort?.toString() || '',
        chain: CHAIN,
        action: 'buying',
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFirstTimeBuyQuery({
        start: parseInt(searchParams?.ftb_start?.toString() || '1'),
        limit: parseInt(searchParams?.ftb_limit?.toString() || '5'),
        duration: searchParams?.ftb_duration?.toString() || '24h',
        sort_by: searchParams?.ftb_sort?.toString() || 'volume',
        chain: CHAIN,
      }),
    ),
    queryClient.prefetchQuery(useGetTotalScore({ chain: CHAIN })),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard searchParams={searchParams} />
    </HydrationBoundary>
  )
}

export default DashboardPage
