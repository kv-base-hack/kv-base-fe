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
    'ta_start',
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
        emptyData={<EmptyData />}
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

function EmptyData() {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-04 gap-1">
      <p>There are no transactions for this wallet in the last 3 days. </p>
      <p>
        If you want to see more, please click &apos;Load more&apos; to view
        additional transactions.
      </p>
      <div className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
        <div className="flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-3xl bg-black px-3 text-sm leading-5 tracking-normal text-white">
          Load more
        </div>
      </div>
    </div>
  )
}
