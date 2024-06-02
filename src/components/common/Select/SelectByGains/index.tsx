import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
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
          'flex w-auto cursor-pointer gap-2 px-4 py-3 my-auto text-base font-medium tracking-normal leading-6 text-gray-300 whitespace-nowrap border border-solid backdrop-blur-[50px] bg-neutral-07/50 border-white/10 rounded-[360px]'
        )}>
        <div className="grow">{renderGains(gain).value}</div>
      </SelectTrigger>
      <SelectContent className="border-none !min-w-16 bg-neutral-07 z-[9999]">
        <SelectItem value="gains">Gains</SelectItem>
        <SelectItem value="netflow">Netflow</SelectItem>
        <SelectItem value="price">Price %</SelectItem>
        <SelectItem value="marketcap">Marketcap</SelectItem>
        <SelectItem value="avg_roi">AVG ROI</SelectItem>
      </SelectContent>
    </Select>
  )
}
