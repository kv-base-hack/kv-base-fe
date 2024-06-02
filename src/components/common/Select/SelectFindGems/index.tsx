import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

const options = [
  {
    value: 'top_cex_withdraw',
    label: 'Top CEX Withdraw',
  },
  {
    value: 'top_cex_deposit',
    label: 'Top CEX Deposit',
  },
  {
    value: 'unusual_cex',
    label: 'Unusual CEX',
  },
  {
    value: 'sm_holding',
    label: 'SM Holding',
  },
  {
    value: 'sm_top_buys',
    label: 'SM Top Buys',
  },
  {
    value: 'sm_top_sells',
    label: 'SM Top Sells',
  },
]

export const SelectFindGems = ({
  gem,
  setGem,
  setPage,
}: {
  gem: string
  setGem: (value: string) => void
  setPage: (value: number) => void
}) => {
  return (
    <Select
      value={gem}
      onValueChange={(val: string) => {
        setGem(val)
        setPage(1)
      }}
    >
      <SelectTrigger className="flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-medium tracking-normal leading-6 text-white whitespace-nowrap bg-transparent border-none">
        <div className="flex items-center gap-2 justify-between">
          <div className="grow">
            {options.find((item) => item.value === gem)?.label}
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="border-none bg-neutral-07 z-[9999]">
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  )
}
