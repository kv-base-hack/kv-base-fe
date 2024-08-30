import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsSM } from '@/components/common/DataTable/TableFindGemsSM'
import { useGetTopTokenBuy } from '@/query/onchain-signal/getTopTokenBuy'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { parseAsInteger, useQueryState } from 'nuqs'
import React from 'react'

interface FindGemsTabTopBuysProps {
  tab: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsTabTopBuys: React.FC<FindGemsTabTopBuysProps> = ({
  tab,
  searchParams,
}) => {
  const currentPage = parseInt(searchParams?.ttb_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.ttb_limit?.toString() || '10')
  const currentDuration = searchParams?.ttb_duration?.toString() || '1d'
  const currentSortBy = searchParams?.ttb_sort?.toString() || ''

  const [, setPage] = useQueryState(
    'ttb_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const [, setSortBy] = useQueryState('ttb_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  const [filter] = useAtom(gemFilterAtom)

  // top buy
  const topTokenBuyQuery = useQuery(
    useGetTopTokenBuy({
      limit: currentPerPage,
      start: currentPage,
      chain: 'base',
      duration: currentDuration,
      action: 'buying',
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
    }),
  )
  const dataFindGemsBuy = topTokenBuyQuery.isFetching
    ? [...Array(currentPerPage).keys()]
    : topTokenBuyQuery?.data?.top_buy_by_smart_money || []
  const totalFindGemsBuy = topTokenBuyQuery?.data?.total_buy || 1

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  return (
    <TableFindGemsSM
      tab={tab}
      page={currentPage}
      perPage={currentPerPage}
      setPage={setPage}
      data={dataFindGemsBuy}
      total={totalFindGemsBuy}
      isFetching={topTokenBuyQuery.isFetching}
      setSort={handleSortBy}
      duration={currentDuration}
    />
  )
}
