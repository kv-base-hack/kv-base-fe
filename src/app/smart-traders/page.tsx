'use server'

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { useTopTokenProfitQuery } from '@/query/onchain-signal/getTopTokenProfit'
import { useLeaderboardQuery } from '@/query/leaderboard/getLeaderboard'
import { WalletAnalysis } from '@/components/pages/smart-traders'
import { CHAIN } from '@/constant/chain'
import { useLeaderboardSpotlightQuery } from '@/query/leaderboard/getLeaderboardSpotlight'

async function WalletAnalysisPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(
      useTopTokenProfitQuery({
        limit: 8,
        start: 1,
        duration: searchParams?.ttp_duration?.toString() || '1d',
        sort_by: '',
        chain: 'base',
      }),
    ),
    queryClient.prefetchQuery(
      useLeaderboardQuery({
        limit: parseInt(searchParams?.limit_leaderboard?.toString() || '10'),
        start: parseInt(searchParams?.start_leaderboard?.toString() || '1'),
        chain: searchParams?.chain_leaderboard?.toString() || CHAIN,
        sortBy: searchParams?.sort_leaderboard?.toString() || '',
        token_addresses: searchParams?.ta_leaderboard?.toString() || '',
      }),
    ),
    queryClient.prefetchQuery(
      useLeaderboardSpotlightQuery({
        chain: CHAIN,
        duration: searchParams?.ttp_duration?.toString() || '24h',
      }),
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WalletAnalysis searchParams={searchParams} />
    </HydrationBoundary>
  )
}

export default WalletAnalysisPage
