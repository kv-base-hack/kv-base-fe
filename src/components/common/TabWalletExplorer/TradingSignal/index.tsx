import { DataTable } from '@/components/common/DataTable'
import { useMemo } from 'react'
import EmptyTableIcon from '@/components/shared/icons/EmptyTableIcon'
import { PaginationTable } from '../../Pagination/PaginationTable'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { renderPrice } from '@/lib/utils/renderPrice'
import { DexTradingSignalInfo } from '@/types/trading-signal/dexTradingSignal'
import { useGetDexTradingSignalQuery } from '@/query/trading-signal/getDexTradingSignal'
import { ExternalLink } from 'lucide-react'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { CHAIN } from '@/constant/chain'

export const TradingSignal = ({
  params,
  searchParams,
}: {
  params: { token: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const currentPage = parseInt(searchParams?.dts_start?.toString() || '1')
  const currentDurationTrade = searchParams?.tit_duration?.toString() || '24h'
  const [, setDurationTrade] = useQueryState('tit_duration', {
    defaultValue: currentDurationTrade,
    history: 'push',
    shallow: false,
  })
  const [, setPage] = useQueryState(
    'dts_start',
    parseAsInteger.withDefault(currentPage).withOptions({
      history: 'push',
      shallow: false,
    }),
  )

  //
  const activityQuery = useQuery(
    useGetDexTradingSignalQuery({
      limit: 10,
      start: currentPage,
      token_addresses: params?.token,
      chain: CHAIN,
    }),
  )

  const dataTradingSignal = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery?.data?.data || []

  const total = activityQuery?.data?.metadata?.total || 0

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
        header: () => (
          <div className="flex items-center gap-2">
            <div>Signal Sources</div>
            <SortMultipleIcon className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const { dex_trade_signal_type } = row.original
          const convertedText = dex_trade_signal_type
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

          return (
            <div className="whitespace-nowrap text-neutral-300">
              {convertedText}
            </div>
          )
        },
        enableSorting: false,
        align: 'start',
      },
      {
        accessorKey: 'entry',
        header: () => 'Entry',
        cell: ({ row }) => {
          return (
            <div className="rounded-md bg-[#9AF9FF1A]/10 px-2 py-0.5 text-[#D3B0FF]">
              {renderPrice(row.original.entry)}
            </div>
          )
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
            <div className="flex items-center gap-1 whitespace-nowrap rounded-md bg-[#9AF9FF1A]/10 px-2 py-0.5 text-core">
              {renderPrice(target_min)}-{renderPrice(target_max)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'view_signal',
        header: () => 'View Signal',
        size: 50,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <a
              className="flex w-full items-center justify-center"
              href="/trading-signal"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4 text-neutral-03" />
            </a>
          )
        },
      },
    ]
  }, [])

  //
  return dataTradingSignal?.length > 0 ? (
    <div>
      <DataTable
        className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
        columns={columns}
        data={dataTradingSignal}
        isFetching={activityQuery.isFetching}
        noneBorder
        noneBgHeader
        emptyData="No results."
      />
      <PaginationTable
        className="mt-4"
        currentPage={currentPage}
        pageSize={10}
        total={total}
        setPage={setPage}
      />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-10">
      <EmptyTableIcon />
      <div className="w-2/3 text-center text-sm font-medium not-italic leading-5 tracking-[-0.14px] text-[#D6D9DC]">
        Currently, there are no trading signals available for this token. Please
        check back later or explore other opportunities on our platform. Thank
        you for your understanding and patience.
      </div>
    </div>
  )
}
