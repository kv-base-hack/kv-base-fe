import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { PaginationTable } from '../Pagination/PaginationTable'
import { useFreshUnusualBuyQuery } from '@/query/onchain-signal/getFreshWalletUnusualBuy'
import { TableFreshUnusualBuy } from '../DataTable/TableFreshUnusualBuy'
import FreshUnusualIcon from '@/components/shared/icons/dashboard/FreshUnusualIcon'

export const FreshUnusualBuy = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [duration, setDuration] = useState('24h')
  const [sortBy, setSortBy] = useState('')
  const CHAIN = useAtomValue(chainAtom)

  //
  const freshUnusalBuyQuery = useFreshUnusualBuyQuery({
    limit: perPage,
    start: page,
    chain: CHAIN,
    duration,
    sort_by: sortBy,
  })
  const dataFreshUnusalBuy = freshUnusalBuyQuery.isFetching
    ? [...Array(5).keys()]
    : freshUnusalBuyQuery.data?.data.unusual_token_buy || []
  const totalFreshUnusalBuy = freshUnusalBuyQuery.data?.data.total || 1
  //

  return (
    <WrapTable
      title="Unusual Buy"
      info="A list of Tokens ranked by net withdrawals to Centralized exchanges. Net deposits are calculated as Withdrawals minus Deposits."
      icon={<FreshUnusualIcon />}
      childHeader={
        <SelectDuration duration={duration} setDuration={setDuration} />
      }
      className="relative"
    >
      <div className="mt-8 h-full">
        <TableFreshUnusualBuy
          page={page}
          perPage={perPage}
          data={dataFreshUnusalBuy}
          isFetching={freshUnusalBuyQuery.isFetching}
          duration={duration}
          setSortBy={setSortBy}
        />
      </div>
      <PaginationTable
        className="mt-8"
        currentPage={page}
        updatePage={(page: number) => setPage(page)}
        pageSize={perPage}
        total={totalFreshUnusalBuy}
        setPage={setPage}
      />
    </WrapTable>
  )
}
