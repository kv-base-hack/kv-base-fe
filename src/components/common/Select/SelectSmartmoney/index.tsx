import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

const options = [
  {
    value: '9Sg...pcu',
    label: 'Wallet: 9Sg...pcu',
  },
  {
    value: 'vc',
    label: 'VC',
  },
  {
    value: 'fresh-wallet',
    label: 'Fresh Wallet',
  },
  {
    value: 'top-roi',
    label: 'Top ROI',
  },
]

export const SelectSmartMoney = ({
  smartMoney,
  setSmartMoney,
}: {
  smartMoney: string
  setSmartMoney: (value: string) => void
}) => {
  return (
    <Select value={smartMoney} onValueChange={(val: string) => setSmartMoney(val)}>
      <SelectTrigger className="flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-medium tracking-normal leading-6 text-white whitespace-nowrap border border-solid bg-transparent border-white/40 rounded-[360px]">
        <div className="flex items-center gap-2 justify-between">
          <div className="grow">
            {options.find((item) => item.value === smartMoney)?.label || 'All Smart Money'}
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="border-none bg-neutral-07 z-[9999]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
