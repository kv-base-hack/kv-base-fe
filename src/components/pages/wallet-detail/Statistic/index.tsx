import { DataTable } from '@/components/common/DataTable'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { DialogSelectToken } from '@/components/common/Dialog/DialogSelectToken'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { PaginationCustom } from '@/components/common/Pagination'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { SelectDuration } from '@/components/common/Select/SelectDuration'
import Close from '@/components/shared/icons/Close'
import TradeStatisticIcon from '@/components/shared/icons/wallet-explorer/TradeStatisticIcon'
import { useTradeStatisticTokensQuery } from '@/query/wallet-explorer/getTradeStatisticTokens'
import { TokenList } from '@/types/tokenList'
import { TokenStat } from '@/types/tradeStatisticTokens'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import numeral from 'numeral'
import { useMemo, useState } from 'react'

type StatisticProps = {
  address: string
  chain: string
}

export const Statistic: React.FC<StatisticProps> = ({ address, chain }) => {
  const [filterDate, setFilterDate] = useState('24h')
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [sort, setSort] = useState('')
  // pagination portfolio in FE
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  const tradeStatisticTokensQuery = useQuery(
    useTradeStatisticTokensQuery({
      address,
      chain,
      duration: filterDate,
      token_address:
        listToken?.map((item) => item.tokenAddress)?.toString() || '',
      sort_by: sort,
      page: currentPage,
      perPage: itemsPerPage,
    }),
  )
  const tradeStatisticTokens = tradeStatisticTokensQuery?.data

  const totalPages = tradeStatisticTokens?.token_stats?.length || 0

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
  }

  const getVisibleItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return tradeStatisticTokens?.token_stats?.slice(startIndex, endIndex)
  }

  const dataSource = tradeStatisticTokensQuery?.isFetching
    ? [...(Array(8).keys() as any)]
    : getVisibleItems() || []

  const columns: ColumnDef<TokenStat>[] = useMemo(() => {
    return [
      {
        accessorKey: 'symbol',
        header: () => 'Tokens',
        cell: ({ row }) => {
          const { tokenAddress, imageUrl, symbol } = row.original
          return tokenAddress ? (
            <Link
              href={`/smartmoney-onchain/token-explorer/${tokenAddress}`}
              className="flex gap-1 items-center justify-between text-right"
            >
              <ImageToken imgUrl={imageUrl} symbol={symbol} />
              <div className="">{symbol}</div>
            </Link>
          ) : (
            <div className="flex gap-1 cursor-not-allowed items-center justify-between text-right">
              <ImageToken imgUrl={imageUrl} symbol={symbol} />
              <div>{symbol}</div>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'avg_roi',
        enableSorting: false,
        header: () => {
          return (
            <div role="button" onClick={() => setSort('avg_roi')}>
              Avg ROI
            </div>
          )
        },
        cell: ({ row }) => {
          const { avg_roi } = row.original
          return avg_roi === 0 ? (
            '-'
          ) : (
            <div
              className={avg_roi < 0 ? 'text-error-500' : 'text-success-500'}
            >
              {(avg_roi < 0.001 && avg_roi > 0) ||
              (avg_roi > -0.001 && avg_roi < 0)
                ? numeral(avg_roi).format('0,0.[000000]')
                : avg_roi.toFixed(2)}
              %
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'pnl',
        enableSorting: false,
        header: () => {
          return (
            <div role="button" onClick={() => setSort('pnl')}>
              PnL
            </div>
          )
        },
        cell: ({ row }) => {
          const { pnl } = row.original
          return pnl === 0 ? (
            '-'
          ) : (
            <div className={pnl < 0 ? 'text-error-500' : 'text-success-500'}>
              {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                ? numeral(pnl).format('0,0.[000000]')
                : nFormatter(pnl)}
              $
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'realized_gains',
        enableSorting: false,
        header: () => {
          return (
            <div role="button" onClick={() => setSort('realized_percent')}>
              Realized %
            </div>
          )
        },
        cell: ({ row }) => {
          const { realized_percent } = row.original
          return realized_percent === 0 ? (
            '-'
          ) : (
            <div>
              {(realized_percent < 0.001 && realized_percent > 0) ||
              (realized_percent > -0.001 && realized_percent < 0)
                ? numeral(realized_percent).format('0,0.[000000]')
                : numeral(realized_percent).format('0,0.[00]')}
              %
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'total_spent',
        header: () => {
          return (
            <div
              className="text-neutral-04 whitespace-nowrap"
              role="button"
              onClick={() => setSort('total_spent')}
            >
              Total Spent
            </div>
          )
        },
        cell: ({ row }) => {
          const { volume } = row.original
          return <div>{nFormatter(volume)}</div>
        },
        align: 'end',
      },
    ]
  }, [])

  return (
    <WrapTable
      className="justify-start"
      icon={<TradeStatisticIcon />}
      title={<div className="whitespace-nowrap">Trades Statistics</div>}
    >
      <div className="mt-4 h-full flex flex-col justify-between">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columns}
          data={dataSource}
          noneBorder
          noneBgHeader
          emptyData="No results."
          isFetching={tradeStatisticTokensQuery?.isFetching}
        />
        <PaginationCustom
          className="mt-4"
          currentPage={currentPage}
          updatePage={(page: number) => handlePageChange(page)}
          pageSize={itemsPerPage}
          total={totalPages}
          setPage={setCurrentPage}
        />
      </div>
    </WrapTable>
  )
}
