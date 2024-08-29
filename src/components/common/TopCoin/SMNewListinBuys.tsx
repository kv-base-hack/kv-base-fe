import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { PaginationTable } from '../Pagination/PaginationTable'
import { useSMNewListingBuyQuery } from '@/query/onchain-signal/getSMNewListingBuys'
import { TableSMNewListingBuy } from '../DataTable/TableSMNewListingBuy'
import NewListingBuyIcon from '@/components/shared/icons/dashboard/NewListingBuyIcon'

import { parseAsInteger, useQueryState } from 'nuqs'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CHAIN } from '@/constant/chain'
import { Suspense } from 'react'
import { SelectDuration } from '../Select/SelectDuration'
import { LinkFindGems } from '../Link/link-find-gems'

export const SMNewListingBuys = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = parseInt(searchParams?.nlb_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.nlb_limit?.toString() || '5')
  const currentDuration = searchParams?.nlb_duration?.toString() || '24h'
  const currentSortBy = searchParams?.nlb_sort?.toString() || ''

  const [, setPage] = useQueryState(
    'nlb_start',
    parseAsInteger
      .withDefault(currentPage)
      .withOptions({ history: 'push', shallow: false }),
  )
  const [, setDuration] = useQueryState('nlb_duration', {
    defaultValue: currentDuration,
    history: 'push',
    shallow: false,
  })
  const [, setSortBy] = useQueryState('nlb_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  const smNewListingBuyQuery = useSuspenseQuery(
    useSMNewListingBuyQuery({
      limit: currentPerPage,
      start: currentPage,
      duration: currentDuration,
      sort_by: currentSortBy,
      chain: CHAIN,
    }),
  )

  const dataSMNewListingBuy =
    smNewListingBuyQuery?.data?.smart_money_new_listing_buy || []

  const totalSMNewListingBuy = smNewListingBuyQuery?.data?.total || 1

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  return (
    <WrapTable
      title="Smart Traders New Listing Buy"
      info="List of tokens created less than 14 days ago, bought by Smartmoney, ranked by default according to PnL."
      icon={<NewListingBuyIcon />}
      childHeader={
        <div className="flex items-center gap-2">
          <LinkFindGems
            url="/find-gems?category=st-new-listing-buys"
            title="See detail"
          />
          <SelectDuration
            duration={currentDuration}
            setDuration={setDuration}
            setPage={setPage}
            type="option2"
          />
        </div>
      }
      className="z-[10]"
    >
      <div className="mt-4 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TableSMNewListingBuy
            page={currentPage}
            perPage={currentPerPage}
            data={dataSMNewListingBuy}
            isFetching={smNewListingBuyQuery.isFetching}
            duration={currentDuration}
            setSortBy={handleSortBy}
          />
        </Suspense>
      </div>
      <PaginationTable
        className="mt-4"
        currentPage={currentPage}
        pageSize={currentPerPage}
        total={totalSMNewListingBuy}
        setPage={setPage}
      />
    </WrapTable>
  )
}
