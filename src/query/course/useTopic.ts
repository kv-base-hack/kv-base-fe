import { getArticleTopic } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TOPIC = 'GET_TOPIC'

export const useTopicQuery = () =>
  useQuery({
    queryKey: [GET_TOPIC],
    queryFn: () => getArticleTopic(),
  })
