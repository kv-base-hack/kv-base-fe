import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'

export const SelectSmartMoney = ({
  value,
  setValue,
}: {
  value: string
  setValue: (value: string) => void
}) => {
  return (
    <Select value={value} onValueChange={(val: string) => setValue(val)}>
      <SelectTrigger className="flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-semibold tracking-normal ring-0 outline-none leading-6 text-gray-300 whitespace-nowrap border-white/10 bg-transparent">
        <div className="grow">{value}</div>
      </SelectTrigger>
      <SelectContent className="border-none bg-neutral-07 z-[9999]">
        <SelectItem value="all">All Smart Money</SelectItem>
      </SelectContent>
    </Select>
  )
}
