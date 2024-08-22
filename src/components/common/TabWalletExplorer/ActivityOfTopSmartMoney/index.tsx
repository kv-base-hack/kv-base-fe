import { DataTable } from '@/components/common/DataTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useActivitySmartMoneyOfTokenQuery } from '@/query/token-explorer/getActivitySmartMoneyOfToken'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { columnsActivitySmartMoneyOfToken } from './columns-activity-smart-money-of-token'

export const ActivityOfTopSmartMoney = ({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = parseInt(searchParams?.smot_start?.toString() || '1')
  const currentPerPage = parseInt(searchParams?.smot_limit?.toString() || '10')
  const CHAIN = useAtomValue(chainAtom)

  const currentFilterActivity = searchParams?.smot_action?.toString() || 'all'
  const currentTradeValue = searchParams?.smot_amount_filter?.toString() || ''

  const [, setPageActivity] = useQueryState(
    'smot_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  const activityQuery = useQuery(
    useActivitySmartMoneyOfTokenQuery({
      limit: currentPerPage,
      start: currentPage,
      chain: CHAIN,
      address: params?.token,
      action: currentFilterActivity,
      amount_filter: currentTradeValue,
    }),
  )
  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery?.data?.activities || []
  const totalActivity = activityQuery?.data?.total || 1
  //
  return (
    <div className="w-full">
      <DataTable
        className="w-full bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columnsActivitySmartMoneyOfToken}
        data={dataActivity || []}
        isFetching={activityQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-4"
        currentPage={currentPage}
        pageSize={10}
        total={totalActivity}
        setPage={setPageActivity}
      />
    </div>
  )
}
