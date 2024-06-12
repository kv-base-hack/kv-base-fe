import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { LinkCustom } from '@/components/common/Link'
import { SelectDuration } from '@/components/common/SelectDuration'
import Info from '@/components/shared/icons/Info'
import { IconInsider } from '@/components/shared/icons/leaderboard/IconInsider'
import { useGetInsiderBuyQuery } from '@/query/leaderboard/getInsiderBuy'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { chainAtom } from '@/atom/chain'
import { useAtomValue } from 'jotai'
import { PaginationCustom } from '@/components/common/Pagination'
import { UnusualBuy } from '@/types/unusualBuy'

export const TableInsiderBuy = ({
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

  const insiderBuyQuery = useQuery({
    ...useGetInsiderBuyQuery({
      limit: perPage,
      start: page,
      chain: CHAIN,
      duration,
      sort_by: sortBy,
    }),
  })

  const dataInsiderBuy = insiderBuyQuery.isFetching
    ? [...(Array(limit).keys() as any)]
    : insiderBuyQuery.data?.unusual_token_buy || []
  const totalInsiderBuy = insiderBuyQuery.data?.total || 1

  const columns: ColumnDef<UnusualBuy>[] = useMemo(() => {
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
            className="text-center text-neutral-04 w-full text-sm not-italic font-normal leading-6 tracking-[-0.14px] whitespace-nowrap"
            onClick={() => setSortBy('token_age')}
            role="button"
          >
            Token Age
          </div>
        ),
        align: 'center',
        cell: ({ row }) => {
          const { token_age } = row.original
          return (
            <div className="w-full text-center text-neutral-07">
              {token_age}
            </div>
          )
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
        align: 'center',
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
        align: 'center',
      },
    ]
  }, [page, perPage])

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<IconInsider />}
        title="Insider Buy"
        content="List of tokens with unusual buying actions identified by Boltrade's AI. Unusual Buys may indicate insider trading and should be monitored closely."
      >
        <div className="flex items-center gap-2">
          <SelectDuration duration={duration} setDuration={setDuration} />
          {detail && <LinkCustom url="/" title="Detail" />}
        </div>
      </TitleCard>
      <div className="overflow-x-auto flex flex-col h-full justify-between">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columns}
          data={dataInsiderBuy}
          isFetching={insiderBuyQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />

        {pagination && (
          <PaginationCustom
            className="mt-2"
            currentPage={page}
            updatePage={(page: number) => setPage(page)}
            pageSize={perPage}
            total={totalInsiderBuy}
            setPage={setPage}
          />
        )}
      </div>
    </CardCommon>
  )
}
