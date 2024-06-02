'use client'
import React, { use, useEffect, useState } from 'react'
import { runTechnicalAnalysis } from './action'
import { BotMessage } from '@/components/common'
import { StreamableValue } from 'ai/rsc'
import { useQuery } from '@tanstack/react-query'

interface TechnicalAnalysisProps {
  data: any // TODO: Define data type
}

export const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({
  data,
}) => {
  const { data: msg } = useQuery({
    queryKey: ['technicalAnalysis', data],
    queryFn: async () => {
      return runTechnicalAnalysis(data)
    },
  })

  if (!msg) {
    return
  }
  return <BotMessage content={msg} />
}
