import { getTokenList } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_LIST = 'GET_TOKEN_LIST'

export const useTokenListQuery = ({
  symbol_search,
  chain,
}: {
  symbol_search: string
  chain: string
}) =>
  useQuery({
    queryKey: [GET_TOKEN_LIST, { symbol_search, chain }],
    queryFn: () => getTokenList({ symbol_search, chain }),
  })
