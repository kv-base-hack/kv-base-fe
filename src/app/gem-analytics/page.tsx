import { FindGemsPage } from '@/components/pages/gem-analytics/FindGemsPage'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

async function GemAnalytics() {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(useFindGemsSmartMoneyHoldingQuery()),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FindGemsPage />
    </HydrationBoundary>
  )
}

export default GemAnalytics
