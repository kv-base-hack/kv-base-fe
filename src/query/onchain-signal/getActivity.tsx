import { activity } from '@/services/api'
import { queryOptions } from '@tanstack/react-query'

const GET_ACTIVITY = 'GET_ACTIVITY'

export const activityQueryOptions = (groupId: string) =>
  queryOptions({
    queryKey: [GET_ACTIVITY, groupId],
    queryFn: () => activity(groupId),
  })
