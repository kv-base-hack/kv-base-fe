import { getTokenList } from "@/services/leaderboard/api"

const GET_LIST_TOKENS = 'GET_LIST_TOKENS'

export const useGetListTokensQuery = ({
  symbol_search,
  chain,
  enabled = true,
}: {
  symbol_search: string
  chain: string
  enabled: boolean
}) => ({
  queryKey: [GET_LIST_TOKENS, { symbol_search, chain, enabled }],
  queryFn: async () => {
    const data = await getTokenList({ symbol_search, chain })
    return data.data
  },
  enabled,
})