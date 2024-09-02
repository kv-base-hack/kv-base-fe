import React from 'react'
import { MultiSelect } from './multi-select'

const rankOptions = [
  {
    value: 'advanced_trader',
    label: 'Advanced Trader',
  },
  {
    value: 'elite_trader',
    label: 'Elite Trader',
  },
  {
    value: 'expert_trader',
    label: 'Expert Trader',
  },
  {
    value: 'legendary_trader',
    label: 'Legendary Trader',
  },
  {
    value: 'master_trader',
    label: 'Master Trader',
  },
  {
    value: 'professional_trader',
    label: 'Professional Trader',
  },
  {
    value: 'skilled_trader',
    label: 'Skilled Trader',
  },
]

export const SelectRank = ({
  setPage,
  setRanking,
  ranking,
}: {
  setPage: (page: number) => void
  setRanking: (ranking: string) => void
  ranking: string
}) => {
  const handleSetRanking = (values: string[]) => {
    const filteredValues = values.includes('all') && values.length > 1
      ? values.filter(value => value !== 'all')
      : values;
    setRanking(filteredValues.join(','))
  }
  return (
    <MultiSelect
      setPage={setPage}
      setSelectedValues={handleSetRanking}
      selectedValues={ranking}
      title="Select Rank"
      options={rankOptions}
      type="ranking"
    />
  )
}
