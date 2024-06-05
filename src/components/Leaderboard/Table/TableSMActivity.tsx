import { chainAtom } from '@/atom/chain'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectMovement } from '@/components/common/Select/SelectMovements'
import { SelectTradeValue } from '@/components/common/Select/SelectTradeValue'
import { DialogSelectToken } from '@/components/common/SelectTokens/DialogSelectTokens'
import { IconPresent } from '@/components/shared/icons/IconPresent'
import Info from '@/components/shared/icons/Info'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { cn } from '@/lib/utils'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'
import { useTopActivityQuery } from '@/query/leaderboard/getTopActivity'
import { ActiveTab } from '@/types/tabs/TabActivityHeader'
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

interface TrackingTabsProps {
  activeTab: ActiveTab
}

export const TableSMActivity: React.FunctionComponent<TrackingTabsProps> = ({
  activeTab,
}) => {
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
  const dataActivity = activityQuery.isFetching
    ? [...(Array(10).keys() as any)]
    : activityQuery.data?.data.activities || []
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
            href={`/smartmoney-onchain/wallet-explorer/${sender}`}
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
        const { symbol } = row.original
        return (
          <Link
            href={`/smartmoney-onchain/token-explorer/${row.original.token_address}`}
            className="flex gap-3 items-center justify-between text-right"
          >
            <ImageToken
              imgUrl={row?.original?.token_image_url}
              symbol={symbol}
            />
            <div className="underline">{symbol}</div>
          </Link>
        )
      },
    },
    {
      accessorKey: 'movements',
      header: () => 'Movements',
      enableSorting: false,
      cell: ({ row }) => {
        const { movement } = row.original
        return (
          <div
            className={cn(
              'flex items-center gap-2.5 justify-center self-stretch px-2 py-0.5 my-auto text-center whitespace-nowrap text-neutral-07 rounded-md',
              movement === 'deposit'
                ? 'bg-[#F4E7FC]'
                : movement === 'withdraw'
                  ? 'bg-secondary-4/10'
                  : movement === 'buying'
                    ? 'bg-[#E1F1FF]'
                    : movement === 'selling'
                      ? 'bg-[#FEE6C7]'
                      : movement === 'new_listing_buy'
                        ? 'bg-[#E1FFEF]'
                        : movement === 'new_listing_sell'
                          ? 'bg-[#DC6803]/10'
                          : '',
            )}
          >
            {renderMovementIcon(movement)}
            {renderMovementName(movement)}
          </div>
        )
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
      : activeTab === 'Smart Money Activity'
        ? activityQuery.data?.data.activities
        : []
  }, [activeTab, activityQuery.data?.data.activities, activityQuery.isFetching])

  return (
    <>
      <TitleCard
        title={activeTab}
        iconFirst={<IconPresent />}
        iconSecond={<Info />}
      >
        <div className="flex items-center gap-4 text-neutral-04">
          <p className="text-neutral-04 text-sm font-semibold">Filter by</p>
          <DialogSelectToken>
            <button className="whitespace-nowrap border border-solid border-neutral-03 rounded-xl bg-transparent  px-4 py-2 my-auto">
              Specific Token
            </button>
          </DialogSelectToken>
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
        <PaginationCustom
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
