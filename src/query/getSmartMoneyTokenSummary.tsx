import { getSmartMoneyTokenSummary } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_SMART_MONEY_TOKEN_SUMMARY = 'GET_SMART_MONEY_TOKEN_SUMMARY'

export const useGetSmartMoneyTokenSummaryQuery = (
  chainId: string,
  address: string,
) => {
  return useQuery({
    queryKey: [GET_SMART_MONEY_TOKEN_SUMMARY, { chainId, address }],
    queryFn: () => getSmartMoneyTokenSummary(chainId, address),
    enabled: !!chainId && !!address,
  })
}
