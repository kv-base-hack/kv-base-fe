import { categoryAtom } from '@/atom/category'
import { chainAtom } from '@/atom/chain'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { LinkCustom } from '@/components/common/Link'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { SelectDuration } from '@/components/common/SelectDuration'
import { TokenSymbol } from '@/components/common/TokenSymbol'
import { TooltipTokenInfo } from '@/components/common/Tooltip/TooltipTokenInfo'
import Info from '@/components/shared/icons/Info'
import { IconTarget } from '@/components/shared/icons/leaderboard/IconTarget'
import { useGetInsiderBuyQuery } from '@/query/leaderboard/getInsiderBuy'
import { useSMNewListingBuyQuery } from '@/query/leaderboard/getSMNewListingBuy'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useAtom, useAtomValue } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const TableNewListingBuy = ({
  limit,
  pagination = true,
  detail = true,
}: {
  limit: number
  pagination?: boolean
  detail?: boolean
}) => {
  const [duration, setDuration] = useState('24h')
  const [page, setPage] = useState(1)
  const [perPage] = useState(limit)
  const [sortBy, setSortBy] = useState('')
  const CHAIN = useAtomValue(chainAtom)
  const [, setActiveTab] = useAtom(categoryAtom)

  const smNewListingBuyQuery = useQuery({
    ...useSMNewListingBuyQuery({
      limit: perPage,
      start: page,
      chain: CHAIN,
      duration,
      sort_by: sortBy,
    }),
  })

  const dataSMNewListingBuy = smNewListingBuyQuery.isFetching
    ? [...Array(limit).keys()]
    : smNewListingBuyQuery.data?.smart_money_new_listing_buy || []
  const totalSMNewListingBuy = smNewListingBuyQuery.data?.total || 1

  const columns: ColumnDef<any>[] = useMemo(() => {
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
                    <TokenSymbol>{row?.original?.symbol}</TokenSymbol>
                  </div>
                )}
              </div>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'token_age',
        header: () => (
          <div
            className="w-full font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSortBy('token_age')}
            role="button"
          >
            Token Age
          </div>
        ),
        cell: ({ row }) => {
          const { token_age } = row.original
          return <>{token_age}</>
        },
        align: 'center',
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
          const { total_spent } = row.original
          return <>${nFormatter(total_spent)}</>
        },
        align: 'center',
      },
      {
        accessorKey: 'roi',
        header: () => (
          <div
            onClick={() => setSortBy('roi')}
            className="whitespace-nowrap"
            role="button"
          >
            ROI
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { roi } = row.original
          return (
            <div className="text-semantic-success-1">
              {roi ? `${roi.toFixed(2)}%` : '-'}
            </div>
          )
        },
      },
    ]
  }, [CHAIN, page, perPage])

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<IconTarget />}
        title="SM New Listing Buy"
        content="List of tokens created less than 14 days ago, bought by Smartmoney, ranked by default according to PnL."
      >
        <div className="flex items-center gap-2">
          <SelectDuration duration={duration} setDuration={setDuration} />
          {detail && (
            <LinkCustom
              url="/find-gems"
              title="Detail"
              onClick={() => setActiveTab('SM New Listing Buys')}
            />
          )}
        </div>
      </TitleCard>
      <div className="overflow-x-auto flex flex-col justify-between h-full">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columns}
          data={dataSMNewListingBuy}
          isFetching={smNewListingBuyQuery.isFetching}
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
            total={totalSMNewListingBuy}
            setPage={setPage}
          />
        )}
      </div>
    </CardCommon>
  )
}
