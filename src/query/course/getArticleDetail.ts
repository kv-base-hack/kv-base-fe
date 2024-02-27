import { getArticleDetail } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_ARTICLE_DETAIL = 'GET_ARTICLE_DETAIL'

export const useArticleDetailQuery = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [GET_ARTICLE_DETAIL, { id }],
    queryFn: () => getArticleDetail({ id }),
  })
