import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/utils'

export const ModeFilter = ({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <ToggleGroup.Root
      type="single"
      aria-label="times range"
      className="flex overflow-hidden gap-2"
      value={value}
      onValueChange={onChange}>
      {options?.map((o) => (
        <ToggleGroup.Item
          key={o}
          value={o}
          aria-label={o}
          className={cn(
            'uppercase px-2 py-1 text-paragraph-2',
            value === o
              ? 'bg-white/10 text-neutral-dark-3 font-bold rounded-[9px]'
              : 'text-neutral-dark-5 font-normal'
          )}>
          {o}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
