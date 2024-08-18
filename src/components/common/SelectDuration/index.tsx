import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const renderDuration = (duration: string) => {
  switch (duration) {
    case '1h':
      return {
        value: '1H',
      }
    case '4h': {
      return {
        value: '4H',
      }
    }
    case '24h': {
      return {
        value: '1D',
      }
    }
    case '72h': {
      return {
        value: '3D',
      }
    }
    default: {
      return {
        value: '1D',
      }
    }
  }
}

export const SelectDuration = ({
  duration,
  setDuration,
}: {
  duration: string
  setDuration: (duration: string) => void
}) => {
  return (
    <Select value={duration} onValueChange={(val: string) => setDuration(val)}>
      <SelectTrigger
        area-label="select-date"
        className={cn(
          'my-auto flex w-auto cursor-pointer gap-2 whitespace-nowrap rounded-xl border border-solid border-neutral-03 bg-transparent px-4 py-2 text-sm font-semibold leading-6 tracking-normal text-neutral-04',
        )}
      >
        <div className="grow">{renderDuration(duration).value}</div>
      </SelectTrigger>
      <SelectContent className="z-[9999] !min-w-16 border-none bg-neutral-07">
        <SelectItem value="1h">1H</SelectItem>
        <SelectItem value="4h">4H</SelectItem>
        <SelectItem value="24h">1D</SelectItem>
        <SelectItem value="72h">3D</SelectItem>
      </SelectContent>
    </Select>
  )
}
