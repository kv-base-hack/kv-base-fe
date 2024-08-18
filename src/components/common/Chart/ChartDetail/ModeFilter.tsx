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
      className="flex gap-2 overflow-hidden"
      value={value}
      onValueChange={onChange}
    >
      {options?.map((o) => (
        <ToggleGroup.Item
          key={o}
          value={o}
          aria-label={o}
          className={cn(
            'text-paragraph-2 px-2 py-1 uppercase',
            value === o
              ? 'text-neutral-dark-3 rounded-[9px] bg-white/10 font-bold'
              : 'text-neutral-dark-5 font-normal',
          )}
        >
          {o}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
