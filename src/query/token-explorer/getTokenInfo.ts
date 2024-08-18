import { getTokenInfo } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_INFO = 'GET_TOKEN_INFO'

export const useTokenInfoQuery = ({
  chain,
  address,
}: {
  chain: string
  address: string
}) =>
  useQuery({
    queryKey: [GET_TOKEN_INFO, { chain, address }],
    queryFn: () => getTokenInfo({ chain, address }),
    enabled: Boolean(chain) && Boolean(address),
  })
