import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const CardCommon = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 rounded-2xl border border-[#EFEFEF] bg-neutral-01 p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
