import WarningIcon from '@/components/shared/icons/WarningIcon'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type GroupHeaderProps = {
  title: string
  desc?: ReactNode | string
  info?: string
  children?: React.ReactNode
  className?: string
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
  title,
  desc,
  info,
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col self-stretch', className)}>
      <div className="flex gap-4 justify-start pr-20 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="text-4xl leading-[60px] text-neutral-01 max-md:max-w-full">{title}</div>
        {children}
      </div>
      {desc ? (
        <div className="mt-4 w-full text-base tracking-normal leading-6 text-neutral-01 max-md:max-w-full">
          {desc}
        </div>
      ) : null}
      {info ? (
        <div className="flex gap-2 justify-between pr-5 mt-4 text-base tracking-normal leading-6 text-secondary-1 max-md:flex-wrap max-md:max-w-full">
          <WarningIcon />
          <div className="flex-auto max-md:max-w-full">{info}</div>
        </div>
      ) : null}
    </div>
  )
}
