import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsSM } from '@/components/common/DataTable/TableFindGemsSM'
import { useGetTopTokenSell } from '@/query/onchain-signal/getTopTokenSell'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import React, { useState } from 'react'

interface FindGemsTabTopSellsProps {
  tab: string
}

export const FindGemsTabTopSells: React.FC<FindGemsTabTopSellsProps> = ({
  tab,
}) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [sort, setSort] = useState('')
  
  const [duration] = useAtom(gemDurationAtom)
  const [filter] = useAtom(gemFilterAtom)

  // top sell
  const topTokenSellQuery = useQuery(
    useGetTopTokenSell({
      limit: perPage,
      start: page,
      chain: 'solana',
      duration,
      action: 'selling',
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
      sort_by: sort,
    }),
  )
  const dataFindGemsSell = topTokenSellQuery.isFetching
    ? [...Array(perPage).keys()]
    : topTokenSellQuery.data?.top_sell_by_smart_money || []
  const totalFindGemsSell = topTokenSellQuery.data?.total_sell || 1

  return (
    <TableFindGemsSM
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      data={dataFindGemsSell}
      total={totalFindGemsSell}
      isFetching={topTokenSellQuery.isFetching}
      setSort={setSort}
    />
  )
}
