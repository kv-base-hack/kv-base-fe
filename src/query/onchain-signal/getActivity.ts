import { activity } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_ACTIVITY = 'GET_ACTIVITY'

export const useActivityQuery = (groupId: string) =>
  useQuery({
    queryKey: [GET_ACTIVITY, groupId],
    queryFn: () => activity(groupId),
  })
