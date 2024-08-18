import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

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
    <Select
      value={smartMoney}
      onValueChange={(val: string) => setSmartMoney(val)}
    >
      <SelectTrigger className="my-auto flex w-auto cursor-pointer gap-2 whitespace-nowrap rounded-[360px] border border-solid border-white/40 bg-transparent px-4 py-3 text-base font-medium leading-6 tracking-normal text-white">
        <div className="flex items-center justify-between gap-2">
          <div className="grow">
            {options.find((item) => item.value === smartMoney)?.label ||
              'All Smart Money'}
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="z-[9999] border-none bg-neutral-07">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
