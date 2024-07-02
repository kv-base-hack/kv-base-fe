import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import EmptyTableIcon from '@/components/shared/icons/EmptyTableIcon'
import { useParams } from 'next/navigation'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DialogUsers } from '../../Dialog/DialogListUsers'
import { formatPriceNumber } from '@/lib/utils/formatPriceNumber'
import { DexTradingSignalInfo } from '@/types/trading-signal/dexTradingSignal'
import { useQuery } from '@tanstack/react-query'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'

export const TradingSignal = () => {
  const [pageActivity, setPageActivity] = useState(1)
  const params = useParams<{ token: string }>()
  const CHAIN = useAtomValue(chainAtom)
  //

  const activityQuery = useQuery(
    useGetDexTradingSignalQuery({
      limit: 10,
      start: pageActivity,
      addresses: params?.token,
      chain: CHAIN,
    }),
  )

  const dataTradingSignal = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery?.data?.data?.data || []

  const total = activityQuery?.data?.data?.metadata?.total || 0

  const columns: ColumnDef<DexTradingSignalInfo>[] = useMemo(() => {
    return [
      {
        accessorKey: 'time',
        header: () => 'Time',
        cell: ({ row }) => {
          const { signal_time } = row.original
          return (
            <div className="text-neutral-04">
              {moment(signal_time).fromNow()}
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'type',
        header: () => 'Singal Sources',
        cell: ({ row }) => {
          const { dex_trade_signal_type } = row.original
          const convertedText = dex_trade_signal_type
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

          return <div className="whitespace-nowrap">{convertedText}</div>
        },
        enableSorting: false,
        align: 'center',
      },
      {
        accessorKey: 'users',
        header: () => '# of Wallet',
        enableSorting: false,
        cell: ({ row }) => {
          const { users } = row.original
          return <DialogUsers users={users} className="text-sm" />
        },
        align: 'center',
      },
      {
        accessorKey: 'avg_entry_price',
        header: () => 'Avg Entry',
        enableSorting: false,
        cell: ({ row }) => {
          const avgPrice = row.original.data.summary.avg_entry_price
          return <>{renderPrice(avgPrice)}</>
        },
        align: 'center',
      },
      {
        accessorKey: 'entry',
        header: () => 'Entry',
        cell: ({ row }) => {
          return <>{renderPrice(row.original.entry)}</>
        },
        enableSorting: false,
        align: 'center',
      },
      {
        accessorKey: 'target',
        header: () => 'Target',
        enableSorting: false,
        cell: ({ row }) => {
          const { target_min, target_max } = row.original
          return (
            <div className="flex items-center">
              {renderPrice(target_min)}-{renderPrice(target_max)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'net_flow',
        header: () => 'Net Flow',
        enableSorting: false,
        cell: ({ row }) => {
          const net_flow = row.original.data.summary.net_flow
          return (
            <div
              className={
                net_flow > 0
                  ? 'text-semantic-success-1'
                  : net_flow < 0
                  ? 'text-semantic-error-1'
                  : ''
              }
            >
              {formatPriceNumber(net_flow)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'realized',
        header: () => 'Realized %',
        enableSorting: false,
        cell: ({ row }) => {
          const realized = row.original.data.summary.realized_percent
          return (
            <div
              className={
                realized > 0
                  ? 'text-semantic-success-1'
                  : realized < 0
                  ? 'text-semantic-error-1'
                  : ''
              }
            >
              {realized ? realized?.toFixed(2) : '-'}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'ai-score',
        header: () => 'AI Score',
        enableSorting: false,
        cell: ({ row }) => {
          const { ai_score } = row.original
          return <>{ai_score}/100</>
        },
        align: 'end',
      },
    ]
  }, [])

  //
  return dataTradingSignal?.length > 0 ? (
    <WrapTable title="">
      <DataTable
        className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
        columns={columns}
        data={dataTradingSignal}
        isFetching={activityQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-8"
        currentPage={pageActivity}
        pageSize={10}
        total={total}
        setPage={setPageActivity}
      />
    </WrapTable>
  ) : (
    <div className="flex flex-col justify-center items-center py-10">
      <EmptyTableIcon />
      <div className="w-2/3 text-[#D6D9DC] text-center text-sm not-italic font-medium leading-5 tracking-[-0.14px]">
        Currently, there are no trading signals available for this token. Please
        check back later or explore other opportunities on our platform. Thank
        you for your understanding and patience.
      </div>
    </div>
  )
}
