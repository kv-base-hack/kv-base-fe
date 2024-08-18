import { getUserBalance } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_USER_BALANCE = 'GET_USER_BALANCE'

export const useGetUserBalanceQuery = ({
  address,
  addresses,
  chain,
  page = 1,
  perPage = 10,
  duration,
}: {
  address?: string
  addresses?: string
  chain?: string
  page?: number
  perPage?: number
  duration: string
}) => ({
  queryKey: [
    GET_USER_BALANCE,
    { address, addresses, chain, page, perPage, duration },
  ],
  queryFn: async () => {
    const data = await getUserBalance({ address, addresses, chain, duration })
    return data.data
  },
})
