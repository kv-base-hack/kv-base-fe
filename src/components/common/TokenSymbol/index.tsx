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
        'text-normal max-w-[100px] truncate text-neutral-07 underline',
        className,
      )}
    >
      {children}
    </div>
  )
}
