import { cn } from '@/lib/utils'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import { TopUnusualCex } from '@/types/find-gems/unusual-cex'
import CexDepositIcon from '@/components/shared/icons/dashboard/CexDepositIcon'
import CexWithdrawIcon from '@/components/shared/icons/dashboard/CexWithdrawIcon'
import upperFirst from 'lodash.upperfirst'
import SortMultipleIcon from '@/components/shared/icons/SortMultipleIcon'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from 'next/link'
import { TableFindGemsProps } from '@/types'
import { useMemo } from 'react'
import { RenderTableFindGemsByTab } from '../TableFindGems'
import { renderPrice } from '@/lib/utils/renderPrice'

export const TableFindGemsUnusualCex = ({
  tab,
  page,
  perPage,
  setPage,
  data,
  total,
  isFetching,
  setSort,
  chain,
}: TableFindGemsProps) => {
  const columns: ColumnDef<TopUnusualCex>[] = useMemo(() => {
    return [
      {
        accessorKey: 'id',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">#</div>
        ),
        cell: ({ row }) => {
          return <div>{row.index + 1 + (page - 1) * perPage}</div>
        },
        size: 50,
      },
      {
        accessorKey: 'symbol',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5 whitespace-nowrap">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex items-center justify-start w-full">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}?chain=${chain}`}
                    className="flex items-center gap-2"
                  >
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="flex flex-col gap-1.5 w-full items-start justify-start">
                      <div className="truncate font-bold text-primary max-w-[120px]">
                        {row?.original?.name}
                      </div>
                      <div className="font-normal text-neutral-04">
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
                    <div className="max-w-[120px] truncate">
                      {row?.original?.name}
                    </div>
                    <div className="text-normal text-neutral-07">
                      {row?.original?.symbol}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'action',
        enableSorting: false,
        header: () => (
          <div className="flex w-full gap-2 justify-center items-center">
            <div className="text-center text-neutral-04 text-sm not-italic leading-5">
              Action
            </div>
            <SortMultipleIcon />
          </div>
        ),
        cell: ({ row }) => {
          const { action } = row.original
          return (
            <div className="w-full flex justify-center">
              <div
                className={cn(
                  'flex rounded-md text-neutral-07 justify-center items-center gap-2.5 px-2 py-0.5 text-center text-xs not-italic leading-4 tracking-[-0.12px]',
                  action === 'deposit'
                    ? ' bg-secondary-1'
                    : action === 'withdraw'
                    ? ' bg-secondary-4'
                    : '',
                )}
              >
                {action === 'deposit' ? (
                  <CexDepositIcon className="w-4 h-4" />
                ) : (
                  <CexWithdrawIcon className="w-4 h-4" />
                )}
                {upperFirst(action)}
              </div>
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'unusual',
        enableSorting: false,
        header: () => (
          <div className="whitespace-nowrap text-neutral-04 text-sm not-italic leading-5">
            Unusual
          </div>
        ),
        cell: ({ row }) => {
          const { unusual_percent } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              {unusual_percent.toFixed(2)}%
            </div>
          )
        },
        align: 'center',
      },

      {
        accessorKey: 'net_flow',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('net_flow')}
            role="button"
          >
            Cex Net Flow
          </div>
        ),
        cell: ({ row }) => {
          const { net_flow_24h } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(net_flow_24h)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'price',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Price
          </div>
        ),
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              {renderPrice(current_price)}
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'price_24h',
        header: () => (
          <div
            className="text-neutral-04 whitespace-nowrap text-sm not-italic leading-5"
            onClick={() => setSort('price_change')}
            role="button"
          >
            Price (24h%)
          </div>
        ),
        cell: ({ row }) => {
          const { price_percent_change_24h } = row.original
          return price_percent_change_24h === 0 ? (
            <div>-</div>
          ) : (
            <div
              className={cn(
                price_percent_change_24h > 0
                  ? 'text-success-500'
                  : 'text-error-500',
              )}
            >
              {price_percent_change_24h > 0 ? '+' : ''}
              {price_percent_change_24h.toFixed(2)}%
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'oi_24h',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            OI (24h%)
          </div>
        ),
        cell: ({ row }) => {
          const { oi_24h } = row.original
          return oi_24h === 0 ? (
            <div>-</div>
          ) : (
            <div
              className={cn(oi_24h > 0 ? 'text-success-500' : 'text-error-500')}
            >
              {oi_24h > 0 ? '+' : ''}
              {oi_24h.toFixed(2)}%
            </div>
          )
        },
        align: 'center',
      },
      {
        accessorKey: 'market_cap',
        enableSorting: false,
        header: () => (
          <div className="text-neutral-04 text-sm not-italic leading-5">
            Marketcap
          </div>
        ),
        cell: ({ row }) => {
          const { market_cap } = row.original
          return (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(market_cap)}
            </div>
          )
        },
        align: 'end',
      },
      {
        accessorKey: '24h_vol',
        header: () => (
          <div
            className="text-neutral-04 text-sm not-italic leading-5"
            onClick={() => setSort('volume_24h')}
            role="button"
          >
            24h Vol
          </div>
        ),
        cell: ({ row }) => {
          const { volume_24h } = row.original
          return volume_24h === 0 ? (
            <div className="text-neutral-07">-</div>
          ) : (
            <div className="text-neutral-07 text-sm not-italic leading-5">
              ${nFormatter(volume_24h)}
            </div>
          )
        },
        align: 'end',
      },
    ]
  }, [chain, page, perPage, setSort])
  return (
    <RenderTableFindGemsByTab
      tab={tab}
      page={page}
      perPage={perPage}
      setPage={setPage}
      dataTable={data}
      total={total}
      isFetching={isFetching}
      columns={columns}
    />
  )
}
