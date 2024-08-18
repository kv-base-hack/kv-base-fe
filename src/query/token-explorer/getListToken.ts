import { getTokenList } from '@/services/api'

const GET_TOKEN_LIST = 'GET_TOKEN_LIST'

export const useTokenListQuery = ({
  symbol_search,
  chain,
  enabled = true,
}: {
  symbol_search: string
  chain: string
  enabled?: boolean
}) => ({
  queryKey: [GET_TOKEN_LIST, { symbol_search, chain, enabled }],
  enabled,
  queryFn: async () => {
    const result = await getTokenList({ symbol_search, chain })
    return result.data
  },
})
