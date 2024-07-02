import { ImageToken } from '@/components/common/Image/ImageToken'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import numeral from 'numeral'
import Link from 'next/link'
import { TokenStat } from '@/types/tradeStatisticTokens'
import { useMemo } from 'react'
import { TokenSymbol } from '../TokenSymbol'

export const ColumnsTradeStatisticToken = (setSort: (v: string) => void) => {
  const columns: ColumnDef<TokenStat>[] = useMemo(() => {
    return [
      {
        accessorKey: 'symbol',
        header: () => 'Tokens',
        cell: ({ row }) => {
          const { tokenAddress, imageUrl, symbol } = row.original
          return tokenAddress ? (
            <Link
              href={`/smartmoney-onchain/token-explorer/${tokenAddress}`}
              className="flex gap-3 items-center justify-between text-right"
            >
              <ImageToken imgUrl={imageUrl} symbol={symbol} />
              <TokenSymbol>{symbol}</TokenSymbol>
            </Link>
          ) : (
            <div className="flex gap-3 cursor-not-allowed items-center justify-between text-right">
              <ImageToken imgUrl={imageUrl} symbol={symbol} />
              <TokenSymbol>{symbol}</TokenSymbol>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'pnl',
        header: () => {
          return (
            <div role="button" onClick={() => setSort('pnl')}>
              PnL
            </div>
          )
        },
        cell: ({ row }) => {
          const { pnl } = row.original
          return pnl === 0 ? (
            '-'
          ) : (
            <div className={pnl < 0 ? 'text-error-500' : 'text-success-500'}>
              {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                ? numeral(pnl).format('0,0.[000000]')
                : nFormatter(pnl)}
              $
            </div>
          )
        },
      },
      {
        accessorKey: 'avg_roi',
        header: () => {
          return (
            <div role="button" onClick={() => setSort('avg_roi')}>
              Avg ROI
            </div>
          )
        },
        cell: ({ row }) => {
          const { avg_roi } = row.original
          return avg_roi === 0 ? (
            '-'
          ) : (
            <div
              className={avg_roi < 0 ? 'text-error-500' : 'text-success-500'}
            >
              {(avg_roi < 0.001 && avg_roi > 0) ||
              (avg_roi > -0.001 && avg_roi < 0)
                ? numeral(avg_roi).format('0,0.[000000]')
                : avg_roi.toFixed(2)}
              %
            </div>
          )
        },
      },
      {
        accessorKey: 'realized_gains',
        header: () => {
          return (
            <div role="button" onClick={() => setSort('realized_percent')}>
              Realized %
            </div>
          )
        },
        cell: ({ row }) => {
          const { realized_percent } = row.original
          return !realized_percent || realized_percent === 0 ? (
            '-'
          ) : (
            <div>
              {(realized_percent < 0.001 && realized_percent > 0) ||
              (realized_percent > -0.001 && realized_percent < 0)
                ? numeral(realized_percent).format('0,0.[000000]')
                : realized_percent.toFixed(2)}
              %
            </div>
          )
        },
      },
      {
        accessorKey: 'total_spent',
        header: () => {
          return (
            <div
              className="text-neutral-04 whitespace-nowrap"
              role="button"
              onClick={() => setSort('total_spent')}
            >
              Total Spent
            </div>
          )
        },
        cell: ({ row }) => {
          const { volume } = row.original
          return <div>${nFormatter(volume)}</div>
        },
      },
    ]
  }, [setSort])

  return columns
}
