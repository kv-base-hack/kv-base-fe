import { categoryAtom } from '@/atom/category'
import { chainAtom } from '@/atom/chain'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { LinkCustom } from '@/components/common/Link'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { SelectDuration } from '@/components/common/SelectDuration'
import { TooltipTokenInfo } from '@/components/common/Tooltip/TooltipTokenInfo'
import Info from '@/components/shared/icons/Info'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import { IconShoppingCart } from '@/components/shared/icons/leaderboard/IconShoppingCart'
import { cn } from '@/lib/utils'
import { useGetTopTokenBuy } from '@/query/leaderboard/getTopTokenBuy'
import { TopTokenBuy } from '@/types/top-token-buy'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useAtom, useAtomValue } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const TableTopBuy = ({
  limit,
  pagination = true,
  detail = true,
}: {
  limit: number
  pagination?: boolean
  detail?: boolean
}) => {
  const CHAIN = useAtomValue(chainAtom)
  const [duration, setDuration] = useState('24h')
  const [page, setPage] = useState(1)
  const [perPage] = useState(limit)
  const [sortBy, setSortBy] = useState('')
  const [, setActiveTab] = useAtom(categoryAtom)

  const dataSMTopTokenBuyQuery = useQuery(
    useGetTopTokenBuy({
      limit: perPage,
      start: page,
      duration,
      chain: CHAIN,
      action: 'buying',
      sort_by: sortBy,
    }),
  )

  const data = dataSMTopTokenBuyQuery.isFetching
    ? [...(Array(limit).keys() as any)]
    : dataSMTopTokenBuyQuery.data?.top_buy_by_smart_money || []
  const total = dataSMTopTokenBuyQuery.data?.total_buy || 1

  const columns: ColumnDef<TopTokenBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: () => (
          <div className="font-normal leading-6 tracking-[-0.14px]">#</div>
        ),
        cell: ({ row }) => {
          return <div>{row.index + 1 + (page - 1) * perPage}</div>
        },
        size: 50,
        enableSorting: false,
      },
      {
        accessorKey: 'symbol',
        header: () => (
          <div className="font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            Tokens
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}?chain=${CHAIN}`}
                  >
                    <TooltipTokenInfo token={row?.original} chain={CHAIN} />
                  </Link>
                ) : (
                  <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal underline max-w-[110px] overflow-auto text-ellipsis">
                      {row?.original?.symbol}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'total_spent',
        header: () => {
          return (
            <div
              className="whitespace-nowrap"
              role="button"
              onClick={() => setSortBy('total_spent')}
            >
              Total Spent
            </div>
          )
        },
        cell: ({ row }) => {
          const { volume } = row.original
          return <div>{nFormatter(volume)}</div>
        },
        align: 'center',
      },
      {
        accessorKey: 'balance_change_percent',
        header: () => (
          <div
            className="w-full font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSortBy('balance_change')}
            role="button"
          >
            Balance Change
          </div>
        ),
        cell: ({ row }) => {
          const { balance_change_percent } = row.original
          return balance_change_percent ? (
            <div
              className={cn(
                'leading-[140%] flex items-center',
                balance_change_percent > 0
                  ? 'text-semantic-success-1'
                  : 'text-semantic-error-1',
                balance_change_percent === 0 && 'text-neutral-03',
              )}
            >
              {balance_change_percent !== 0 && balance_change_percent > 0 ? (
                <PercentUpIcon />
              ) : (
                <PercentDownIcon />
              )}
              {balance_change_percent.toFixed(2)}%
            </div>
          ) : (
            <div className="text-center w-full">-</div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'number_of_sm_money',
        enableSorting: false,
        header: () => (
          <div className="whitespace-nowrap" role="button">
            # of SM Buy
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_smart_money, address } = row.original
          return (
            <DialogNumberOfSmartMoney
              number={number_of_smart_money}
              address={address}
              type="trade"
              duration={duration}
            />
          )
        },
        align: 'center',
      },
    ]
  }, [CHAIN, duration, page, perPage])

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<IconShoppingCart />}
        title="SM Top Buy"
        content="Top purchases made by Smartmoney ranked by Volume Buy."
      >
        <div className="flex items-center gap-2">
          <SelectDuration duration={duration} setDuration={setDuration} />
          {detail && (
            <LinkCustom
              url="/find-gems"
              title="Detail"
              onClick={() => setActiveTab('SM Top Buys')}
            />
          )}
        </div>
      </TitleCard>
      <div className="overflow-x-auto h-full flex flex-col justify-between">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columns}
          data={data}
          isFetching={dataSMTopTokenBuyQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
        {pagination && (
          <PaginationTable
            className="mt-2"
            currentPage={page}
            updatePage={(page: number) => setPage(page)}
            pageSize={perPage}
            total={total}
            setPage={setPage}
          />
        )}
      </div>
    </CardCommon>
  )
}
