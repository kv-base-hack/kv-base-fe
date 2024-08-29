import { getTokenInfo } from '@/services/api'

const GET_TOKEN_INFO = 'GET_TOKEN_INFO'

export const useTokenInfoQuery = ({
  chain,
  address,
}: {
  chain: string
  address: string
}) => ({
  queryKey: [GET_TOKEN_INFO, { chain, address }],
  queryFn: async () => {
    const result = await getTokenInfo({ chain, address })

    return result.data
  },
})
