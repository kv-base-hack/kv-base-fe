import { getUserInfo } from '@/services/api'

const GET_USER_INFO = 'GET_USER_INFO'

export const useGetUserInfoQuery = ({
  address,
  chain,
  frame,
}: {
  address: string
  chain: string
  frame?: string
}) => ({
  queryKey: [GET_USER_INFO, { address, chain, frame }],
  queryFn: async () => {
    const result = await getUserInfo({ address, chain, frame })
    return result.data
  },
})
