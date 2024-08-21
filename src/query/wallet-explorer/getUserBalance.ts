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
}) =>
  useQuery({
    queryKey: [GET_USER_BALANCE, { address, addresses, chain }],
    queryFn: () => getUserBalance({ address, addresses, chain }),
  })
