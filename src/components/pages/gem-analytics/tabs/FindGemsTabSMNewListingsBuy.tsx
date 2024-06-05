import { chainAtom } from '@/atom/chain'
import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsSMNewListingsBuy } from '@/components/common/DataTable/TableFindGemsSMNewListingsBuy'
import { FilterValue } from '@/components/common/Dialog/DialogFilterSpecificToken'
import { useFindGemsSMNewListingsBuyQuery } from '@/query/find-gems/getFindGemsSMNewListingsBuy'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import React, { useState } from 'react'

interface FindGemsTabSMNewListingsBuyProps {
  tab: string
}

export const FindGemsTabSMNewListingsBuy: React.FC<
  FindGemsTabSMNewListingsBuyProps
> = ({ tab }) => {
  const CHAIN = useAtomValue(chainAtom)
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [sort, setSort] = useState('')
  const [duration] = useAtom(gemDurationAtom)
  const [filter] = useAtom(gemFilterAtom)

  // unusual cex
  const findGemsUnusualCexQuery = useQuery(
    useFindGemsSMNewListingsBuyQuery({
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
  const dataFindGemsUnusualCex = findGemsUnusualCexQuery.isFetching
    ? [...Array(perPage).keys()]
    : findGemsUnusualCexQuery.data?.smart_money_new_listing_buy || []
  const totalFindGemUnusualCex = findGemsUnusualCexQuery.data?.total || 1

  return (
    <TableFindGemsSMNewListingsBuy
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      data={dataFindGemsUnusualCex}
      total={totalFindGemUnusualCex}
      isFetching={findGemsUnusualCexQuery.isFetching}
      setSort={setSort}
    />
  )
}
