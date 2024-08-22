'use server'

import { CHAIN } from '@/constant/chain'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { AiTradingSignal } from '@/components/pages/trading-signal/ai-trading-signal'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'

async function SignalPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(
      useGetDexTradingSignalQuery({
        limit: parseInt(searchParams?.limit_signal?.toString() || '9'),
        start: parseInt(searchParams?.start_signal?.toString() || '1'),
        chain: searchParams?.chain_signal?.toString() || CHAIN,
        token_addresses: searchParams?.ta_signal?.toString() || '',
        type: searchParams?.type_signal?.toString() || '',
      }),
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AiTradingSignal searchParams={searchParams} />
    </HydrationBoundary>
  )
}

export default SignalPage
