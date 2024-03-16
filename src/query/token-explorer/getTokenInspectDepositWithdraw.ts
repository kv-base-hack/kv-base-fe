import { getTokenInspectDepositWithdraw } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOKEN_INSPECT_DEPOSIT_WITHDRAW = 'GET_TOKEN_INSPECT_DEPOSIT_WITHDRAW'

export const useTokenInspectDepositWithdrawQuery = ({
  duration,
  address,
  chain,
}: {
  duration: string
  address: string
  chain: string
}) =>
  useQuery({
    queryKey: [
      GET_TOKEN_INSPECT_DEPOSIT_WITHDRAW,
      {
        duration,
        address,
        chain,
      },
    ],
    queryFn: () =>
      getTokenInspectDepositWithdraw({
        duration,
        address,
        chain,
      }),
  })
