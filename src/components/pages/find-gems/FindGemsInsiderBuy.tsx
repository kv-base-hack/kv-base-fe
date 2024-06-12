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

export const TableFindGemsInsiderBuy = () => {
  const [duration, setDuration] = useState('24h')
  const [page] = useState(1)
  const [perPage] = useState(3)
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
    ? [...(Array(3).keys() as any)]
    : insiderBuyQuery.data?.unusual_token_buy || []

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
        accessorKey: 'value',
        header: () => {
          return (
            <div role="button" onClick={() => setSortBy('value')}>
              Value
            </div>
          )
        },
        cell: ({ row }) => {
          const { usdt_value } = row.original
          return <div>{nFormatter(usdt_value)}</div>
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
        iconSecond={<Info />}
      >
        <SelectDuration duration={duration} setDuration={setDuration} />
      </TitleCard>
      <div className="overflow-x-auto">
        <DataTable
          className="text-xs font-bold tracking-normal leading-4 text-gray-300 bg-neutral-06 bg-neutral-07/50"
          columns={columns}
          data={dataInsiderBuy}
          isFetching={insiderBuyQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
      </div>
    </CardCommon>
  )
}
