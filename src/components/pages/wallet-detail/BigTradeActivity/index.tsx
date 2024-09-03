'use client'

import { DataTable } from '@/components/common/DataTable'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { useTradeActivityQuery } from '@/query/wallet-explorer/getTradeActivity'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { columnsActivityWalletDetail } from './columns-activity-wallet-detail'

type BigTradeActivityProps = {
  address: string
  chain: string
  hideSmallTrade: boolean
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const BigTradeActivity: React.FC<BigTradeActivityProps> = ({
  address,
  chain,
  hideSmallTrade,
  searchParams,
}) => {
  const currentPage = parseInt(searchParams?.ta_start?.toString() || '1')

  const [, setPage] = useQueryState(
    'smft_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )
  // get data Big Trade Activity
  const activityQuery = useQuery(
    useTradeActivityQuery({
      action: 'all',
      limit: 10,
      start: currentPage,
      chain,
      address,
      amount_filter: '',
      is_big_trade_only: hideSmallTrade,
      token_address: '',
    }),
  )

  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery.data?.activities || []

  const totalActivity = activityQuery.data?.total || 1

  return (
    <div>
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-normal leading-4 tracking-normal text-gray-300"
        columns={columnsActivityWalletDetail}
        data={dataActivity?.slice(0, 10) || []}
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
        setPage={setPage}
      />
    </div>
  )
}
