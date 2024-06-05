import { chainAtom } from '@/atom/chain'
import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsFreshWalletUnusual } from '@/components/common/DataTable/TableFindGemsFreshWalletUnusual'
import { useFindGemsFreshWalletUnusualQuery } from '@/query/find-gems/getFindGemsFreshWalletUnusual'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import React, { useState } from 'react'

interface FindGemsTabFreshWalletUnusualProps {
  tab: string
}

export const FindGemsTabFreshWalletUnusual: React.FC<
  FindGemsTabFreshWalletUnusualProps
> = ({ tab }) => {
  const CHAIN = useAtomValue(chainAtom)
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [sort, setSort] = useState('')
  const [duration] = useAtom(gemDurationAtom)
  const [filter] = useAtom(gemFilterAtom)

  // unusual cex
  const findGemsUnusualCexQuery = useQuery(
    useFindGemsFreshWalletUnusualQuery({
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
    : findGemsUnusualCexQuery.data?.unusual_token_buy || []
  const totalFindGemUnusualCex = findGemsUnusualCexQuery.data?.total || 1

  return (
    <TableFindGemsFreshWalletUnusual
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
