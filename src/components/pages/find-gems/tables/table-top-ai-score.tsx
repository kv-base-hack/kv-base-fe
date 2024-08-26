'use client'

import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsTopScoreByAi } from '@/components/common/DataTable/table-find-gems-top-score'
import { CHAIN } from '@/constant/chain'

import { useFindGemsTopScore } from '@/query/find-gems/getFindGemsTopScore'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { parseAsInteger, useQueryState } from 'nuqs'
import React from 'react'

interface FindGemsTabSmartTopScoreAiProps {
  tab: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTopAiScore: React.FC<FindGemsTabSmartTopScoreAiProps> = ({
  tab,
  searchParams,
}) => {
  const currentPage = parseInt(searchParams?.smh_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.smh_limit?.toString() || '10')
  const currentDuration = searchParams?.smh_duration?.toString() || '24h'
  const currentSortBy = searchParams?.smh_sort?.toString() || ''

  const [, setPage] = useQueryState(
    'smh_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const [, setSortBy] = useQueryState('smh_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  const [filter] = useAtom(gemFilterAtom)

  // smart money top score ai
  const findGemsTopScoreByAI = useQuery(
    useFindGemsTopScore({
      limit: currentPerPage,
      start: currentPage,
      chain: CHAIN,
      price_change_24h_min: filter.min24hVolumn,
      price_change_24h_max: filter.max24hVolumn,
      market_cap_min: filter.minMarketcap,
      market_cap_max: filter.maxMarketcap,
      fdv_min: filter.minFDV,
      fdv_max: filter.maxFDV,
      volume_24h_min: filter.min24hVolumn,
      volume_24h_max: filter.max24hVolumn,
      cex_net_flow_min: filter.minCexNetflow,
      cex_net_flow_max: filter.maxCexNetflow,
      sort_by: currentSortBy,
      duration: currentDuration,
    }),
  )

  const dataFindGemsTopScore = findGemsTopScoreByAI.isFetching
    ? [...Array(currentPerPage).keys()]
    : findGemsTopScoreByAI.data?.users || []

  const totalFindGemsTopScore = findGemsTopScoreByAI.data?.total || 1

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  return (
    <TableFindGemsTopScoreByAi
      tab={tab}
      page={currentPage}
      perPage={currentPerPage}
      setPage={setPage}
      data={dataFindGemsTopScore}
      total={totalFindGemsTopScore}
      isFetching={findGemsTopScoreByAI.isFetching}
      setSort={handleSortBy}
    />
  )
}
