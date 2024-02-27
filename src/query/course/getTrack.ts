import { getTrack } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_TRACK = 'GET_TRACK'

export const useTrackQuery = () =>
  useQuery({
    queryKey: [GET_TRACK],
    queryFn: () => getTrack(),
  })
