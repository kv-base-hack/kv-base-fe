import { cn } from '@/lib/utils'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'

export const TagMovement = ({ movement }: { movement: string }) => {
  return (
    <div
      className={cn(
        'my-auto flex items-center justify-center gap-2.5 self-stretch whitespace-nowrap rounded-md px-2 py-1 text-center text-xs text-neutral-07',
        movement === 'deposit'
          ? 'bg-[#FEE6C7]'
          : movement === 'withdraw'
            ? 'bg-[#E1F1FF]'
            : movement === 'buying'
              ? 'bg-[#E1F1FF]'
              : movement === 'selling'
                ? 'bg-[#FEE6C7]'
                : movement === 'new_listing_buy'
                  ? 'bg-[#F4E7FC]'
                  : movement === 'new_listing_sell'
                    ? 'bg-[#DC6803]/10'
                    : 'bg-[#E1FFEF]',
      )}
    >
      {renderMovementIcon(movement)}
      {renderMovementName(movement)}
    </div>
  )
}
