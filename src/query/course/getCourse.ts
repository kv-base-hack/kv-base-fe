import { getCourse } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_COURSE = 'GET_COURSE'

export const useCourseQuery = ({ id }: { id: string }) =>
  useQuery({
    queryKey: [GET_COURSE, { id }],
    queryFn: () => getCourse({ id }),
  })
