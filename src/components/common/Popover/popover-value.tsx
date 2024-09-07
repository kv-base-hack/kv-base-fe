'use client'

import {
  IconFiltedFunnel,
  IconFilterFunnel,
} from '@/components/shared/icons/activity/icon-filter-funnel'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const options = [
  {
    value: 'shrimp',
    label: '$5k - $15k',
    icon: '🦐',
  },
  {
    value: 'fish',
    label: '$15k - $50k',
    icon: '🦈',
  },
  {
    value: 'dolphin',
    label: '$50k - $100k',
    icon: '🐬',
  },
  {
    value: 'whale',
    label: '$100k - $200k',
    icon: '🐳',
  },
  {
    value: 'ocean',
    label: '>$200k',
    icon: '🌊',
  },
]

export function PopoverValue({
  valueSelected,
  setValueSelected,
  setPage,
}: {
  valueSelected: unknown
  setValueSelected: (value: unknown) => void
  setPage?: (val: number) => void
}) {
  return (
    <Popover>
      <PopoverTrigger>
        {valueSelected ? <IconFiltedFunnel /> : <IconFilterFunnel />}
      </PopoverTrigger>
      <PopoverContent className="border-none p-0">
        <div className="flex w-[190px] flex-col gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-black/25 p-2 backdrop-blur-xl">
          {options.map((item, idx: number) => {
            if (!item) {
              throw new Error(`Missing item at index ${idx}`)
            }

            const isChecked = valueSelected === item.value

            const handleCheckedChange = (checked: boolean) => {
              let newValueSelected: unknown
              if (checked) {
                newValueSelected = Array.isArray(valueSelected)
                  ? [...valueSelected, item.value]
                  : [item.value]
              } else {
                newValueSelected = Array.isArray(valueSelected)
                  ? valueSelected.filter((val) => val !== item.value)
                  : []
              }

              setValueSelected(newValueSelected)
              if (setPage) setPage(1)
            }

            return (
              <div
                key={idx}
                className="flex items-center justify-end gap-2 px-3"
              >
                <label
                  htmlFor={item?.value as string}
                  className="text-sm font-normal not-italic leading-6 tracking-[-0.16px] text-[#6F767E]"
                >
                  {item.label}
                </label>
                {item?.icon}
                <Checkbox
                  id={item?.value as string}
                  checked={isChecked}
                  onCheckedChange={handleCheckedChange}
                />
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
