import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import Image from 'next/image'
import React from 'react'

const rankOptions = [
  {
    value: 'all',
    label: 'All Rank',
  },
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
  return (
    <Select
      value={ranking}
      onValueChange={(value) => {
        setPage(1)
        setRanking(value)
      }}
    >
      <SelectTrigger className="flex h-7 w-auto cursor-pointer gap-2 whitespace-nowrap rounded-[360px] border border-solid border-[#656565] bg-transparent px-4 py-3 text-sm font-medium leading-6 tracking-normal text-white">
        <Image
          src={`/images/ranking/${ranking}.png`}
          alt={ranking}
          width={20}
          height={20}
          className={ranking === 'all' ? 'hidden' : ''}
        />
        {rankOptions.find((option) => option.value === ranking)?.label}
      </SelectTrigger>
      <SelectContent className="z-[9999] border-none bg-neutral-07 p-0">
        {rankOptions.map((option) => (
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
                  src={`/images/ranking/${option.value}.png`}
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
