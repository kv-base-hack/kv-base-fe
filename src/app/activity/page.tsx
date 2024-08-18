'use server'

import { CHAIN } from '@/constant/chain'
import { Activity } from '@/components/pages/activity'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { useTokenListQuery } from '@/query/token-explorer/getListToken'
import { useGetSpotlight } from '@/query/leaderboard/getSpotlight'
import { useTopActivityQuery } from '@/query/leaderboard/getTopActivity'

async function ActivityPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(
      useTopActivityQuery({
        action: searchParams?.action?.toString() || 'all',
        limit: parseInt(searchParams?.limit_activity?.toString() || '10'),
        start: parseInt(searchParams?.start_activity?.toString() || '1'),
        chain: searchParams?.chain?.toString() || CHAIN,
        amount_filter: searchParams?.amount_filter?.toString() || '',
        token_addresses: searchParams?.token_addresses?.toString() || '',
        sort_by: searchParams?.sort_by?.toString() || '',
      }),
    ),
    queryClient.prefetchQuery(
      useGetSpotlight({
        chain: CHAIN,
        start: Number(searchParams?.start_spotlight || '1'),
        limit: Number(searchParams?.limit_spotlight || '5'),
      }),
    ),
    queryClient.prefetchQuery(
      useTokenListQuery({
        symbol_search: '',
        chain: CHAIN,
      }),
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Activity searchParams={searchParams} />
    </HydrationBoundary>
  )
}

export default ActivityPage
