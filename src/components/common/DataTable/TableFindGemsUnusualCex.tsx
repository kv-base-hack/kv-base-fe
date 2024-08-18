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
import { TooltipTokenInfo } from '../Tooltip/TooltipTokenInfo'

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
          <div className="text-sm not-italic leading-5 text-neutral-04">#</div>
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
          <div className="whitespace-nowrap text-sm not-italic leading-5 text-neutral-04">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="w-full">
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <TooltipTokenInfo
                    token={row.original}
                    chain={chain}
                    nameToken={true}
                  />
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
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
          <div className="flex w-full items-center justify-center gap-2">
            <div className="text-center text-sm not-italic leading-5 text-neutral-04">
              Action
            </div>
            <SortMultipleIcon />
          </div>
        ),
        cell: ({ row }) => {
          const { action } = row.original
          return (
            <div className="flex w-full justify-center">
              <div
                className={cn(
                  'flex items-center justify-center gap-2.5 rounded-md px-2 py-0.5 text-center text-xs not-italic leading-4 tracking-[-0.12px] text-neutral-07',
                  action === 'deposit'
                    ? 'bg-secondary-1'
                    : action === 'withdraw'
                      ? 'bg-secondary-4'
                      : '',
                )}
              >
                {action === 'deposit' ? (
                  <CexDepositIcon className="h-4 w-4" />
                ) : (
                  <CexWithdrawIcon className="h-4 w-4" />
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
          <div className="whitespace-nowrap text-sm not-italic leading-5 text-neutral-04">
            Unusual
          </div>
        ),
        cell: ({ row }) => {
          const { unusual_percent } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
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
            className="text-sm not-italic leading-5 text-neutral-04"
            onClick={() => setSort('net_flow')}
            role="button"
          >
            Cex Net Flow
          </div>
        ),
        cell: ({ row }) => {
          const { net_flow_24h } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
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
          <div className="text-sm not-italic leading-5 text-neutral-04">
            Price
          </div>
        ),
        cell: ({ row }) => {
          const { current_price } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
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
            className="whitespace-nowrap text-sm not-italic leading-5 text-neutral-04"
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
          <div className="text-sm not-italic leading-5 text-neutral-04">
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
          <div className="text-sm not-italic leading-5 text-neutral-04">
            Marketcap
          </div>
        ),
        cell: ({ row }) => {
          const { market_cap } = row.original
          return (
            <div className="text-sm not-italic leading-5 text-neutral-07">
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
            className="text-sm not-italic leading-5 text-neutral-04"
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
            <div className="text-sm not-italic leading-5 text-neutral-07">
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
