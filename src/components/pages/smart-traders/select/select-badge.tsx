import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import Image from 'next/image'
import React from 'react'

const badgeOptions = [
  {
    value: 'all',
    label: 'All Badges',
  },
  {
    value: 'balance_whale',
    label: 'Balance Whale',
  },
  {
    value: 'diamond_hands',
    label: 'Diamond Hands',
  },
  {
    value: 'diversify_champion',
    label: 'Diversify Champion',
  },
  {
    value: 'early_bird',
    label: 'Early Bird',
  },
  {
    value: 'fresh_wallet_unusual_buy',
    label: 'Fresh Wallet Unusual Buy',
  },
  {
    value: 'profit_king',
    label: 'Profit King',
  },
  {
    value: 'roi_master',
    label: 'ROI Master',
  },
  {
    value: 'trading_guru',
    label: 'Trading Guru',
  },
  {
    value: 'trend_setter',
    label: 'Trend Setter',
  },
  {
    value: 'win_streak',
    label: 'Win Streak',
  },
]

export const SelectBadge = ({
  setPage,
  setBadge,
  badge,
}: {
  setPage: (page: number) => void
  setBadge: (badge: string) => void
  badge: string
}) => {
  return (
    <Select
      value={badge}
      onValueChange={(value) => {
        setBadge(value)
        setPage(1)
      }}
    >
      <SelectTrigger className="flex h-7 w-auto cursor-pointer gap-2 whitespace-nowrap rounded-[360px] border border-solid border-[#656565] bg-transparent px-4 py-3 text-sm font-medium leading-6 tracking-normal text-white">
        <Image
          src={`/images/badges/${badge}.png`}
          alt={badge}
          width={20}
          height={20}
          className={badge === 'all' ? 'hidden' : ''}
        />
        {badgeOptions.find((option) => option.value === badge)?.label}
      </SelectTrigger>
      <SelectContent className="z-[9999] border-none bg-neutral-07 p-0">
        {badgeOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="px-2"
            showCheck={false}
          >
            <div className="flex items-center gap-2">
              {option.value === 'all' ? (
                <div className="h-4 w-4 bg-transparent"></div>
              ) : (
                <Image
                  src={`/images/badges/${option.value}.png`}
                  alt={option.label}
                  width={20}
                  height={20}
                />
              )}
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
