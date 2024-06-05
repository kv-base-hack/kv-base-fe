import { chainAtom } from '@/atom/chain'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { LinkCustom } from '@/components/common/Link'
import { PaginationCustom } from '@/components/common/Pagination'
import { SelectDuration } from '@/components/common/SelectDuration'
import Info from '@/components/shared/icons/Info'
import { IconTarget } from '@/components/shared/icons/leaderboard/IconTarget'
import { useGetInsiderBuyQuery } from '@/query/leaderboard/getInsiderBuy'
import { useSMNewListingBuyQuery } from '@/query/leaderboard/getSMNewListingBuy'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const TableNewListingBuy = () => {
  const [duration, setDuration] = useState('24h')
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)
  const [sortBy, setSortBy] = useState('')
  const CHAIN = useAtomValue(chainAtom)

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
    ? [...Array(5).keys()]
    : smNewListingBuyQuery.data?.smart_money_new_listing_buy || []
  const totalSMNewListingBuy = smNewListingBuyQuery.data?.total || 1

  const columns: ColumnDef<any>[] = useMemo(() => {
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
        accessorKey: 'token_age',
        header: () => (
          <div
            className="w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
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
          return <div>{nFormatter(total_spent)}</div>
        },
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
  }, [page, perPage])

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<IconTarget />}
        title="SM New Listing Buy"
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
          data={dataSMNewListingBuy}
          isFetching={smNewListingBuyQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
        <PaginationCustom
          className="mt-2"
          currentPage={page}
          updatePage={(page: number) => setPage(page)}
          pageSize={perPage}
          total={totalSMNewListingBuy}
          setPage={setPage}
        />
      </div>
    </CardCommon>
  )
}
