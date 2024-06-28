import { cn } from '@/lib/utils'

export const TokenSymbol = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'max-w-[100px] truncate text-normal underline text-neutral-07',
        className,
      )}
    >
      {children}
    </div>
  )
}
