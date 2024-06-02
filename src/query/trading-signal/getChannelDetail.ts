import { getChanelDetail } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_CHANNEL_DETAIL = 'GET_CHANNEL_DETAIL'

export const useGetChannelDetailQuery = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [GET_CHANNEL_DETAIL, { id }],
    queryFn: () => getChanelDetail({ id }),
  })
