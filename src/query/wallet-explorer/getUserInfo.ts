import { getUserInfo } from '@/services/api'

const GET_USER_INFO = 'GET_USER_INFO'

export const useGetUserInfoQuery = ({
  address,
  chain,
  duration
}: {
  address: string
  chain: string
  duration?: string
}) =>
({
  queryKey: [GET_USER_INFO, { address, chain, duration }],
  queryFn: async () => {
    const data = await getUserInfo({ address, chain, duration })
    return data.data
  },
})
