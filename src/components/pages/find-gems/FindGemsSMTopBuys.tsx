import { chainAtom } from '@/atom/chain'
import { CardCommon } from '@/components/common/Card/CardCommon'
import { TitleCard } from '@/components/common/Card/TitleCard'
import { DataTable } from '@/components/common/DataTable'
import { DialogNumberOfSmartMoney } from '@/components/common/Dialog/DialogNumberOfSmartMoney'
import { ImageToken } from '@/components/common/Image/ImageToken'
import { SelectDuration } from '@/components/common/SelectDuration'
import { TokenSymbol } from '@/components/common/TokenSymbol'
import Info from '@/components/shared/icons/Info'
import PercentDownIcon from '@/components/shared/icons/PercentDownIcon'
import PercentUpIcon from '@/components/shared/icons/PercentUpIcon'
import SmartMoneyTopBuyIcon from '@/components/shared/icons/dashboard/SmartMoneyTopBuyIcon'
import { cn } from '@/lib/utils'
import { useGetTopTokenBuy } from '@/query/onchain-signal/getTopTokenBuy'
import { nFormatter } from '@/utils/nFormatter'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const TableFindGemsSMTopBuys = () => {
  const [duration, setDuration] = useState('24h')
  const [page] = useState(1)
  const [perPage] = useState(3)
  const [sortBy, setSortBy] = useState('')
  const CHAIN = useAtomValue(chainAtom)

  const smTopBuysQuery = useQuery(
    useGetTopTokenBuy({
      limit: perPage,
      start: page,
      chain: CHAIN,
      duration,
      action: 'buying',
      sort_by: sortBy,
    }),
  )
  const dataSMTopBuys = smTopBuysQuery.isFetching
    ? [...Array(3).keys()]
    : smTopBuysQuery.data?.top_buy_by_smart_money || []

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
        accessorKey: 'value',
        header: () => {
          return (
            <div role="button" onClick={() => setSortBy('value')}>
              Value
            </div>
          )
        },
        cell: ({ row }) => {
          const { usdt_amount } = row.original
          return <div>{nFormatter(usdt_amount)}</div>
        },
      },
      {
        accessorKey: 'balance_change_percent',
        header: () => (
          <div
            className="w-full whitespace-nowrap font-normal leading-6 tracking-[-0.14px]"
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
                'flex items-center leading-[140%]',
                balance_change_percent > 0
                  ? 'text-success-500'
                  : 'text-error-500',
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
            <div className="w-full text-center">-</div>
          )
        },
      },
      {
        accessorKey: 'buyer_count',
        header: () => (
          <div className="w-full whitespace-nowrap text-center font-normal leading-6 tracking-[-0.14px]">
            # of SM Buy
          </div>
        ),
        align: 'center',
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
        enableSorting: false,
      },
    ]
  }, [duration, page, perPage])

  return (
    <CardCommon>
      <TitleCard
        iconFirst={<SmartMoneyTopBuyIcon />}
        title="SM Top Buys"
        iconSecond={<Info />}
      >
        <SelectDuration duration={duration} setDuration={setDuration} />
      </TitleCard>
      <div className="overflow-x-auto">
        <DataTable
          className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
          columns={columns}
          data={dataSMTopBuys}
          isFetching={smTopBuysQuery.isFetching}
          noneBorder
          noneBgHeader
          emptyData="No results."
        />
      </div>
    </CardCommon>
  )
}
