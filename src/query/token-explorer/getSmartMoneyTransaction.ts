import { getSmartMoneyTransaction } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_SMART_MONEY_TRANSACTION = 'GET_SMART_MONEY_TRANSACTION'

export const useSmartMoneyTransactionQuery = ({
  limit,
  start,
  address,
  chain,
  action,
  amount_filter,
}: {
  limit: number
  start: number
  address: string
  chain: string
  action: string
  amount_filter: string
}) =>
  useQuery({
    queryKey: [
      GET_SMART_MONEY_TRANSACTION,
      {
        limit,
        start,
        address,
        chain,
        action,
        amount_filter,
      },
    ],
    queryFn: () =>
      getSmartMoneyTransaction({
        limit,
        start,
        address,
        chain,
        action,
        amount_filter,
      }),
  })
