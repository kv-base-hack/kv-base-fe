import { getCexOut } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_CEX_OUT = 'GET_CEX_OUT'

export const cexOutQueryOptions = ({
  limitTopNetCexOut,
  duration,
}: {
  limitTopNetCexOut: number
  duration: string
}) =>
  queryOptions({
    queryKey: [GET_CEX_OUT, { limitTopNetCexOut, duration }],
    queryFn: () => getCexOut({ limitTopNetCexOut, duration }),
  })
