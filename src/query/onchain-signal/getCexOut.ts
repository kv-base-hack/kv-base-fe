import { getCexOut } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_CEX_OUT = 'GET_CEX_OUT'

export const useCexOutQuery = ({
  limitTopNetCexOut,
  duration,
}: {
  limitTopNetCexOut: number
  duration: string
}) =>
  useQuery({
    queryKey: [GET_CEX_OUT, { limitTopNetCexOut, duration }],
    queryFn: () => getCexOut({ limitTopNetCexOut, duration }),
  })
