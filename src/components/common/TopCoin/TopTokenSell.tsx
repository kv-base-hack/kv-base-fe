import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useGetTopTokenSell } from '@/query/onchain-signal/getTopTokenSell'
import SmartMoneyTopSellIcon from '@/components/shared/icons/dashboard/SmartMoneyTopSellIcon'
import { TableTopTokenSell } from '@/components/common/DataTable/TableTopTokenSell'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { PaginationTable } from '../Pagination/PaginationTable'
import { useQuery } from '@tanstack/react-query'

export const TopTokenSell = () => {
  const [page, setPage] = useState(1)
  const [duration, setDuration] = useState('24h')
  const [perPage] = useState(5)
  const CHAIN = useAtomValue(chainAtom)
  const [sortBy, setSortBy] = useState('')

  //
  const topTokenSellQuery = useQuery(
    useGetTopTokenSell({
      limit: perPage,
      start: page,
      chain: CHAIN,
      duration,
      action: 'selling',
      sort_by: sortBy,
    }),
  )
  const data = topTokenSellQuery.isFetching
    ? [...Array(5).keys()]
    : topTokenSellQuery.data?.top_sell_by_smart_money || []
  const total = topTokenSellQuery.data?.total_sell || 1
  //

  return (
    <WrapTable
      title="Smart Money Top Sells"
      info=""
      icon={<SmartMoneyTopSellIcon />}
      childHeader={
        <SelectDuration duration={duration} setDuration={setDuration} />
      }
    >
      <div className="mt-8 h-full">
        <TableTopTokenSell
          page={page}
          perPage={perPage}
          data={data}
          isFetching={topTokenSellQuery.isFetching}
          duration={duration}
          setSortBy={setSortBy}
        />
      </div>
      <PaginationTable
        className="mt-8"
        currentPage={page}
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </WrapTable>
  )
}
