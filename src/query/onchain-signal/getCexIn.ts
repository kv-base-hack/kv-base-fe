import { getCexIn } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_CEX_IN = 'GET_CEX_IN'

export const useCexInQuery = ({
  limitTopNetCexIn,
  duration,
}: {
  limitTopNetCexIn: number
  duration: string
}) =>
  useQuery({
    queryKey: [GET_CEX_IN, { limitTopNetCexIn, duration }],
    queryFn: () => getCexIn({ limitTopNetCexIn, duration }),
  })
