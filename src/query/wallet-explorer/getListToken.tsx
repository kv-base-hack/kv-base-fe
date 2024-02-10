import { fetchListToken } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_LIST_TOKEN = 'GET_LIST_TOKEN'
export const listTokenQueryOptions = queryOptions({
  queryKey: [GET_LIST_TOKEN],
  queryFn: () => fetchListToken(),
})
