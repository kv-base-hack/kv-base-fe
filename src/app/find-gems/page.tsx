import { FindGemsPage } from '@/components/pages/find-gems/find-gems-page'
import { CHAIN } from '@/constant/chain'
import { useFindGemsFreshWalletUnusualQuery } from '@/query/find-gems/getFindGemsFreshWalletUnusual'
import { useFindGemsSMNewListingsBuyQuery } from '@/query/find-gems/getFindGemsSMNewListingsBuy'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useFindGemsTopScore } from '@/query/find-gems/getFindGemsTopScore'
import { useFreshUnusualBuyQuery } from '@/query/find-gems/getFindGemsUnusualBuy'
import { useFirstTimeBuyQuery } from '@/query/find-gems/getFirstTimeBuy'
import { useGetTopTokenBuy } from '@/query/onchain-signal/getTopTokenBuy'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

async function FindGems({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(
      useFindGemsSmartMoneyHoldingQuery({
        limit: parseInt(searchParams?.smh_limit?.toString() || '10'),
        start: parseInt(searchParams?.smh_start?.toString() || '1'),
        duration: searchParams?.smh_duration?.toString() || '24h',
        sort_by: searchParams?.smh_sort?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFreshUnusualBuyQuery({
        limit: parseInt(searchParams?.fub_limit?.toString() || '10'),
        start: parseInt(searchParams?.fub_start?.toString() || '1'),
        duration: searchParams?.fub_duration?.toString() || '24h',
        sort_by: searchParams?.fub_sort?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFindGemsSMNewListingsBuyQuery({
        limit: parseInt(searchParams?.nlb_limit?.toString() || '10'),
        start: parseInt(searchParams?.nlb_start?.toString() || '1'),
        duration: searchParams?.nlb_duration?.toString() || '24h',
        sort_by: searchParams?.nlb_sort?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useGetTopTokenBuy({
        limit: parseInt(searchParams?.ttb_limit?.toString() || '10'),
        start: parseInt(searchParams?.ttb_start?.toString() || '1'),
        duration: searchParams?.ttb_duration?.toString() || '1d',
        sort_by: searchParams?.ttb_sort?.toString() || '',
        chain: CHAIN,
        action: 'buying',
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFirstTimeBuyQuery({
        limit: parseInt(searchParams?.ftb_limit?.toString() || '10'),
        start: parseInt(searchParams?.ftb_start?.toString() || '1'),
        duration: searchParams?.ftb_duration?.toString() || '24h',
        sort_by: searchParams?.ftb_sort?.toString() || 'volume',
        chain: CHAIN,
      }),
    ),
    queryClient.prefetchQuery(
      useFindGemsFreshWalletUnusualQuery({
        limit: parseInt(searchParams?.ub_limit?.toString() || '10'),
        start: parseInt(searchParams?.ub_start?.toString() || '1'),
        duration: searchParams?.ub_duration?.toString() || '24h',
        sort_by: searchParams?.ub_sort?.toString() || '',
        chain: CHAIN,
      }),
    ),

    queryClient.prefetchQuery(
      useFindGemsTopScore({
        start: parseInt(searchParams?.ub_start?.toString() || '1'),
        limit: parseInt(searchParams?.ub_limit?.toString() || '10'),
        duration: searchParams?.ub_duration?.toString() || '24h',
        sort_by: searchParams?.ub_sort?.toString() || '',
        chain: CHAIN,
      }),
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FindGemsPage searchParams={searchParams} />
    </HydrationBoundary>
  )
}

export default FindGems
