import { cn } from '@/lib/utils'
import { nFormatter } from '@/utils/nFormatter'
import { renderPrice } from '@/utils/renderPrice'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { ImageToken } from '../Image/ImageToken'
import { TooltipTokenInfo } from '../Tooltip/TooltipTokenInfo'

export type Portfolio = {
  id: string
  symbol: string
  amount: number
  address: string
  image_url: string
  price: number
  price_24h_change: number
  token_amount: number
  usdt_amount: number
}

export const columnsPortfolio = (chain: string) => {
  const columns: ColumnDef<Portfolio>[] = [
    {
      accessorKey: 'token',
      header: () => 'Token',
      enableSorting: false,
      cell: ({ row }) => {
        return <TooltipTokenInfo token={row.original} chain={chain} />
      },
    },
    {
      accessorKey: 'price',
      header: () => 'Current Price',
      enableSorting: false,
      cell: ({ row }) => {
        const { price } = row.original
        return <>{renderPrice(price)}</>
      },
    },
    {
      accessorKey: 'price_change',
      header: () => 'Price 24%',
      enableSorting: false,
      cell: ({ row }) => {
        const { price_24h_change } = row.original
        return (
          <div
            className={cn(
              price_24h_change > 0
                ? 'text-semantic-success-1'
                : price_24h_change < 0
                  ? 'text-semantic-error-1'
                  : 'text-neutral-07',
            )}
          >
            {price_24h_change > 0 ? '+' : ''}
            {price_24h_change?.toFixed(2)}%
          </div>
        )
      },
    },
    {
      accessorKey: 'balance',
      header: () => 'Balance',
      enableSorting: false,
      cell: ({ row }) => {
        const { symbol, token_amount, usdt_amount } = row.original
        return (
          <div className="flex items-center gap-1">
            <p className="text-semantic-success-1">
              (${nFormatter(usdt_amount)})
            </p>
            <div className="flex items-center gap-1">
              <p>{nFormatter(token_amount)}</p>
              <p>{symbol}</p>
            </div>
          </div>
        )
      },
    },
  ]
  return columns
}
