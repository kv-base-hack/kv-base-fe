import { getCexDeposit } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_CEX_DEPOSIT = 'GET_CEX_DEPOSIT'

export const useCexDepositQuery = ({
  limit,
  duration,
  start,
  chain,
}: {
  limit: number
  duration: string
  start: number
  chain: string
}) =>
  useQuery({
    queryKey: [GET_CEX_DEPOSIT, { limit, duration, start, chain }],
    queryFn: () => getCexDeposit({ limit, duration, start, chain }),
  })
