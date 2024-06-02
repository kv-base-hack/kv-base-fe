'use client'

import { getListChanel } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const GET_LIST_CHANNEL = 'GET_LIST_CHANNEL'

export const useGetListChannelQuery = () =>
  useQuery({
    queryKey: [GET_LIST_CHANNEL],
    queryFn: () => getListChanel(),
  })
