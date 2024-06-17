import { getUserBalance } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_USER_BALANCE = 'GET_USER_BALANCE'

export const useGetUserBalanceQuery = ({
  address,
  addresses,
  chain,
  page,
  perPage
}: {
  address?: string
  addresses?: string
    chain?: string
    page?: number
    perPage?: number
}) =>
  useQuery({
    queryKey: [GET_USER_BALANCE, { address, addresses, chain, page, perPage }],
    queryFn: () => getUserBalance({ address, addresses, chain }),
  })
