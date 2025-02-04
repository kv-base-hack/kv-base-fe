import { chainAtom } from '@/atom/chain'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { SelectDuration } from '@/components/common/SelectDuration'
import { TokenSymbol } from '@/components/common/TokenSymbol'
import Info from '@/components/shared/icons/Info'
import { IconTarget } from '@/components/shared/icons/leaderboard/IconTarget'
import { useSMNewListingBuyQuery } from '@/query/leaderboard/getSMNewListingBuy'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const TableFindGemsSMNewListingBuy = () => {
  const [duration, setDuration] = useState('24h')
  const [page] = useState(1)
  const [perPage] = useState(3)
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
    ? [...Array(3).keys()]
    : smNewListingBuyQuery.data?.smart_money_new_listing_buy || []

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
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-1.5">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <TokenSymbol>{row?.original?.symbol}</TokenSymbol>
                    </div>
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
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
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px]"
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
      },
    ]
  }, [page, perPage])

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<IconTarget />}
        title="ST New Listing Buy"
        iconSecond={<Info />}
      >
        <SelectDuration duration={duration} setDuration={setDuration} />
      </TitleCard>
      <div className="overflow-x-auto">
        <DataTable
          className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
          columns={columns}
          data={dataSMNewListingBuy}
          isFetching={smNewListingBuyQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
      </div>
    </CardCommon>
  )
}
