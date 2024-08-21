import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsFreshWalletUnusual } from '@/components/common/DataTable/TableFindGemsFreshWalletUnusual'
import { useFindGemsFreshWalletUnusualQuery } from '@/query/find-gems/getFindGemsFreshWalletUnusual'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { parseAsInteger, useQueryState } from 'nuqs'
import React from 'react'

interface FindGemsTabFreshWalletUnusualProps {
  tab: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabFreshWalletUnusual: React.FC<
  FindGemsTabFreshWalletUnusualProps
> = ({ tab, searchParams }) => {
  const currentPage = parseInt(searchParams?.ub_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.ub_limit?.toString() || '10')
  const currentDuration = searchParams?.ub_duration?.toString() || '24h'
  const currentSortBy = searchParams?.ub_sort?.toString() || ''

  const [, setPage] = useQueryState(
    'ub_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const [, setSortBy] = useQueryState('ub_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  const [filter] = useAtom(gemFilterAtom)

  // unusual cex
  const findGemsUnusualCexQuery = useQuery(
    useFindGemsFreshWalletUnusualQuery({
      limit: currentPerPage,
      start: currentPage,
      chain: 'base',
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
    : findGemsUnusualCexQuery?.data?.unusual_token_buy || []
  const totalFindGemUnusualCex = findGemsUnusualCexQuery?.data?.total || 1

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  return (
    <TableFindGemsFreshWalletUnusual
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
