'use server'

import { CHAIN } from '@/constant/chain'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { useTokenInfoQuery } from '@/query/token-explorer/getTokenInfo'
import { useTopSmartMoneyForTokenQuery } from '@/query/token-explorer/getTopSmartMoneyForToken'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import { useTopActivityQuery } from '@/query/onchain-signal/getTopActivity'
import { useTokenInfoTradeQuery } from '@/query/token-explorer/get-token-info-trade'
import { useTokenInfoUnusualBuyQuery } from '@/query/token-explorer/get-token-info-unusual-buy'
import { TokenExplorerDetail } from '@/components/pages/token-info/token-info-detail'

async function TokenExplorerPage({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(
      useTokenInfoQuery({
        address: params?.token?.toString() || '',
        chain: CHAIN,
      }),
    ),
    queryClient.prefetchQuery(
      useTokenInfoTradeQuery({
        address: params?.token?.toString() || '',
        chain: CHAIN,
        duration: searchParams?.tit_duration?.toString() || '1d',
      }),
    ),
    queryClient.prefetchQuery(
      useTokenInfoUnusualBuyQuery({
        address: params?.token?.toString() || '',
        chain: CHAIN,
        duration: searchParams?.tiub_duration?.toString() || '24h',
      }),
    ),
    queryClient.prefetchQuery(
      useTopActivityQuery({
        limit: parseInt(searchParams?.smot_limit?.toString() || '10'),
        start: parseInt(searchParams?.smot_start?.toString() || '1'),
        chain: CHAIN,
        action: searchParams?.smot_action?.toString() || 'all',
        amount_filter: searchParams?.smot_amount_filter?.toString() || '',
        token_addresses: params?.token?.toString() || '',
        sort_by: searchParams?.smot_sort_by?.toString() || '',
      }),
    ),
    queryClient.prefetchQuery(
      useTopSmartMoneyForTokenQuery({
        limit: parseInt(searchParams?.smft_limit?.toString() || '10'),
        start: parseInt(searchParams?.smft_start?.toString() || '1'),
        chain: CHAIN,
        address: params?.token?.toString() || '',
      }),
    ),
    queryClient.prefetchQuery(
      useGetDexTradingSignalQuery({
        limit: parseInt(searchParams?.dts_limit?.toString() || '10'),
        start: parseInt(searchParams?.dts_start?.toString() || '1'),
        token_addresses: params?.token?.toString() || '',
        chain: CHAIN,
        type: '',
      }),
    ),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TokenExplorerDetail params={params} searchParams={searchParams} />
    </HydrationBoundary>
  )
}

export default TokenExplorerPage
