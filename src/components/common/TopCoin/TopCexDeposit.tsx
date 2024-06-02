import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { TableCexDeposit } from '@/components/common/DataTable/TableCexDeposit'
import CexDepositIcon from '@/components/shared/icons/dashboard/CexDepositIcon'
import { useCexDepositQuery } from '@/query/onchain-signal/getCexDeposit'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { PaginationTable } from '../Pagination/PaginationTable'

export const TopCexDeposit = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [duration, setDuration] = useState('24h')
  const CHAIN = useAtomValue(chainAtom)

  const cexInQuery = useCexDepositQuery({
    limit: perPage,
    start: page,
    chain: CHAIN,
    duration,
  })
  const dataCexIn = cexInQuery.data?.data.top_cex_in || []
  const totalCexIn = cexInQuery.data?.data.total || 1
  //

  return (
    <WrapTable
      title="Top CEX Deposit"
      info="A list of Tokens ranked by net deposits to Centralized exchanges. Net deposits are calculated as Deposits minus Withdrawals."
      icon={<CexDepositIcon />}
      childHeader={
        <SelectDuration duration={duration} setDuration={setDuration} />
      }
    >
      <div className="mt-8 h-full">
        <TableCexDeposit
          data={dataCexIn}
          isFetching={cexInQuery.isFetching}
          page={page}
          perPage={perPage}
          setSortBy={() => {}}
        />
      </div>
      <PaginationTable
        className="mt-8"
        currentPage={page}
        updatePage={(page: number) => setPage(page)}
        pageSize={perPage}
        total={totalCexIn}
        setPage={setPage}
      />
    </WrapTable>
  )
}
