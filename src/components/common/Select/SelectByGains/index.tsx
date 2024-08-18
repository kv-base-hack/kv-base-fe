import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const renderGains = (duration: string) => {
  switch (duration) {
    case 'gains':
      return {
        value: 'Gains',
      }
    case 'netflow': {
      return {
        value: 'Netflow',
      }
    }
    case 'price': {
      return {
        value: 'Price %',
      }
    }
    case 'marketcap': {
      return {
        value: 'Marketcap',
      }
    }
    case 'avg_roi': {
      return {
        value: 'AVG ROI',
      }
    }
    default: {
      return {
        value: 'Sort By Gains',
      }
    }
  }
}

export const SelectGains = ({
  gain,
  setGain,
}: {
  gain: string
  setGain: (gain: string) => void
}) => {
  return (
    <Select value={gain} onValueChange={(val: string) => setGain(val)}>
      <SelectTrigger
        className={cn(
          'my-auto flex w-auto cursor-pointer gap-2 whitespace-nowrap rounded-[360px] border border-solid border-white/10 bg-neutral-07/50 px-4 py-3 text-base font-medium leading-6 tracking-normal text-gray-300 backdrop-blur-[50px]',
        )}
      >
        <div className="grow">{renderGains(gain).value}</div>
      </SelectTrigger>
      <SelectContent className="z-[9999] !min-w-16 border-none bg-neutral-07">
        <SelectItem value="gains">Gains</SelectItem>
        <SelectItem value="netflow">Netflow</SelectItem>
        <SelectItem value="price">Price %</SelectItem>
        <SelectItem value="marketcap">Marketcap</SelectItem>
        <SelectItem value="avg_roi">AVG ROI</SelectItem>
      </SelectContent>
    </Select>
  )
}
