import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'

export const SelectSmartMoney = ({
  value,
  setValue,
}: {
  value: string
  setValue: (value: string) => void
}) => {
  return (
    <Select value={value} onValueChange={(val: string) => setValue(val)}>
      <SelectTrigger className="my-auto flex w-auto cursor-pointer gap-2 whitespace-nowrap border-white/10 bg-transparent px-4 py-3 text-base font-semibold leading-6 tracking-normal text-gray-300 outline-none ring-0">
        <div className="grow">{value}</div>
      </SelectTrigger>
      <SelectContent className="z-[9999] border-none bg-neutral-07">
        <SelectItem value="all">All Smart Money</SelectItem>
      </SelectContent>
    </Select>
  )
}
