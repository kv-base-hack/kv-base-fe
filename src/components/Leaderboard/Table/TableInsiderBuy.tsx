import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { LinkCustom } from '@/components/common/Link'
import { SelectDuration } from '@/components/common/SelectDuration'

import { IconInsider } from '@/components/shared/icons/leaderboard/IconInsider'
import { useGetInsiderBuyQuery } from '@/query/leaderboard/getInsiderBuy'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { chainAtom } from '@/atom/chain'
import { useAtom, useAtomValue } from 'jotai'
import { PaginationTable } from '@/components/common/Pagination/PaginationTable'
import { UnusualBuy } from '@/types/unusualBuy'
import { categoryAtom } from '@/atom/category'
import { TooltipTokenInfo } from '@/components/common/Tooltip/TooltipTokenInfo'
import { TokenSymbol } from '@/components/common/TokenSymbol'

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

  const [, setActiveTab] = useAtom(categoryAtom)

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
          <div className="whitespace-nowrap font-normal leading-6 tracking-[-0.14px]">
            Tokens
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}?chain=${CHAIN}`}
                  >
                    <TooltipTokenInfo token={row.original} chain={CHAIN} />
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
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
            className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px] text-neutral-04"
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
          return <div>${nFormatter(total_spent)}</div>
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
  }, [CHAIN, page, perPage])

  const handlechangePage = (page: number) => {
    setPage(page)
  }

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<IconInsider />}
        title="Insider Buy"
        content="List of tokens with insider buying actions identified by Kaivest's AI. Insider Buys may indicate insider trading and should be monitored closely."
      >
        <div className="flex items-center gap-2">
          <SelectDuration duration={duration} setDuration={setDuration} />
          {detail && (
            <LinkCustom
              url="/find-gems"
              title="Detail"
              onClick={() => setActiveTab('Unusual Buying')}
            />
          )}
        </div>
      </TitleCard>
      <div className="flex h-full flex-col justify-between overflow-x-auto">
        <DataTable
          className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
          columns={columns}
          data={dataInsiderBuy}
          isFetching={insiderBuyQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />

        {pagination && (
          <PaginationTable
            className="mt-2"
            currentPage={page}
            pageSize={perPage}
            total={totalInsiderBuy}
            setPage={setPage}
          />
        )}
      </div>
    </CardCommon>
  )
}
