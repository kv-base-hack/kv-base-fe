import WarningIcon from '@/components/shared/icons/WarningIcon'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type GroupHeaderProps = {
  icon?: ReactNode
  title: string
  desc?: ReactNode | string
  info?: string
  children?: React.ReactNode
  className?: string
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
  icon,
  title,
  desc,
  info,
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col self-stretch', className)}>
      <div className="flex items-center justify-start gap-4 pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
        {icon}
        <div className="font-inter text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-neutral-07 max-md:max-w-full">
          {title}
        </div>
        {children}
      </div>
      {desc ? (
        <div className="mt-4 w-full text-base leading-6 tracking-normal text-neutral-04 max-md:max-w-full">
          {desc}
        </div>
      ) : null}
      {info ? (
        <div className="mt-4 flex justify-between gap-2 pr-5 text-base leading-6 tracking-normal text-secondary-1 max-md:max-w-full max-md:flex-wrap">
          <WarningIcon />
          <div className="flex-auto max-md:max-w-full">{info}</div>
        </div>
      ) : null}
    </div>
  )
}
