import { getCexIn } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_CEX_IN = 'GET_CEX_IN'

export const cexInQueryOptions = ({
  limitTopNetCexIn,
  duration,
}: {
  limitTopNetCexIn: number
  duration: string
}) =>
  queryOptions({
    queryKey: [GET_CEX_IN],
    queryFn: () => getCexIn({ limitTopNetCexIn, duration }),
  })
