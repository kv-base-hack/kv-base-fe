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
          'flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-medium tracking-normal leading-6 text-gray-300 whitespace-nowrap border border-solid backdrop-blur-[50px] bg-neutral-07/50 border-white/10 rounded-[360px]',
        )}
      >
        <div className="grow">{renderDuration(duration).value}</div>
      </SelectTrigger>
      <SelectContent className="border-none !min-w-16 bg-neutral-07 z-[9999]">
        <SelectItem value="1h">1H</SelectItem>
        <SelectItem value="4h">4H</SelectItem>
        <SelectItem value="24h">1D</SelectItem>
        <SelectItem value="72h">3D</SelectItem>
      </SelectContent>
    </Select>
  )
}
