import { getUserInfo } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_USER_INFO = 'GET_USER_INFO'

export const useGetUserInfoQuery = ({
  address,
  chain,
}: {
  address: string
  chain: string
}) =>
({
  queryKey: [GET_USER_INFO, { address, chain }],
  queryFn: async () => {
    const data = await getUserInfo({ address, chain })
    return data.data
  },
})
