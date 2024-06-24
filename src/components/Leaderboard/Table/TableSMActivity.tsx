import { chainAtom } from '@/atom/chain'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { SelectMovement } from '@/components/common/Select/SelectMovements'
import { SelectTradeValue } from '@/components/common/Select/SelectTradeValue'
import { DialogSelectToken } from '@/components/common/SelectTokens/DialogSelectTokens'
import { TagMovement } from '@/components/common/Tags/Movement'
import { TooltipTokenInfo } from '@/components/common/Tooltip/TooltipTokenInfo'
import Close from '@/components/shared/icons/Close'
import { IconPresent } from '@/components/shared/icons/IconPresent'
import Info from '@/components/shared/icons/Info'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { cn } from '@/lib/utils'
import { useTopActivityQuery } from '@/query/leaderboard/getTopActivity'
import { TokenList } from '@/types/tokenList'
import { TopActivity } from '@/types/topActivity'
import { nFormatter } from '@/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import { ExternalLink } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

export const TableSMActivity = () => {
  const CHAIN = useAtomValue(chainAtom)
  const [pageActivity, setPageActivity] = useState(1)
  const [listToken, setListToken] = useState<TokenList[]>([])
  const [filterActivity, setFilterActivity] = useState('all')
  const [tradeValue, setTradeValue] = useState<unknown>([])
  const [sortBy, setSortBy] = useState('')

  const activityQuery = useQuery(
    useTopActivityQuery({
      action: filterActivity,
      limit: 10,
      start: pageActivity,
      chain: CHAIN,
      amount_filter: tradeValue?.toString() || '',
      token_addresses:
        listToken?.map((item) => item.tokenAddress)?.toString() || '',
      sort_by: sortBy,
    }),
  )

  const totalActivity = activityQuery.data?.data.total || 1

  const handleRemoveToken = (item: TokenList) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const newListToken = listToken.filter(
      (token) => token.tokenAddress !== item.tokenAddress,
    )
    setListToken([...newListToken])
  }
  //

  const columns: ColumnDef<TopActivity>[] = [
    {
      accessorKey: 'time',
      header: () => 'Time',
      enableSorting: false,
      cell: ({ row }) => {
        const { time } = row.original
        return (
          <div className="text-neutral-04">
            {moment(time).format('MMM DD, HH:mm')}
          </div>
        )
      },
    },
    {
      accessorKey: 'smart_money',
      header: () => (
        <div className="flex gap-2 items-center">
          <div>Smart Money</div>
          <SortMultipleIcon className="w-4 h-4" />
        </div>
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const { sender } = row.original
        return (
          <Link
            className="underline max-w-32 truncate"
            href={`/smartmoney-onchain/wallet-explorer/${sender}?chain=${CHAIN}`}
          >
            {sender}
          </Link>
        )
      },
    },
    {
      accessorKey: 'symbol',
      header: () => 'Tokens',
      enableSorting: false,
      cell: ({ row }) => {
        return <TooltipTokenInfo token={row.original} chain={CHAIN} />
      },
    },
    {
      accessorKey: 'movements',
      header: () => 'Movements',
      enableSorting: false,
      cell: ({ row }) => {
        const { movement } = row.original
        return <TagMovement movement={movement} />
      },
    },
    {
      accessorKey: 'value',
      header: () => 'Value',
      enableSorting: false,
      size: 220,
      cell: ({ row }) => {
        const { value_in_usdt, symbol, value_in_token } = row.original
        return value_in_token ? (
          <div className="flex items-center gap-2">
            <div>{renderTradingValue(value_in_usdt)}</div>
            <div className="font-medium">
              <span className="text-success-500">
                (${nFormatter(value_in_usdt)}){' '}
              </span>
              {nFormatter(value_in_token)} {symbol}
            </div>
          </div>
        ) : (
          '-'
        )
      },
    },
    {
      accessorKey: 'avg_price',
      header: () => 'Avg Price',
      enableSorting: false,
      cell: ({ row }) => {
        const { avg_price } = row.original
        return (
          <div className={cn('flex items-center justify-center')}>
            {renderPrice(avg_price)}
          </div>
        )
      },
    },
    {
      accessorKey: 'current_price',
      header: () => 'Current Price',
      enableSorting: false,
      cell: ({ row }) => {
        const { price } = row.original
        return (
          <div className={cn('flex items-center justify-center')}>
            {renderPrice(price)}
          </div>
        )
      },
    },
    {
      accessorKey: '24h',
      header: () => (
        <div
          className="text-sm not-italic leading-5"
          onClick={() => setSortBy('price_change')}
          role="button"
        >
          24h %
        </div>
      ),
      cell: ({ row }) => {
        const { price_change_24h } = row.original
        return price_change_24h ? (
          <div
            className={cn(
              'flex items-center justify-start leading-[140%]',
              price_change_24h > 0
                ? 'text-semantic-success-1'
                : 'text-semantic-error-1',
              price_change_24h === 0 && 'text-neutral-07',
            )}
          >
            {price_change_24h !== 0 && price_change_24h > 0 ? (
              <PercentUpIcon />
            ) : (
              <PercentDownIcon />
            )}
            {price_change_24h > 0 ? '+' : ''}
            {price_change_24h.toFixed(2)}%
          </div>
        ) : (
          <div className="text-left w-full">-</div>
        )
      },
    },
    {
      accessorKey: 'link_scan',
      header: () => 'Scan',
      size: 50,
      enableSorting: false,
      cell: ({ row }) => {
        const { scan_link } = row.original
        return (
          <a href={scan_link} target="_blank">
            <ExternalLink className="w-4 h-4 text-neutral-07" />
          </a>
        )
      },
    },
  ]

  const dataSource = useMemo(() => {
    return activityQuery.isFetching
      ? [...(Array(10).keys() as any)]
      : activityQuery.data?.data.activities
  }, [activityQuery.data?.data.activities, activityQuery.isFetching])

  return (
    <>
      <TitleCard
        title="Smart Money Activity"
        iconFirst={<IconPresent />}
        iconSecond={<Info />}
      >
        <div className="flex items-center gap-4 text-neutral-04">
          <p className="text-neutral-04 text-sm font-semibold">Filter by</p>
          <DialogSelectToken listToken={listToken} setListToken={setListToken}>
            <button className="whitespace-nowrap border border-solid border-neutral-03 rounded-xl bg-transparent  px-4 py-2 my-auto">
              Specific Token
            </button>
          </DialogSelectToken>
          {listToken?.length > 0 ? (
            <div className="flex items-center gap-2">
              {listToken.map((item) => (
                <div
                  className="bg-neutral-01 cursor-pointer rounded-xl flex items-center justify-center px-4 gap-1 h-full py-2 text-sm tracking-normal leading-5 text-neutral-07 border border-neutral-03"
                  key={item.tokenAddress}
                >
                  <ImageToken imgUrl={item?.imageUrl} symbol={item?.symbol} />
                  <div>{item.symbol}</div>
                  <Close onclick={handleRemoveToken(item)} />
                </div>
              ))}
            </div>
          ) : null}
          <SelectTradeValue
            valueSelected={tradeValue}
            setValueSelected={setTradeValue}
          />
          <SelectMovement
            movement={filterActivity}
            setMovement={setFilterActivity}
          />
        </div>
      </TitleCard>

      <div className="">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4"
          columns={columns}
          data={dataSource as any}
          isFetching={activityQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
        <PaginationTable
          className="mt-8"
          currentPage={pageActivity}
          updatePage={(page: number) => setPageActivity(page)}
          pageSize={10}
          total={totalActivity}
          setPage={setPageActivity}
        />
      </div>
    </>
  )
}
