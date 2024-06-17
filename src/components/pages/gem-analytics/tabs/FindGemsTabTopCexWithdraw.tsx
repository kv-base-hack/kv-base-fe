import { chainAtom } from '@/atom/chain'
import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsWithdraw } from '@/components/common/DataTable/TableFindGemsWithdraw'
import { useFindGemsWithdrawQuery } from '@/query/find-gems/getFindGemsWithdraw'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import React, { useState } from 'react'

interface FindGemsTabTopCexWithdrawProps {
  tab: string
}

export const FindGemsTabTopCexWithdraw: React.FC<
  FindGemsTabTopCexWithdrawProps
> = ({ tab }) => {
  const CHAIN = useAtomValue(chainAtom)

  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [sort, setSort] = useState('')
  const [duration] = useAtom(gemDurationAtom)
  const [filter] = useAtom(gemFilterAtom)

  const findGemsWithdrawQuery = useQuery(
    useFindGemsWithdrawQuery({
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
  const dataFindGemsWithdraw = findGemsWithdrawQuery.isFetching
    ? [...Array(perPage).keys()]
    : findGemsWithdrawQuery.data?.top_cex_withdraw || []
  const totalFindGemWithdraw = findGemsWithdrawQuery.data?.total || 1

  return (
    <TableFindGemsWithdraw
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      data={dataFindGemsWithdraw}
      total={totalFindGemWithdraw}
      isFetching={findGemsWithdrawQuery.isFetching}
      setSort={setSort}
      chain={CHAIN}
    />
  )
}
