import { chainAtom } from '@/atom/chain'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { LinkCustom } from '@/components/common/Link'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectDuration } from '@/components/common/SelectDuration'
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
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const TableTopBuy = () => {
  const CHAIN = useAtomValue(chainAtom)
  const [duration, setDuration] = useState('24h')
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [sortBy, setSortBy] = useState('')

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
    ? [...(Array(5).keys() as any)]
    : dataSMTopTokenBuyQuery.data?.top_buy_by_smart_money || []
  const total = dataSMTopTokenBuyQuery.data?.total_buy || 1

  const columns: ColumnDef<TopTokenBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        header: () => (
          <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px]">
            #
          </div>
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
          <div className="text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap">
            Tokens
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex gap-1.5 w-full items-center justify-start">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div className="text-normal underline">
                        {row?.original?.symbol}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-1.5 w-full items-center justify-start cursor-not-allowed">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal underline">
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
            <div role="button" onClick={() => setSortBy('total_spent')}>
              Total Spent
            </div>
          )
        },
        cell: ({ row }) => {
          const { volume } = row.original
          return <div>{nFormatter(volume)}</div>
        },
      },
      {
        accessorKey: 'balance_change_percent',
        header: () => (
          <div
            className="w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
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
      },
    ]
  }, [duration, page, perPage])

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<IconShoppingCart />}
        title="SM Top Buy"
        iconSecond={<Info />}
      >
        <div className="flex items-center gap-2">
          <SelectDuration duration={duration} setDuration={setDuration} />
          <LinkCustom url="/" title="Detail" />
        </div>
      </TitleCard>
      <div className="overflow-x-auto">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columns}
          data={data}
          isFetching={dataSMTopTokenBuyQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
        <PaginationCustom
          className="mt-2"
          currentPage={page}
          updatePage={(page: number) => setPage(page)}
          pageSize={perPage}
          total={total}
          setPage={setPage}
        />
      </div>
    </CardCommon>
  )
}
