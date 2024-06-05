import { chainAtom } from '@/atom/chain'
import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsSmartMoneyHolding } from '@/components/common/DataTable/TableFindGemsSmartmoneyHolding'
import { useFindGemsSmartMoneyHoldingQuery } from '@/query/find-gems/getFindGemsSmartMoneyHolding'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import React, { useState } from 'react'

interface FindGemsTabSmartHoldingProps {
  tab: string
}

export const FindGemsTabSmartHolding: React.FC<
  FindGemsTabSmartHoldingProps
> = ({ tab }) => {
  const CHAIN = useAtomValue(chainAtom)

  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [sort, setSort] = useState('')
  const [duration] = useAtom(gemDurationAtom)
  const [filter] = useAtom(gemFilterAtom)

  // smart money holding
  const findGemsTrendingQuery = useQuery(
    useFindGemsSmartMoneyHoldingQuery({
      limit: perPage,
      start: page,
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
      sort_by: sort,
      duration,
    }),
  )
  const dataFindGemsTrending = findGemsTrendingQuery.isFetching
    ? [...Array(perPage).keys()]
    : findGemsTrendingQuery.data?.smart_money_holding || []
  const totalFindGemTrending = findGemsTrendingQuery.data?.total || 1

  return (
    <TableFindGemsSmartMoneyHolding
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      data={dataFindGemsTrending}
      total={totalFindGemTrending}
      isFetching={findGemsTrendingQuery.isFetching}
      setSort={setSort}
    />
  )
}
