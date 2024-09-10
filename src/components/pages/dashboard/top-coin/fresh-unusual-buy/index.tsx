import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import { useFreshUnusualBuyQuery } from '@/query/onchain-signal/getFreshWalletUnusualBuy'
import FreshUnusualIcon from '@/components/shared/icons/dashboard/FreshUnusualIcon'
import { useSuspenseQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { CHAIN } from '@/constant/chain'
import { Suspense } from 'react'
import { LinkFindGems } from '@/components/common/Link/link-find-gems'
import { ButtonReset } from '@/components/common/Button/button-reset'
import { TableFreshUnusualBuy } from '@/components/common/DataTable/TableFreshUnusualBuy'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'

export const FreshUnusualBuy = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = parseInt(searchParams?.fub_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.fub_limit?.toString() || '5')
  const currentDuration = searchParams?.fub_duration?.toString() || '24h'
  const currentSortBy = searchParams?.fub_sort?.toString() || ''

  const [, setPage] = useQueryState(
    'fub_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )
  const [, setDuration] = useQueryState('fub_duration', {
    defaultValue: currentDuration,
    history: 'push',
    shallow: false,
  })
  const [, setSortBy] = useQueryState('fub_sort', {
    defaultValue: currentSortBy,
    history: 'push',
    shallow: false,
  })

  //
  const freshUnusalBuyQuery = useSuspenseQuery(
    useFreshUnusualBuyQuery({
      limit: currentPerPage,
      start: currentPage,
      duration: currentDuration,
      sort_by: currentSortBy,
      chain: CHAIN,
    }),
  )

  const dataFreshUnusalBuy = freshUnusalBuyQuery.isFetching
    ? [...Array(5).keys()]
    : freshUnusalBuyQuery?.data?.unusual_token_buy || []
  const totalFreshUnusalBuy = freshUnusalBuyQuery?.data?.total || 1
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
      title="Unusual Buy"
      info="List of tokens with unusual buying actions identified by Boltrade's AI. Unusual Buys may indicate insider trading and should be monitored closely."
      icon={<FreshUnusualIcon />}
      childHeader={
        <div className="flex items-center gap-2">
          <LinkFindGems url={'/find-gems'} title="See detail" />

          <SelectDuration
            duration={currentDuration}
            setDuration={setDuration}
            setPage={setPage}
            type="option4"
          />
          {currentSortBy && <ButtonReset onClick={handleReset} />}
        </div>
      }
      className="relative"
    >
      <div className="mt-4 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TableFreshUnusualBuy
            page={currentPage}
            perPage={currentPerPage}
            data={dataFreshUnusalBuy}
            isFetching={freshUnusalBuyQuery.isFetching}
            duration={currentDuration}
            setSortBy={handleSortBy}
          />
        </Suspense>
      </div>
      <PaginationTable
        className="mt-4"
        currentPage={currentPage}
        pageSize={currentPerPage}
        total={totalFreshUnusalBuy}
        setPage={setPage}
      />
    </WrapTable>
  )
}
