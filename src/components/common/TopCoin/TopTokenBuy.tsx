import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useGetTopTokenBuy } from '@/query/onchain-signal/getTopTokenBuy'
import SmartMoneyTopBuyIcon from '@/components/shared/icons/dashboard/SmartMoneyTopBuyIcon'
import { TableTopTokenBuy } from '@/components/common/DataTable/TableTopTokenBuy'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { PaginationTable } from '../Pagination/PaginationTable'
import { useQuery } from '@tanstack/react-query'

export const TopTokenBuy = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [duration, setDuration] = useState('24h')
  const CHAIN = useAtomValue(chainAtom)
  const [sortBy, setSortBy] = useState('')

  //
  const topTokenBuyQuery = useQuery(
    useGetTopTokenBuy({
      limit: perPage,
      start: page,
      chain: CHAIN,
      duration,
      action: 'buying',
      sort_by: sortBy,
    }),
  )
  const data = topTokenBuyQuery.isFetching
    ? [...Array(5).keys()]
    : topTokenBuyQuery.data?.top_buy_by_smart_money || []
  const total = topTokenBuyQuery.data?.total_buy || 1
  //

  return (
    <WrapTable
      title="Smart Money Top Buys"
      info=""
      icon={<SmartMoneyTopBuyIcon />}
      childHeader={
        <SelectDuration duration={duration} setDuration={setDuration} />
      }
    >
      <div className="mt-8 h-full">
        <TableTopTokenBuy
          page={page}
          perPage={perPage}
          data={data}
          isFetching={topTokenBuyQuery.isFetching}
          duration={duration}
          setSortBy={setSortBy}
        />
      </div>
      <PaginationTable
        className="mt-8"
        currentPage={page}
        updatePage={(page: number) => setPage(page)}
        pageSize={perPage}
        total={total}
        setPage={setPage}
      />
    </WrapTable>
  )
}
