import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
// import ShrimpIcon from '@/components/shared/icons/trade-value/Shrimp'
// import FishIcon from '@/components/shared/icons/trade-value/Fish'
// import DolphinIcon from '@/components/shared/icons/trade-value/Dolphin'
// import WhaleIcon from '@/components/shared/icons/trade-value/Whale'

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

const renderValue = (value: string) => {
  switch (value) {
    case 'shrimp':
      return '🦐'
    case 'fish':
      return '🦈'
    case 'dolphin':
      return '🐬'
    case 'whale':
      return '🐳'
    case 'ocean':
      return '🌊'
    default:
      return null
  }
}

export const SelectTradeValue = ({
  valueSelected,
  setValueSelected,
}: {
  valueSelected: unknown
  setValueSelected: (value: unknown) => void
}) => {
  return (
    <Select>
      <SelectTrigger className="flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-medium tracking-normal leading-6 text-neutral-04 whitespace-nowrap border border-solid border-neutral-03 bg-transparent rounded-xl">
        <div className="flex items-center gap-2 justify-between">
          {Array.isArray(valueSelected)
            ? valueSelected?.length === 0
              ? 'All Trade Value ($)'
              : valueSelected?.map((val: string) => (
                  <div key={val}>{renderValue(val)}</div>
                ))
            : null}
        </div>
      </SelectTrigger>
      <SelectContent className="border-none bg-neutral-07 z-[9999]">
        <div className="flex flex-col gap-2">
          {options.map((item, idx: number) => {
            if (!item) {
              throw new Error(`Missing item at index ${idx}`)
            }

            const isChecked = Array.isArray(valueSelected)
              ? valueSelected.includes(item.value)
              : false

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
            }

            return (
              <div
                key={idx}
                className="flex items-center justify-end gap-2 px-3"
              >
                <label
                  htmlFor={item?.value as string}
                  className="text-[#6F767E] text-base not-italic font-normal leading-6 tracking-[-0.16px]"
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
      </SelectContent>
    </Select>
  )
}
