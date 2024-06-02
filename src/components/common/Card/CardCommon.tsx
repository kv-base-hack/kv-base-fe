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
        'bg-neutral-01 p-6 rounded-2xl flex flex-col gap-4 border border-[#EFEFEF] w-full',
        className,
      )}
    >
      {children}
    </div>
  )
}
