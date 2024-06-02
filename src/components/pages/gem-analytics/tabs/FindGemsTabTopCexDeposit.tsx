import { gemDurationAtom } from '@/atom/gemDuration'
import { gemFilterAtom } from '@/atom/gemFilter'
import { TableFindGemsDeposit } from '@/components/common/DataTable/TableFindGemsDeposit'
import { useFindGemsDepositQuery } from '@/query/find-gems/getFindGemsDeposit'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import React, { useState } from 'react'

interface FindGemsTabTopCexDepositProps {
  tab: string
}

export const FindGemsTabTopCexDeposit: React.FC<
  FindGemsTabTopCexDepositProps
> = ({ tab }) => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [duration] = useAtom(gemDurationAtom)
  const [filter] = useAtom(gemFilterAtom)
  // deposit
  const findGemsDepositQuery = useQuery(
    useFindGemsDepositQuery({
      limit: perPage,
      start: page,
      chain: 'solana',
      duration,
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
    }),
  )
  const dataFindGemsDeposit = findGemsDepositQuery.isFetching
    ? [...Array(perPage).keys()]
    : findGemsDepositQuery.data?.top_cex_deposit || []
  const totalFindGemDeposit = findGemsDepositQuery.data?.total || 1

  return (
    <TableFindGemsDeposit
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      data={dataFindGemsDeposit}
      total={totalFindGemDeposit}
      isFetching={findGemsDepositQuery.isFetching}
      setSort={() => {}}
    />
  )
}
