import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsSMNewListingsBuy } from '@/components/common/DataTable/TableFindGemsSMNewListingsBuy'
import { useFindGemsSMNewListingsBuyQuery } from '@/query/find-gems/getFindGemsSMNewListingsBuy'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { parseAsInteger, useQueryState } from 'nuqs'
import React from 'react'

interface FindGemsTabSMNewListingsBuyProps {
  tab: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabSMNewListingsBuy: React.FC<
  FindGemsTabSMNewListingsBuyProps
> = ({ tab, searchParams }) => {
  const currentPage = parseInt(searchParams?.nlb_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.nlb_limit?.toString() || '10')
  const currentDuration = searchParams?.nlb_duration?.toString() || '24h'
  const currentSortBy = searchParams?.nlb_sort?.toString() || ''

  const [, setPage] = useQueryState(
    'nlb_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const [, setSortBy] = useQueryState('nlb_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  const [filter] = useAtom(gemFilterAtom)

  // unusual cex
  const findGemsUnusualCexQuery = useQuery(
    useFindGemsSMNewListingsBuyQuery({
      limit: currentPerPage,
      start: currentPage,
      chain: 'solana',
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
  const dataFindGemsUnusualCex = findGemsUnusualCexQuery.isFetching
    ? [...Array(currentPerPage).keys()]
    : findGemsUnusualCexQuery.data?.smart_money_new_listing_buy || []
  const totalFindGemUnusualCex = findGemsUnusualCexQuery.data?.total || 1

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  return (
    <TableFindGemsSMNewListingsBuy
      tab={tab}
      page={currentPage}
      perPage={currentPerPage}
      setPage={setPage}
      data={dataFindGemsUnusualCex}
      total={totalFindGemUnusualCex}
      isFetching={findGemsUnusualCexQuery.isFetching}
      setSort={handleSortBy}
      duration={currentDuration}
    />
  )
}
