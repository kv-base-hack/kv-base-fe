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
        limit: parseInt(searchParams?.limit?.toString() || '10'),
        start: parseInt(searchParams?.start?.toString() || '1'),
        sort_by: searchParams?.sort_by?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFreshUnusualBuyQuery({
        limit: parseInt(searchParams?.limit?.toString() || '10'),
        start: parseInt(searchParams?.start?.toString() || '1'),
        duration: searchParams?.duration?.toString() || '24h',
        sort_by: searchParams?.sort_by?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFindGemsSMNewListingsBuyQuery({
        limit: parseInt(searchParams?.limit?.toString() || '10'),
        start: parseInt(searchParams?.start?.toString() || '1'),
        duration: searchParams?.duration?.toString() || '24h',
        sort_by: searchParams?.sort_by?.toString() || '',
        chain: CHAIN,
      }),
    ),
    //
    queryClient.prefetchQuery(
      useGetTopTokenBuy({
        limit: parseInt(searchParams?.limit?.toString() || '10'),
        start: parseInt(searchParams?.start?.toString() || '1'),
        duration: searchParams?.duration?.toString() || '1d',
        sort_by: searchParams?.sort_by?.toString() || '',
        chain: CHAIN,
        action: 'buying',
      }),
    ),
    //
    queryClient.prefetchQuery(
      useFirstTimeBuyQuery({
        limit: parseInt(searchParams?.limit?.toString() || '10'),
        start: parseInt(searchParams?.start?.toString() || '1'),
        duration: searchParams?.duration?.toString() || '24h',
        sort_by: searchParams?.sort_by?.toString() || 'volume',
        chain: CHAIN,
      }),
    ),
    queryClient.prefetchQuery(
      useFindGemsFreshWalletUnusualQuery({
        limit: parseInt(searchParams?.limit?.toString() || '10'),
        start: parseInt(searchParams?.start?.toString() || '1'),
        duration: searchParams?.duration?.toString() || '24h',
        sort_by: searchParams?.sort_by?.toString() || '',
        chain: CHAIN,
      }),
    ),

    queryClient.prefetchQuery(
      useFindGemsTopScore({
        start: parseInt(searchParams?.start?.toString() || '1'),
        limit: parseInt(searchParams?.limit?.toString() || '10'),
        duration: searchParams?.duration?.toString() || '24h',
        sort_by: searchParams?.sort_by?.toString() || '',
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
