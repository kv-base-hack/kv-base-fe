import { chainAtom } from '@/atom/chain'
import { TableFindGemsFisrtTimeBuy } from '@/components/common/DataTable/table-fisrt-time-buy'
import { useFirstTimeBuyQuery } from '@/query/find-gems/getFirstTimeBuy'

import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { parseAsInteger, useQueryState } from 'nuqs'
import React from 'react'

interface FindGemsTabFirstTimeBuyProps {
  tab: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const FindGemsFirstTimeBuy: React.FC<FindGemsTabFirstTimeBuyProps> = ({
  tab,
  searchParams,
}) => {
  const currentPage = parseInt(searchParams?.start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.limit?.toString() || '10')
  const currentDuration = searchParams?.duration?.toString() || '24h'
  const currentSortBy = searchParams?.sort_by?.toString() || ''

  const [, setPage] = useQueryState(
    'start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const [, setSortBy] = useQueryState('sort_by', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  const CHAIN = useAtomValue(chainAtom)

  const firstTimeBuyQuery = useQuery(
    useFirstTimeBuyQuery({
      limit: currentPerPage,
      duration: currentDuration,
      start: currentPage,
      chain: CHAIN,
      sort_by: currentSortBy,
    }),
  )

  const dataFirstTimeBuy = firstTimeBuyQuery?.data?.first_time_buy || []

  const dataFindGemsWithdraw = firstTimeBuyQuery.isFetching
    ? [...Array(currentPerPage).keys()]
    : dataFirstTimeBuy

  const total = firstTimeBuyQuery?.data?.total || 0

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  return (
    <TableFindGemsFisrtTimeBuy
      tab={tab}
      page={currentPage}
      perPage={currentPerPage}
      setPage={setPage}
      data={dataFindGemsWithdraw}
      total={total}
      isFetching={firstTimeBuyQuery.isFetching}
      setSort={handleSortBy}
    />
  )
}
