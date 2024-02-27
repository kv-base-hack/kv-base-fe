import { getTokenList } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_LIST = 'GET_TOKEN_LIST'

export const useTokenListQuery = ({ symbol_search }: { symbol_search: string }) =>
  useQuery({
    queryKey: [GET_TOKEN_LIST, { symbol_search }],
    queryFn: () => getTokenList({ symbol_search }),
  })
