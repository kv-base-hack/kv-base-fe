import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { useGetTopTokenBuy } from '@/query/onchain-signal/getTopTokenBuy'
import SmartMoneyTopBuyIcon from '@/components/shared/icons/dashboard/SmartMoneyTopBuyIcon'
import { TableTopTokenBuy } from '@/components/common/DataTable/TableTopTokenBuy'
import { useSuspenseQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { CHAIN } from '@/constant/chain'
import { Suspense } from 'react'
import { LinkFindGems } from '@/components/common/Link/link-find-gems'
import { SelectDurationLeaderboard } from '@/components/common/Select/SelectDuration/select-duration-leaderboard'
import { ButtonReset } from '@/components/common/Button/button-reset'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'


export const TopTokenBuy = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = parseInt(searchParams?.ttb_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.ttb_limit?.toString() || '5')
  const currentDuration = searchParams?.ttb_duration?.toString() || '1d'
  const currentSortBy = searchParams?.ttb_sort?.toString() || ''

  const [, setPage] = useQueryState(
    'ttb_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )
  const [, setDuration] = useQueryState('ttb_duration', {
    defaultValue: currentDuration,
    history: 'push',
    shallow: false,
  })
  const [, setSortBy] = useQueryState('ttb_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  //
  const topTokenBuyQuery = useSuspenseQuery(
    useGetTopTokenBuy({
      limit: currentPerPage,
      start: currentPage,
      duration: currentDuration,
      sort_by: currentSortBy,
      chain: CHAIN,
      action: 'buying',
    }),
  )
  const data = topTokenBuyQuery.isFetching
    ? [...Array(5).keys()]
    : topTokenBuyQuery?.data?.top_buy_by_smart_money || []
  const total = topTokenBuyQuery?.data?.total_buy || 1
  //
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
      title="Smart Traders Top Buy"
      info="Top purchases made by Smart Traders ranked by Volume Buy."
      icon={<SmartMoneyTopBuyIcon />}
      childHeader={
        <div className="flex items-center gap-2">
          <LinkFindGems
            url={'/find-gems?category=st-top-buy'}
            title="See detail"
          />
          <SelectDurationLeaderboard
            duration={currentDuration}
            setDuration={setDuration}
            setPage={setPage}
            type="option3"
          />
          {currentSortBy && <ButtonReset onClick={handleReset} />}
        </div>
      }
    >
      <div className="mt-4 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TableTopTokenBuy
            page={currentPage}
            perPage={currentPerPage}
            data={data}
            isFetching={topTokenBuyQuery.isFetching}
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
