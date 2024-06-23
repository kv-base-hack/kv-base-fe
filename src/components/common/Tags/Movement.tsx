import { cn } from '@/lib/utils'
import {
  renderMovementIcon,
  renderMovementName,
} from '@/lib/utils/renderIconMovement'

export const TagMovement = ({ movement }: { movement: string }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 text-neutral-07 justify-center self-stretch px-2 py-1 my-auto text-center whitespace-nowrap rounded-md text-xs',
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
