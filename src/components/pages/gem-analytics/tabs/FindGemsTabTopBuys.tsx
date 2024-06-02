import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsSM } from '@/components/common/DataTable/TableFindGemsSM'
import { useGetTopTokenBuy } from '@/query/onchain-signal/getTopTokenBuy'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import React, { useState } from 'react'

interface FindGemsTabTopBuysProps {
  tab: string
}

export const FindGemsTabTopBuys: React.FC<FindGemsTabTopBuysProps> = ({
  tab
}) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [sort, setSort] = useState('')
  const [duration] = useAtom(gemDurationAtom)
  const [filter] = useAtom(gemFilterAtom)

  // top buy
  const topTokenBuyQuery = useQuery(
    useGetTopTokenBuy({
      limit: perPage,
      start: page,
      chain: 'solana',
      duration,
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
      sort_by: sort,
    }),
  )
  const dataFindGemsBuy = topTokenBuyQuery.isFetching
    ? [...Array(perPage).keys()]
    : topTokenBuyQuery.data?.top_buy_by_smart_money || []
  const totalFindGemsBuy = topTokenBuyQuery.data?.total_buy || 1

  return (
    <TableFindGemsSM
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      data={dataFindGemsBuy}
      total={totalFindGemsBuy}
      isFetching={topTokenBuyQuery.isFetching}
      setSort={setSort}
    />
  )
}
