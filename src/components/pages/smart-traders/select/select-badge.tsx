import React from 'react'
import { MultiSelect } from './multi-select'

const badgeOptions = [
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
  const handleSetBadge = (values: string[]) => {
    const filteredValues = values.includes('all') && values.length > 1
      ? values.filter(value => value !== 'all')
      : values;
    setBadge(filteredValues.join(','))
  }
  return (
    <MultiSelect
      setPage={setPage}
      setSelectedValues={handleSetBadge}
      selectedValues={badge}
      title="Select Badge"
      options={badgeOptions}
      type="badges"
    />
  )
}
