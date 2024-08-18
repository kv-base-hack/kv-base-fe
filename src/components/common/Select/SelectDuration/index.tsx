import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const renderDuration = (duration: string) => {
  switch (duration) {
    case '4h':
      return {
        value: '4H',
      }
    case '12h': {
      return {
        value: '12H',
      }
    }
    case '24h': {
      return {
        value: '1D',
      }
    }
    case '48h': {
      return {
        value: '2D',
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
  setPage,
}: {
  duration: string
  setDuration: (duration: string) => void
  setPage?: (val: number) => void
}) => {
  return (
    <Select
      value={duration}
      onValueChange={(val: string) => {
        setDuration(val)
        if (setPage) setPage(1)
      }}
    >
      <SelectTrigger
        area-label="select-date"
        className={cn(
          'flex h-7 w-auto cursor-pointer gap-1 whitespace-nowrap rounded-[360px] border border-solid border-white/10 bg-neutral-07/50 text-sm font-medium tracking-normal text-neutral-100 backdrop-blur-[50px]',
        )}
      >
        <div className="grow">{renderDuration(duration).value}</div>
      </SelectTrigger>
      <SelectContent className="z-[9999] !min-w-16 border-none bg-neutral-07">
        <SelectItem value="4h">4H</SelectItem>
        <SelectItem value="12h">12H</SelectItem>
        <SelectItem value="24h">1D</SelectItem>
        <SelectItem value="48h">2D</SelectItem>
        <SelectItem value="72h">3D</SelectItem>
      </SelectContent>
    </Select>
  )
}
