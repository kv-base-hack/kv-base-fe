import { WrapTable } from '@/components/common/DataTable/WrapTable'
import SmartMoneyTopSellIcon from '@/components/shared/icons/dashboard/SmartMoneyTopSellIcon'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CHAIN } from '@/constant/chain'
import { Suspense } from 'react'
import { useFirstTimeBuyQuery } from '@/query/find-gems/getFirstTimeBuy'
import { LinkFindGems } from '@/components/common/Link/link-find-gems'
import { ButtonReset } from '@/components/common/Button/button-reset'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { TableFirstTimeBuy } from './table-first-time-buy'

export const FirstTimeBuy = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = parseInt(searchParams?.ftb_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.ftb_limit?.toString() || '5')
  const currentDuration = searchParams?.ftb_duration?.toString() || '24h'
  const currentSortBy = searchParams?.ftb_sort?.toString() || 'volume'

  const [, setPage] = useQueryState(
    'ftb_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )
  const [, setDuration] = useQueryState('ftb_duration', {
    defaultValue: currentDuration,
    history: 'push',
    shallow: false,
  })
  const [, setSortBy] = useQueryState('ftb_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  //
  const firstTimeBuyQuery = useSuspenseQuery(
    useFirstTimeBuyQuery({
      start: currentPage,
      limit: currentPerPage,
      duration: currentDuration,
      sort_by: currentSortBy,
      chain: CHAIN,
    }),
  )

  const dataFirstTimeBuy = firstTimeBuyQuery?.data?.first_time_buy || []

  const data = firstTimeBuyQuery.isFetching
    ? [...Array(5).keys()]
    : dataFirstTimeBuy || []
  const total = firstTimeBuyQuery?.data?.total || 0

  const handleSortBy = (val: string) => {
    setSortBy(val)
    setPage(1)
  }

  const handleReset = () => {
    setSortBy(null)
    setPage(null)
    setDuration(null)
  }

  return (
    <WrapTable
      title="Smart Traders First Time Buy"
      info="Top sales made by Smart Traders ranked by Volume Sell."
      icon={<SmartMoneyTopSellIcon />}
      childHeader={
        <div className="flex items-center gap-2">
          <LinkFindGems
            url={'/find-gems?category=st-first-time-buy'}
            title="See detail"
          />
          <SelectDuration
            duration={currentDuration}
            setDuration={setDuration}
            setPage={setPage}
            type="option1"
          />
          {currentSortBy !== 'volume' && <ButtonReset onClick={handleReset} />}
        </div>
      }
    >
      <div className="mt-4 h-full">
        <Suspense fallback={<div>loading...</div>}>
          <TableFirstTimeBuy
            page={currentPage}
            perPage={currentPerPage}
            data={data}
            isFetching={firstTimeBuyQuery.isFetching}
            duration={currentDuration}
            setSortBy={handleSortBy}
          />
        </Suspense>
      </div>
      <PaginationTable
        className="mt-4"
        currentPage={currentPage}
        pageSize={currentPerPage}
        total={total}
        setPage={setPage}
      />
    </WrapTable>
  )
}
