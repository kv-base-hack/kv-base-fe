import { ImageToken } from '@/components/common/Image/ImageToken'
import { renderTradingValue } from '@/components/common/Image/ImageTradingValue'
import { cn } from '@/lib/utils'
import { TopActivity } from '@/types/topActivity'
import { nFormatter } from '@/lib/utils/nFormatter'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import Link from 'next/link'
import { renderPrice } from '@/lib/utils/renderPrice'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'
import Image from 'next/image'

import {
  IconFiltedFunnel,
  IconFilterFunnel,
} from '@/components/shared/icons/activity/icon-filter-funnel'
import { DropdownMovements } from '../Dropdown/dropdown-movements'
import { SmartTradersCell } from '../Cell/smart-traders'
import { TooltipTokenMoreInfo } from '../Tooltip/tool-tip-more-info'
import { PopoverValue } from '../Popover/popover-value'

export type Activity = {
  id: string
  time: string
  smart_money: string
  symbol: string
  movements: string
  value: {
    total: number
    amount: number
    symbol: string
  }
  avg_cost: number
  realized_pnl: {
    percent: number
    amount: number
  }
  unrealized_pnl: {
    percent: number
    amount: number
  }
}

export const columnsActivity = (
  setSortBy: (v: string) => void,
  setToken: (t: string) => void,
  token: string,
  setMovement: (v: string) => void,
  movement: string,
  setPage: (v: number) => void,
  setTradeValue: any,
  tradeValue: unknown,
  setUserAddress: (v: string) => void,
  userAddress: string,
) => {
  const columns: ColumnDef<TopActivity>[] = [
    {
      accessorKey: 'time',
      header: () => <div onClick={() => setSortBy('token_age')}>Time</div>,
      cell: ({ row }) => {
        const { time, scan_link } = row.original
        return (
          <div className="flex items-center text-xs font-bold text-neutral-04">
            {moment(time).format('MMM DD, HH:mm')}
            <Link href={scan_link} passHref legacyBehavior>
              <a target="_blank">
                <Image
                  src={'/images/logoTime.png'}
                  alt="time"
                  width={23}
                  height={23}
                />
              </a>
            </Link>
          </div>
        )
      },
    },
    {
      accessorKey: 'smart_money',
      header: () => <div>Smart Traders</div>,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <SmartTradersCell
            data={row.original}
            setUserAddress={setUserAddress}
            userAddress={userAddress}
          />
        )
      },
    },
    {
      accessorKey: 'symbol',
      header: () => 'Tokens',
      enableSorting: false,
      cell: ({ row }) => {
        const { symbol } = row.original
        return (
          <div className="flex items-center gap-1">
            <Link
              href={`/smartmoney-onchain/token-explorer/${row.original.token_address}`}
              className="flex items-center justify-between gap-3 text-right font-medium"
            >
              <ImageToken
                imgUrl={row?.original?.token_image_url}
                symbol={symbol}
              />
              <div className="text-neutral-300 underline">{symbol}</div>
            </Link>

            {token ? (
              <button onClick={() => setToken('')}>
                <IconFiltedFunnel />
              </button>
            ) : (
              <button onClick={() => setToken(row.original.token_address)}>
                <IconFilterFunnel />
              </button>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'movements',
      header: () => {
        return (
          <div className="flex items-center gap-1">
            <p>Movements</p>
            <DropdownMovements
              movement={movement}
              setMovement={setMovement}
              setPage={setPage}
            />
          </div>
        )
      },
      enableSorting: false,
      cell: ({ row }) => {
        const { movement } = row.original
        return (
          <div
            className={cn(
              'my-auto flex items-center justify-center gap-2.5 self-stretch whitespace-nowrap rounded-md bg-opacity-10 px-2 py-0.5 text-center text-primary-3',
              movement === 'deposit'
                ? 'bg-secondary-1/10 text-secondary-1'
                : movement === 'withdraw'
                  ? 'bg-secondary-4/10 text-secondary-4'
                  : movement === 'buying'
                    ? 'bg-success-500/10 text-green'
                    : movement === 'selling'
                      ? 'bg-error-500/10 text-error-500'
                      : movement === 'new_listing_buy'
                        ? 'bg-[#89D36F]/10 text-[#89D36F]'
                        : movement === 'new_listing_sell'
                          ? 'bg-[#DC6803]/10 text-[#DC6803]'
                          : 'bg-success-500/10 text-green',
            )}
          >
            {renderMovementIcon(movement)}
            {renderMovementName(movement)}
          </div>
        )
      },
    },
    {
      accessorKey: 'value',
      header: () => {
        return (
          <div className="flex items-center gap-1">
            Value
            <PopoverValue
              valueSelected={tradeValue}
              setValueSelected={setTradeValue}
              setPage={setPage}
            />
          </div>
        )
      },
      enableSorting: false,
      size: 220,
      cell: ({ row }) => {
        const { value_in_usdt, symbol, value_in_token } = row.original
        return value_in_token ? (
          <div className="flex items-center gap-2 text-neutral-300">
            <div>{renderTradingValue(value_in_usdt)}</div>
            <div className="font-medium text-neutral-300">
              <span className="text-green">
                (${nFormatter(value_in_usdt)}){' '}
              </span>
              {nFormatter(value_in_token)} {symbol}
            </div>
          </div>
        ) : (
          '-'
        )
      },
    },
    {
      accessorKey: 'current_price',
      header: () => 'Price',
      enableSorting: false,
      cell: ({ row }) => {
        const { price } = row.original
        return (
          <div
            className={cn('flex items-center justify-center text-neutral-300')}
          >
            {renderPrice(price)}
          </div>
        )
      },
    },

    {
      accessorKey: ' ',
      enableSorting: false,
      cell: ({ row }) => {
        return <TooltipTokenMoreInfo data={row.original} />
      },
    },
  ]
  return columns
}
