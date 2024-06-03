import { getUserBalance } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_USER_BALANCE = 'GET_USER_BALANCE'

export const useGetUserBalanceQuery = ({
  address,
  addresses,
  chain,
}: {
  address?: string
  addresses?: string
  chain?: string
}) => ({
  queryKey: [GET_USER_BALANCE, { address, addresses, chain }],
  queryFn: async () => {
    const data = await getUserBalance({ address, addresses, chain })
    return data.data
  },
})
