'use client'

import { BotMessage } from '@/components/common'
import React from 'react'
import { runNews } from './action'
import { useQuery } from '@tanstack/react-query'

interface MarketNewsProps {
  input: string
  data: any
}

export const MarketNews: React.FC<MarketNewsProps> = ({ input, data }) => {
  const { data: msg } = useQuery({
    queryKey: ['ai_news', input, data],
    queryFn: async () => {
      const news = data.news.join('\n\n')
      const insights = data.insights.join('\n\n')
      return runNews(
        input,
        `
        ## News
        ${news}

        ## Insights
        ${insights}
      `,
      )
    },
  })

  if (!msg) {
    return
  }
  return <BotMessage content={msg} />
}
