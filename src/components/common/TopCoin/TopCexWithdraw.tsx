import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import CexWithdrawIcon from '@/components/shared/icons/dashboard/CexWithdrawIcon'
import { useCexWithdrawQuery } from '@/query/onchain-signal/getCexWithdraw'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { TableCexWithdraw } from '../DataTable/TableCexWithdraw'
import { PaginationTable } from '../Pagination/PaginationTable'

export const TopCexWithdraw = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [duration, setDuration] = useState('24h')
  const CHAIN = useAtomValue(chainAtom)

  //
  const cexOutQuery = useCexWithdrawQuery({
    limit: perPage,
    start: page,
    chain: CHAIN,
    duration,
  })
  const dataCexOut = cexOutQuery.data?.data.top_cex_out || []
  const totalCexOut = cexOutQuery.data?.data.total || 1
  //

  return (
    <WrapTable
      title="Top CEX Withdraw"
      info="A list of Tokens ranked by net withdrawals to Centralized exchanges. Net deposits are calculated as Withdrawals minus Deposits."
      icon={<CexWithdrawIcon />}
      childHeader={
        <SelectDuration duration={duration} setDuration={setDuration} />
      }
    >
      <div className="mt-8 h-full">
        <TableCexWithdraw
          page={page}
          perPage={perPage}
          data={dataCexOut}
          isFetching={cexOutQuery.isFetching}
          setSortBy={() => {}}
        />
      </div>
      <PaginationTable
        className="mt-8"
        currentPage={page}
        pageSize={perPage}
        total={totalCexOut}
        setPage={setPage}
      />
    </WrapTable>
  )
}
