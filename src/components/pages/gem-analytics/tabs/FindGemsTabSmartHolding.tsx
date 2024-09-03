import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsSmartMoneyHolding } from '@/components/common/DataTable/TableFindGemsSmartmoneyHolding'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { parseAsInteger, useQueryState } from 'nuqs'
import React from 'react'

interface FindGemsTabSmartHoldingProps {
  tab: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabSmartHolding: React.FC<
  FindGemsTabSmartHoldingProps
> = ({ tab, searchParams }) => {
  const currentPage = parseInt(searchParams?.smh_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.smh_limit?.toString() || '10')
  const currentDuration = searchParams?.duration?.toString() || '24h'
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

  // smart money holding
  const findGemsTrendingQuery = useQuery(
    useFindGemsSmartMoneyHoldingQuery({
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
  const dataFindGemsTrending = findGemsTrendingQuery.isFetching
    ? [...Array(currentPerPage).keys()]
    : findGemsTrendingQuery.data?.smart_money_holding || []
  const totalFindGemTrending = findGemsTrendingQuery.data?.total || 1

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  return (
    <TableFindGemsSmartMoneyHolding
      tab={tab}
      page={currentPage}
      perPage={currentPerPage}
      setPage={setPage}
      data={dataFindGemsTrending}
      total={totalFindGemTrending}
      isFetching={findGemsTrendingQuery.isFetching}
      setSort={handleSortBy}
    />
  )
}
