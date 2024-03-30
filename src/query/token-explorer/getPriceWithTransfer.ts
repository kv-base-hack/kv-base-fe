import { getPriceWithTransfer } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_PRICE_WITH_TRANSFER = 'GET_PRICE_WITH_TRANSFER'

export const useGetPriceWithTransferQuery = ({
  address,
  chain,
}: {
  address: string
  chain: string
}) =>
  useQuery({
    queryKey: [GET_PRICE_WITH_TRANSFER, { address, chain }],
    queryFn: () => getPriceWithTransfer({ address, chain }),
  })
