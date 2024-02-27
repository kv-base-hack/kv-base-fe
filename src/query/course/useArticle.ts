import { getArticle } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_ARTICLE = 'GET_ARTICLE'

export const useArticleQuery = () =>
  useQuery({
    queryKey: [GET_ARTICLE],
    queryFn: () => getArticle(),
  })
