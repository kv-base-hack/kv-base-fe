import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { PaginationTable } from '../Pagination/PaginationTable'
import { useSMNewListingBuyQuery } from '@/query/onchain-signal/getSMNewListingBuys'
import { TableSMNewListingBuy } from '../DataTable/TableSMNewListingBuy'
import NewListingBuyIcon from '@/components/shared/icons/dashboard/NewListingBuyIcon'

export const SMNewListingBuys = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [duration, setDuration] = useState('24h')
  const [sortBy, setSortBy] = useState('')
  const CHAIN = useAtomValue(chainAtom)

  //
  const smNewListingBuyQuery = useSMNewListingBuyQuery({
    limit: perPage,
    start: page,
    chain: CHAIN,
    duration,
    sort_by: sortBy,
  })
  const dataSMNewListingBuy = smNewListingBuyQuery.isFetching
    ? [...Array(5).keys()]
    : smNewListingBuyQuery.data?.data.smart_money_new_listing_buy || []
  const totalSMNewListingBuy = smNewListingBuyQuery.data?.data.total || 1
  //

  return (
    <WrapTable
      title="Smart Traders New Listing Buys"
      info="A list of Tokens ranked by net withdrawals to Centralized exchanges. Net deposits are calculated as Withdrawals minus Deposits."
      icon={<NewListingBuyIcon />}
      childHeader={
        <SelectDuration duration={duration} setDuration={setDuration} />
      }
    >
      <div className="mt-8 h-full">
        <TableSMNewListingBuy
          page={page}
          perPage={perPage}
          data={dataSMNewListingBuy}
          isFetching={smNewListingBuyQuery.isFetching}
          duration={duration}
          setSortBy={setSortBy}
        />
      </div>
      <PaginationTable
        className="mt-8"
        currentPage={page}
        pageSize={perPage}
        total={totalSMNewListingBuy}
        setPage={setPage}
      />
    </WrapTable>
  )
}
